'use server'

import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch exams for the user
    const { data: exams } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (!exams) {
        return {
            weeklyAverage: 0,
            examsTaken: 0,
            recentActivity: []
        }
    }

    // Calculate Weekly Average (mock calculation for MVP, simply average of all completed exams)
    const completedExams = exams.filter(e => e.status === 'completed' && e.score !== null)
    const totalScore = completedExams.reduce((acc, curr) => acc + (curr.score || 0), 0)
    const weeklyAverage = completedExams.length > 0 ? Math.round(totalScore / completedExams.length) : 0

    // Format Recent Activity
    const recentActivity = exams.slice(0, 5).map(exam => ({
        id: exam.id,
        title: exam.title || `Exam ${exam.id.slice(0, 4)}`, // Fallback title
        subject: 'General', // We might need to fetch material title join for this
        date: new Date(exam.created_at || new Date().toISOString()).toLocaleDateString(),
        score: exam.score,
        status: exam.status
    }))

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch Notifications
    const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    return {
        profile,
        notifications: notifications || [],
        weeklyAverage,
        examsTaken: exams.length,
        recentActivity
    }
}
