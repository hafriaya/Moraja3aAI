import { getMaterials } from '@/actions/materials'
import MaterialCard from '@/components/dashboard/MaterialCard'
import Link from 'next/link'
import UploadButton from './UploadButton' // Client component for upload button state

export default async function MaterialsPage() {
    const materials = await getMaterials()

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Study Materials</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your uploaded notes and generate tests.</p>
                </div>
                <UploadButton />
            </div>

            {!materials || materials.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                    <div className="w-20 h-20 bg-indigo-50 text-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-4xl">folder_open</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">No materials found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">Upload your first PDF, text file, or notes to start generating AI-powered practice tests.</p>
                    <UploadButton />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((material: any) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            )}
        </div>
    )
}
