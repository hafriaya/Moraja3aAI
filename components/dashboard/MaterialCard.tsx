'use client'

import { useState } from 'react'
import { deleteMaterial } from '@/actions/materials'
import CreateTestModal from '@/components/CreateTestModal'
import { useRouter } from 'next/navigation'

interface MaterialCardProps {
    material: {
        id: string
        title: string
        created_at: string
        original_file_url: string | null
    }
}

export default function MaterialCard({ material }: MaterialCardProps) {
    const router = useRouter()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteMaterial(material.id)
            router.refresh()
        } catch (error) {
            console.error('Failed to delete material:', error)
            alert('Failed to delete material')
        } finally {
            setIsDeleting(false)
            setIsDeleteModalOpen(false)
        }
    }

    return (
        <>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-indigo-50 text-[var(--primary-blue)] rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">description</span>
                        </div>
                        <div className="relative">
                            {/* Context Menu or simple delete button for now */}
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                title="Delete File"
                            >
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>

                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 min-h-[3.5rem]">{material.title}</h3>
                    <p className="text-xs text-gray-400 mb-4">{new Date(material.created_at).toLocaleDateString()}</p>
                </div>

                <div className="border-t border-gray-50 pt-4 mt-auto">
                    <button
                        onClick={() => setIsGenerateModalOpen(true)}
                        className="w-full py-2 bg-indigo-50 text-[var(--primary-blue)] font-bold rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Generate Test
                    </button>
                </div>
            </div>

            {/* Generate Test Modal (Pre-filled) */}
            <CreateTestModal
                isOpen={isGenerateModalOpen}
                onClose={() => setIsGenerateModalOpen(false)}
                initialMaterialId={material.id}
                initialTitle={material.title}
            />

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Material?</h3>
                        <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <span className="font-bold text-gray-700">{material.title}</span>? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
