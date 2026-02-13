import { getDashboardStats } from '@/actions/dashboard'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
    const stats = await getDashboardStats()
    const safeStats = stats || { weeklyAverage: 0, examsTaken: 0, recentActivity: [] }

    return <DashboardClient stats={safeStats} />
}
