import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load env from .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    process.exit(1)
}

async function setupDatabase() {
    console.log('🔧 Supabase Database Setup Guide\n')
    console.log(`📍 Project URL: ${supabaseUrl}`)
    console.log(`🔑 Using ANON_KEY (public)\n`)

    try {
        // Read the schema SQL file
        const schemaPath = resolve(__dirname, 'specs', '001-database-schema', 'schema.sql')
        const schema = readFileSync(schemaPath, 'utf-8')

        console.log('✅ Found schema file at: specs/001-database-schema/schema.sql')
        console.log(`📊 Schema size: ${schema.length} characters\n`)

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('HOW TO INITIALIZE YOUR DATABASE:')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

        console.log('1️⃣  Open Supabase Dashboard:')
        console.log(`    https://supabase.com/dashboard/project/${supabaseUrl.split('//')[1].split('.')[0]}\n`)

        console.log('2️⃣  Navigate to SQL Editor (left sidebar)\n')

        console.log('3️⃣  Click "New Query" to create a new SQL editor tab\n')

        console.log('4️⃣  Copy & Paste the following SQL:\n')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log(schema)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

        console.log('5️⃣  Click "Run" button (CMD + Enter or Ctrl + Enter)\n')

        console.log('✨ After running the SQL:')
        console.log('   • All tables will be created')
        console.log('   • RLS policies will be enabled')
        console.log('   • Your app will be ready to use\n')

        console.log('6️⃣  Return to VS Code and run:')
        console.log('   npm run dev\n')

        console.log('Then try uploading a file again - it should work! 🎉')
    } catch (error) {
        console.error('❌ Error reading schema:', error instanceof Error ? error.message : String(error))
        process.exit(1)
    }
}

setupDatabase()
