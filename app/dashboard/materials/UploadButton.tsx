'use client'

import { useState } from 'react'
import CreateTestModal from '@/components/CreateTestModal'

export default function UploadButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-[var(--primary-blue)] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-xl">upload</span>
                Upload New
            </button>
            <CreateTestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
