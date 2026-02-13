'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface ProfileMenuProps {
    profile: any
}

export default function ProfileMenu({ profile }: ProfileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="relative">
            <div
                className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800">{profile?.full_name || 'Student'}</p>
                    <p className="text-xs text-gray-500">{profile?.grade_level || 'Grade 11'}</p>
                </div>
                <img
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    src={profile?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA9tkXeSLxClIxs2tTw1YWpI01--ezh6tpdp1U_C8baWkPhSOW2rfQzMWSM2gExG_5o7m4DOjpkncVPMPu74xo2kxJOsDhjyPqb1wKCHNNxXe7VGAjofWuoctou_7A4uIL4klMmiV6btZTPDXY8cOvv8cLDdqOiRIvPMuZUTAHm07y4JoPsKx8NmwpTpQcL6hohvBoy6q97jxVlpW3EDCx0qcx08cBu_MraywGN-gc0DnEqNpQ_ZXJSiIivLP8B59TdsLuizOtxHto"}
                />
            </div>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-50 sm:hidden">
                            <p className="text-sm font-bold text-gray-800">{profile?.full_name}</p>
                            <p className="text-xs text-gray-500">{profile?.grade_level}</p>
                        </div>
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-blue)] flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">settings</span>
                            Settings
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            Sign Out
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
