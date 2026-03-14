'use server'

import { createClient } from '@/utils/supabase/server'

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const PDFParser = require('pdf2json')
            const pdfParser = new PDFParser()
            
            // Add timeout
            const timeout = setTimeout(() => {
                reject(new Error('PDF parsing timeout - file may be corrupted or too complex'))
            }, 30000)

            pdfParser.on('pdfParser_dataError', (errData: any) => {
                clearTimeout(timeout)
                console.warn('pdf2json error:', errData.parserError)
                reject(new Error('PDF parse error: ' + (errData.parserError || 'Unknown error')))
            })

            pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
                clearTimeout(timeout)
                try {
                    // Extract text from all pages
                    const text = pdfData.Pages.map((page: any) => {
                        if (!page.Texts || page.Texts.length === 0) return ''
                        return page.Texts.map((textItem: any) => {
                            if (!textItem.R || !Array.isArray(textItem.R)) return ''
                            return textItem.R.map((r: any) => {
                                try {
                                    return decodeURIComponent(r.T)
                                } catch (e) {
                                    return r.T || ''
                                }
                            }).join(' ')
                        }).join(' ')
                    }).join('\n\n')

                    console.log('✅ PDF parsed. Text extracted:', text.length, 'characters')
                    resolve(text)
                } catch (e) {
                    console.error('Error processing PDF data:', e)
                    reject(e)
                }
            })

            pdfParser.parseBuffer(Buffer.from(buffer))
        } catch (e) {
            console.error('PDF parsing exception:', e)
            reject(e)
        }
    })
}

export async function uploadStudyMaterial(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
        throw new Error('No file provided')
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use authorized user or fallback to mock for dev
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    // 1. Extract Text Content
    let extractedText = ''
    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size)

        if (file.type === 'application/pdf') {
            console.log('📄 Parsing PDF with pdf2json...')
            extractedText = await extractTextFromPDF(buffer)

        } else if (file.type === 'text/plain') {
            extractedText = buffer.toString('utf-8')
            console.log('Text file extracted. Length:', extractedText.length)
        } else {
            throw new Error('Unsupported file type. Please use PDF or TXT.')
        }
    } catch (e) {
        console.error('❌ TEXT EXTRACTION ERROR:', e)
        const errorMsg = e instanceof Error ? e.message : String(e)
        throw new Error('File extraction failed: ' + errorMsg)
    }

    // Validate extracted text is substantial enough
    if (extractedText.trim().length < 100) {
        throw new Error('Extracted text is too short (less than 100 characters). Please use a file with more content.')
    }

    // 2. Upload file to Storage (Optional for MVP if we just want text, but good for reference)
    let publicUrl = ''
    try {
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
        const { error: uploadError } = await supabase.storage
            .from('materials')
            .upload(fileName, file)

        if (!uploadError) {
            const { data } = supabase.storage.from('materials').getPublicUrl(fileName)
            publicUrl = data.publicUrl
        }
    } catch (e) {
        console.warn('Storage upload failed, proceeding with text only.', e)
    }

    // 3. Create Study Material Record
    const { data: materialData, error: materialError } = await supabase
        .from('study_materials')
        .insert({
            user_id: userId,
            title: file.name,
            original_file_url: publicUrl,
            processed_text_content: extractedText, // Now saving REAL text
        })
        .select()
        .single()

    if (materialError) {
        if (materialError.code === 'PGRST205') {
            throw new Error(
                'Database is not initialized. Run specs/001-database-schema/schema.sql in Supabase SQL Editor, then retry.'
            )
        }
        console.error('Material insert error:', materialError)
        throw new Error(`Database error: ${materialError.message}`)
    }

    return { success: true, materialId: materialData.id }
}

export async function getMaterials() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Support Mock User for Dev
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching materials:', error)
        return []
    }

    return data
}

export async function deleteMaterial(id: string) {
    const supabase = await createClient()

    // 1. Get material to find file path (if we were using real storage paths efficiently)
    // For now, we just delete the record. In a real app, delete from Storage too.

    const { error } = await supabase
        .from('study_materials')
        .delete()
        .eq('id', id)

    if (error) throw new Error(error.message)
    return { success: true }
}

export async function getMaterialExamHistory(materialId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', userId)
        .eq('material_source_id', materialId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching material history:', error)
        return []
    }
    return data
}

export async function getMaterialContent(materialId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('study_materials')
        .select('processed_text_content')
        .eq('id', materialId)
        .single()

    if (error) {
        console.error('Error fetching material content:', error)
        throw new Error('Failed to fetch material content')
    }

    return data?.processed_text_content || ''
}
