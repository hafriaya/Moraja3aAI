import { createClient } from '@/utils/supabase/server'
import ResultsClient from './ResultsClient'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    // 1. Fetch Exam
    const { data: exam, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', id)
        .single()

    if (examError || !exam) {
        return <div>Exam not found</div>
    }

    // 2. Fetch Questions
    const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', id)
        .order('order_index')

    if (questionsError) {
        return <div>Error loading questions</div>
    }

    // 3. Merge User Answers
    // In a real app, user answers would be stored in a separate table "exam_responses" or JSONB column "user_answers".
    // For this MVP, we are storing user_answers as JSONB in the exams table (as per submitExam logic).
    // We need to cast the result to any first because the Supabase types might not have user_answers yet if it was added dynamically
    const examData = exam as any
    const userAnswers = (examData.user_answers || {}) as Record<string, string>

    const examWithQuestions = {
        id: exam.id,
        title: exam.title,
        created_at: exam.created_at || new Date().toISOString(),
        score: exam.score,
        questions: questions.map(q => ({
            id: q.id,
            question_text: q.question_text,
            options: q.options as string[],
            correct_answer: q.correct_answer,
            explanation: q.explanation || 'No explanation provided.',
            user_answer: userAnswers[q.id]
        }))
    }

    return <ResultsClient exam={examWithQuestions} />
}
