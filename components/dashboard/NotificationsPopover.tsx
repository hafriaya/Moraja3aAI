'use client'

import { useState } from 'react'

interface NotificationsPopoverProps {
    notifications: any[]
}

export default function NotificationsPopover({ notifications }: NotificationsPopoverProps) {
    const [isOpen, setIsOpen] = useState(false)
    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <div className="relative">
            <button
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                            <h4 className="font-bold text-gray-800 text-sm">Notifications</h4>
                            <button className="text-xs text-[var(--primary-blue)] font-medium hover:underline">Mark all as read</button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-gray-500 text-xs">
                                    No new notifications
                                </div>
                            ) : (
                                notifications.map(n => (
                                    <div key={n.id} className={`p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                                        <div className="flex gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === 'success' ? 'bg-green-100 text-green-600' :
                                                    n.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                                        n.type === 'error' ? 'bg-red-100 text-red-600' :
                                                            'bg-blue-100 text-blue-600'
                                                }`}>
                                                <span className="material-symbols-outlined text-sm">
                                                    {n.type === 'success' ? 'check' :
                                                        n.type === 'warning' ? 'warning' :
                                                            n.type === 'error' ? 'error' :
                                                                'info'}
                                                </span>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-semibold text-gray-800">{n.title}</h5>
                                                <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                                                <p className="text-[10px] text-gray-400 mt-2">{new Date(n.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
