'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [formData, setFormData] = useState({
        full_name: '',
        grade_level: '',
        avatar_url: ''
    })

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            // Support Mock User for Dev
            const userId = user?.id || '00000000-0000-0000-0000-000000000000'

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (data) {
                setFormData({
                    full_name: data.full_name || '',
                    grade_level: data.grade_level || '',
                    avatar_url: data.avatar_url || ''
                })
            }
            setLoading(false)
        }

        fetchProfile()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        const { data: { user } } = await supabase.auth.getUser()
        const userId = user?.id || '00000000-0000-0000-0000-000000000000'

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                ...formData,
                updated_at: new Date().toISOString()
            })

        if (error) {
            setMessage({ type: 'error', text: 'Failed to update settings.' })
        } else {
            setMessage({ type: 'success', text: 'Settings updated successfully!' })
            router.refresh() // Refresh server components
        }
        setSaving(false)
    }

    if (loading) return <div className="p-10 text-center">Loading settings...</div>

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--primary-blue)] text-3xl">school</span>
                    <span className="font-bold text-xl tracking-tight text-gray-800">Moraja3aAI</span>
                </div>
                <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-[var(--primary-blue)]">
                    Back to Dashboard
                </Link>
            </nav>

            <main className="max-w-2xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>

                    {message && (
                        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <input
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition-all"
                                placeholder="e.g. Alex Chen"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Grade / Title</label>
                            <input
                                name="grade_level"
                                value={formData.grade_level}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition-all"
                                placeholder="e.g. Grade 11 • AP Scholar"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Avatar URL</label>
                            <input
                                name="avatar_url"
                                value={formData.avatar_url}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition-all"
                                placeholder="https://..."
                            />
                            {formData.avatar_url && (
                                <div className="mt-4 flex items-center gap-3">
                                    <img src={formData.avatar_url} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                                    <span className="text-xs text-gray-400">Preview</span>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-[var(--primary-blue)] text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
