'use client'

import { useState } from 'react'
import { updateFlashcardMastery } from '@/actions/flashcards'

interface FlashcardProps {
    id: string
    front: string
    back: string
    isMastered: boolean
    onMasteredToggle: (id: string, newStatus: boolean) => void
}

export default function Flashcard({ id, front, back, isMastered, onMasteredToggle }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false)
    const [localMastered, setLocalMastered] = useState(isMastered)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    const toggleMastery = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsUpdating(true)
        const newStatus = !localMastered
        setLocalMastered(newStatus) // Optimistic update

        try {
            await updateFlashcardMastery(id, newStatus)
            onMasteredToggle(id, newStatus)
        } catch (error) {
            console.error('Failed to update mastery', error)
            setLocalMastered(!newStatus) // Revert on error
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="perspective-1000 w-full h-80 sm:h-96 cursor-pointer group" onClick={handleFlip}>
            <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                {/* Front */}
                <div className="absolute w-full h-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center backface-hidden">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-6">help_outline</span>
                    <h3 className="text-2xl font-bold text-gray-800">{front}</h3>
                    <p className="text-sm text-gray-400 mt-8">Click to flip</p>

                    {/* Mastery Control (Front) */}
                    <button
                        onClick={toggleMastery}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${localMastered ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        title={localMastered ? "Mastered" : "Mark as Mastered"}
                    >
                        <span className="material-symbols-outlined">{localMastered ? 'check_circle' : 'circle'}</span>
                    </button>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full bg-[var(--primary-blue)] text-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180">
                    <span className="material-symbols-outlined text-4xl text-indigo-200 mb-6">lightbulb</span>
                    <p className="text-xl font-medium leading-relaxed">{back}</p>

                    {/* Mastery Control (Back) */}
                    <button
                        onClick={toggleMastery}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${localMastered ? 'bg-white text-green-600' : 'bg-indigo-700 text-indigo-300 hover:bg-indigo-600'}`}
                        title={localMastered ? "Mastered" : "Mark as Mastered"}
                    >
                        <span className="material-symbols-outlined">{localMastered ? 'check_circle' : 'circle'}</span>
                    </button>
                </div>
            </div>
            <style jsx>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    )
}
