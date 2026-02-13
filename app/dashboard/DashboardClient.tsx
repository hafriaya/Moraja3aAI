'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import CreateTestModal from '@/components/CreateTestModal'

interface DashboardClientProps {
    stats: {
        weeklyAverage: number
        examsTaken: number
        recentActivity: any[]
    }
}

export default function DashboardClient({ stats }: DashboardClientProps) {
    const [isIdModalOpen, setIsModalOpen] = useState(false)
    const { weeklyAverage, examsTaken, recentActivity } = stats

    return (
        <>
            <CreateTestModal isOpen={isIdModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Sticky Header from Spec */}
            <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-8 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Welcome back, Alex! 👋</h2>
                <div className="flex items-center gap-6">
                    <div className="relative hidden sm:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] w-64 transition-all" placeholder="Search topics, exams..." type="text" />
                    </div>
                    <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-800">Alex Chen</p>
                            <p className="text-xs text-gray-500">Grade 11 • AP Scholar</p>
                        </div>
                        <img alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9tkXeSLxClIxs2tTw1YWpI01--ezh6tpdp1U_C8baWkPhSOW2rfQzMWSM2gExG_5o7m4DOjpkncVPMPu74xo2kxJOsDhjyPqb1wKCHNNxXe7VGAjofWuoctou_7A4uIL4klMmiV6btZTPDXY8cOvv8cLDdqOiRIvPMuZUTAHm07y4JoPsKx8NmwpTpQcL6hohvBoy6q97jxVlpW3EDCx0qcx08cBu_MraywGN-gc0DnEqNpQ_ZXJSiIivLP8B59TdsLuizOtxHto" />
                    </div>
                </div>
            </header>

            <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
                {/* Top Section: Hero + Stats */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Hero Card */}
                    <div className="flex-1 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--soft-purple)] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[200px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400 opacity-10 rounded-full -ml-12 -mb-12 blur-3xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-2">Ready to crush your next exam?</h3>
                            <p className="text-indigo-100 mb-6 max-w-md">Generate a custom AI-powered practice test from your notes in seconds.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-white text-[var(--primary-blue)] hover:bg-indigo-50 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 w-fit"
                            >
                                <span className="material-symbols-outlined">add_circle</span>
                                Create New Practice Test
                            </button>
                        </div>
                        <span className="material-symbols-outlined absolute right-8 bottom-8 text-9xl opacity-10 rotate-12">history_edu</span>
                    </div>

                    {/* Stats Column */}
                    <div className="w-full md:w-1/3 grid grid-rows-2 gap-4">
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Weekly Goal</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-gray-800">{String(examsTaken).padStart(2, '0')}/15</span>
                                    <span className="text-xs text-gray-400 mb-1">tests</span>
                                </div>
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min((examsTaken / 15) * 100, 100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <span className="material-symbols-outlined">trending_up</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Avg. Score</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-gray-800">{weeklyAverage}%</span>
                                    <span className="text-xs text-green-500 font-bold mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span> 3%
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Active Simulations (Recent Activity) + Recommended Focus */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[var(--primary-blue)]">timer</span>
                                Active Simulations
                            </h3>
                            <a className="text-sm font-medium text-[var(--primary-blue)] hover:underline" href="#">View All</a>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1">
                            {recentActivity.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No active simulations. Create a test to get started!
                                </div>
                            ) : (
                                recentActivity.slice(0, 3).map((activity, idx) => (
                                    <div key={activity.id} className={`flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors ${idx !== recentActivity.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${activity.subject === 'Biology' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {activity.subject ? activity.subject.slice(0, 2).toUpperCase() : 'EX'}
                                        </div>
                                        <div className="flex-1 w-full text-center sm:text-left">
                                            <h4 className="font-bold text-gray-800">{activity.title}</h4>
                                            <p className="text-xs text-gray-500 mb-2">
                                                {activity.status === 'completed' ? `Completed on ${activity.date}` : `Started on ${activity.date} • AI Generated`}
                                            </p>
                                            <div className="w-full h-2 bg-gray-100 rounded-full">
                                                <div
                                                    className={`h-full rounded-full ${activity.status === 'completed' ? 'bg-green-500' : 'bg-[var(--primary-blue)]'}`}
                                                    style={{ width: activity.score !== null ? `${activity.score}%` : '45%' }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="text-center sm:text-right flex-shrink-0">
                                            {activity.status === 'completed' ? (
                                                <div className="text-green-500 font-mono font-bold bg-green-50 px-3 py-1 rounded-lg mb-1 inline-block">
                                                    {activity.score}%
                                                </div>
                                            ) : (
                                                <div className="text-red-500 font-mono font-bold bg-red-50 px-3 py-1 rounded-lg mb-1 inline-block">
                                                    In Progress
                                                </div>
                                            )}
                                            <div className="block">
                                                <Link
                                                    href={activity.status === 'completed' ? `/exam/${activity.id}/results` : `/exam/${activity.id}`}
                                                    className="inline-block text-xs font-bold text-white bg-[var(--primary-blue)] hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
                                                >
                                                    {activity.status === 'completed' ? 'Review' : 'Resume'}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[var(--accent-cyan)]">bolt</span>
                            Recommended Focus
                        </h3>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <div className="text-sm text-gray-500 mb-2">Based on your recent weak areas</div>
                            {/* Hardcoded Recommendations from Spec */}
                            <div className="group cursor-pointer">
                                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-cyan-50 border border-transparent hover:border-cyan-100 transition-all">
                                    <div className="mt-1">
                                        <span className="material-symbols-outlined text-cyan-500 bg-cyan-100 rounded-lg p-1">biotech</span>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 text-sm group-hover:text-cyan-700">Photosynthesis Processes</h5>
                                        <p className="text-xs text-gray-500 mt-1">AP Biology • Low Score (65%)</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="text-[10px] font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">Flashcards</span>
                                            <span className="text-[10px] font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">Mini-Quiz</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="group cursor-pointer border-t border-gray-50 pt-2">
                                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-all">
                                    <div className="mt-1">
                                        <span className="material-symbols-outlined text-purple-500 bg-purple-100 rounded-lg p-1">functions</span>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 text-sm group-hover:text-purple-700">Quadratic Functions</h5>
                                        <p className="text-xs text-gray-500 mt-1">SAT Math • Missed 3 Qs</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="text-[10px] font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">Video</span>
                                            <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">Practice Set</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Recent Performance Chart (Static for UI Match) */}
                <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[var(--soft-purple)]">insights</span>
                            Recent Performance
                        </h3>
                        <select className="text-sm border-gray-200 rounded-lg bg-white px-3 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm">
                            <option>Last 30 Days</option>
                            <option>This Semester</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                        {/* Static Chart Implementation from Spec */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-3 h-64 flex items-end justify-between px-2 sm:px-8 pb-2 relative z-10 border-b border-gray-100">
                                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-2 -ml-6 md:-ml-0">
                                    <span>100%</span>
                                    <span>75%</span>
                                    <span>50%</span>
                                    <span>25%</span>
                                    <span>0%</span>
                                </div>
                                <div className="absolute inset-0 z-0 flex flex-col justify-between py-2 pointer-events-none">
                                    <div className="border-t border-gray-50 w-full h-0"></div>
                                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                                    <div className="border-t border-gray-50 w-full h-0"></div>
                                </div>

                                {/* Bars */}
                                {[{ d: 'Mon', v: 72 }, { d: 'Tue', v: 65 }, { d: 'Wed', v: 84 }, { d: 'Thu', v: 50, warn: true }, { d: 'Fri', v: 92 }, { d: 'Sat', v: 88 }].map((bar, i) => (
                                    <div key={i} className="w-12 flex flex-col items-center gap-2 group z-10">
                                        <div className="text-xs font-bold text-[var(--primary-blue)] opacity-0 group-hover:opacity-100 transition-opacity mb-1">{bar.v}%</div>
                                        <div className="w-full bg-indigo-100 rounded-t-lg relative group-hover:bg-indigo-200 transition-colors" style={{ height: `${bar.v * 2}px` }}>
                                            <div className={`absolute bottom-0 w-full rounded-t-lg ${bar.warn ? 'bg-yellow-400' : 'bg-[var(--primary-blue)]'}`} style={{ height: `${bar.v}%` }}></div>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">{bar.d}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="md:col-span-1 flex flex-col justify-center space-y-6 border-l border-gray-50 pl-0 md:pl-6">
                                <div>
                                    <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Top Subject</h4>
                                    <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[var(--soft-purple)]"></span>
                                        AP History
                                    </p>
                                    <p className="text-sm text-gray-500">92% Avg Score</p>
                                </div>
                                <div>
                                    <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Needs Work</h4>
                                    <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                        Calculus AB
                                    </p>
                                    <p className="text-sm text-gray-500">68% Avg Score</p>
                                </div>
                                <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[var(--primary-blue)] hover:border-[var(--primary-blue)] transition-all">
                                    View Full Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
