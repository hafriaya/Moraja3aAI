'use client'

import { useState } from 'react'
import Flashcard from './Flashcard'
import Link from 'next/link'

interface StudyModeProps {
    set: any
    cards: any[]
}

export default function StudyMode({ set, cards }: StudyModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    // Track mastery locally to update progress bar without refetching
    const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set(cards.filter(c => c.is_mastered).map(c => c.id)))

    const currentCard = cards[currentIndex]
    const progress = Math.round(((currentIndex + 1) / cards.length) * 100)
    const masteryPercentage = Math.round((masteredIds.size / cards.length) * 100)

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleMasteredToggle = (id: string, isMastered: boolean) => {
        const newSet = new Set(masteredIds)
        if (isMastered) {
            newSet.add(id)
        } else {
            newSet.delete(id)
        }
        setMasteredIds(newSet)
    }

    if (!cards || cards.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-4">No cards in this set.</h2>
                <Link href="/dashboard" className="text-[var(--primary-blue)] hover:underline">Return to Dashboard</Link>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto w-full">
            {/* Header / Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{set.title}</h2>
                    <span className="text-sm font-medium text-gray-500">{currentIndex + 1} / {cards.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--primary-blue)] transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>Progress</span>
                    <span className={masteredIds.size === cards.length ? 'text-green-600 font-bold' : ''}>Mastery: {masteryPercentage}%</span>
                </div>
            </div>

            {/* Flashcard Container */}
            <div className="mb-8">
                <Flashcard
                    key={currentCard.id} // Key ensures reset flip state on change
                    id={currentCard.id}
                    front={currentCard.front}
                    back={currentCard.back}
                    isMastered={masteredIds.has(currentCard.id)}
                    onMasteredToggle={handleMasteredToggle}
                />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Prev
                </button>

                <div className="flex gap-2">
                    <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-yellow-500 hover:border-yellow-200 transition-colors" title="Shuffle (Coming Soon)">
                        <span className="material-symbols-outlined">shuffle</span>
                    </button>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[var(--primary-blue)] text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-colors"
                >
                    Next
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>

            {masteredIds.size === cards.length && (
                <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4">
                    <span className="material-symbols-outlined text-4xl text-green-500 mb-2">emoji_events</span>
                    <h3 className="font-bold text-green-800">Set Mastered!</h3>
                    <p className="text-green-600 text-sm">Great job! You've marked all cards as known.</p>
                </div>
            )}
        </div>
    )
}
