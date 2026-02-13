import Link from 'next/link'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
            {/* Sidebar from Dashboard.html */}
            <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col justify-between hidden md:flex z-20">
                <div>
                    <div className="h-20 flex items-center px-8 border-b border-gray-50">
                        <span className="material-symbols-outlined text-3xl text-[var(--primary-blue)] mr-2">school</span>
                        <h1 className="font-bold text-2xl tracking-tight gradient-text">ExamSim</h1>
                    </div>
                    <nav className="p-4 space-y-2 mt-4">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-[var(--primary-blue)] font-medium transition-colors">
                            <span className="material-symbols-outlined filled">dashboard</span>
                            Home
                        </Link>
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
                            <span className="material-symbols-outlined">quiz</span>
                            My Tests
                        </Link>
                        <Link href="/dashboard/materials" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
                            <span className="material-symbols-outlined">library_books</span>
                            Study Materials
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
                            <span className="material-symbols-outlined">monitoring</span>
                            Analytics
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                            Settings
                        </Link>
                    </nav>
                </div>
                <div className="p-6 border-t border-gray-50">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
                        <h3 className="font-bold text-sm mb-1">Weekly Streak!</h3>
                        <p className="text-xs text-indigo-100 mb-3">You've studied 5 days in a row.</p>
                        <div className="flex items-center gap-1 text-yellow-300 font-bold">
                            <span className="material-symbols-outlined text-lg filled">local_fire_department</span>
                            <span>5 Days</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#F8FAFC]">
                {children}
            </main>
        </div>
    )
}
