'use server'

import { createClient } from '@/utils/supabase/server'

export async function uploadStudyMaterial(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
        throw new Error('No file provided')
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let userId = user?.id
    if (!userId) {
        console.warn('⚠️ No authenticated user found. Using MOCK_USER_ID for development.')
        userId = '00000000-0000-0000-0000-000000000000' // Mock ID for dev
    }

    // 1. Upload file to Storage
    let publicUrl = ''

    try {
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('materials')
            .upload(fileName, file)

        if (uploadError) {
            console.warn('⚠️ Upload failed (Bucket missing?). Using MOCK URL for development.', uploadError.message)
            publicUrl = 'https://example.com/mock-file.pdf'
        } else {
            const { data } = supabase.storage.from('materials').getPublicUrl(fileName)
            publicUrl = data.publicUrl
        }
    } catch (e) {
        console.warn('⚠️ Upload exception. Using MOCK URL for development.', e)
        publicUrl = 'https://example.com/mock-file.pdf'
    }

    // 2. Create Study Material Record
    const { data: materialData, error: materialError } = await supabase
        .from('study_materials')
        .insert({
            user_id: userId,
            title: file.name,
            original_file_url: publicUrl,
            processed_text_content: 'Mock content for now', // Placeholder
        })
        .select()
        .single()

    if (materialError) throw new Error(`DB Insert failed: ${materialError.message}`)

    // TODO: Implement Embeddings / Vector Search here later
    // console.log('Skipping vector embeddings for Mock AI phase')

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
