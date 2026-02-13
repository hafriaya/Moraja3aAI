import { getFlashcardSet } from '@/actions/flashcards'
import StudyMode from '@/components/flashcards/StudyMode'
import Link from 'next/link'

export default async function FlashcardSetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { set, cards, error } = await getFlashcardSet(id)

    if (error || !set) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-4">sentiment_dissatisfied</span>
                    <h1 className="text-xl font-bold text-gray-800 mb-2">Set Not Found</h1>
                    <p className="text-gray-500 mb-6">We couldn't load this flashcard set.</p>
                    <Link href="/dashboard" className="bg-[var(--primary-blue)] text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">
                        Go Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[var(--text-main)]">
            <nav className="bg-white border-b border-gray-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <Link href="/dashboard" className="text-gray-400 hover:text-[var(--primary-blue)] transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="font-bold text-lg text-gray-800">Study Mode</h1>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <StudyMode set={set} cards={cards} />
            </main>
        </div>
    )
}
