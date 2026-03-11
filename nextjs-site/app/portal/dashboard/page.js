'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { FileText, CreditCard, Upload, MessageSquare, User, Shield } from 'lucide-react'

export default function Dashboard() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    Promise.all([
      authFetch('/api/portal/policies').then(r => r?.json()),
      authFetch('/api/portal/documents').then(r => r?.json()),
      authFetch('/api/portal/messages').then(r => r?.json()),
    ]).then(([policies, documents, messages]) => {
      setStats({
        activePolicies: (policies ?? []).filter(p => p.status === 'active').length,
        documents: (documents ?? []).length,
        unreadMessages: (messages ?? []).filter(m => m.sender === 'agent' && !m.read).length,
      })
      setLoading(false)
    })
  }, [ready])

  if (!ready) return null

  const cards = [
    { href: '/portal/policies', label: 'My Policies', icon: FileText, color: 'bg-blue-50 text-[#0954a5]', stat: stats?.activePolicies, statLabel: 'active' },
    { href: '/portal/id-cards', label: 'ID Cards', icon: CreditCard, color: 'bg-green-50 text-green-700', stat: null, statLabel: '' },
    { href: '/portal/documents', label: 'Documents', icon: Upload, color: 'bg-purple-50 text-purple-700', stat: stats?.documents, statLabel: 'uploaded' },
    { href: '/portal/messages', label: 'Messages', icon: MessageSquare, color: 'bg-orange-50 text-orange-700', stat: stats?.unreadMessages, statLabel: 'unread' },
    { href: '/portal/profile', label: 'My Profile', icon: User, color: 'bg-gray-50 text-gray-700', stat: null, statLabel: '' },
  ]

  return (
    <PortalLayout client={client} logout={logout}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {client?.first_name}
          </h2>
          <p className="text-gray-500 mt-1">Here is your insurance overview</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map(card => {
              const Icon = card.icon
              return (
                <a
                  key={card.href}
                  href={card.href}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition group"
                >
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0954a5] transition">
                    {card.label}
                  </h3>
                  {card.stat !== null && (
                    <p className="text-sm text-gray-500 mt-1">
                      {card.stat} {card.statLabel}
                    </p>
                  )}
                </a>
              )
            })}
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-5 flex items-start gap-4">
          <Shield size={24} className="text-[#0954a5] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900">Need help?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Send us a message through the Messages section or call us at (303) 422-3535.
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}
