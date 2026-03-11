'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { LogOut, LayoutDashboard, FileText, CreditCard, Upload, MessageSquare, User, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/policies', label: 'Policies', icon: FileText },
  { href: '/portal/id-cards', label: 'ID Cards', icon: CreditCard },
  { href: '/portal/documents', label: 'Documents', icon: Upload },
  { href: '/portal/messages', label: 'Messages', icon: MessageSquare },
  { href: '/portal/profile', label: 'Profile', icon: User },
]

export function usePortalAuth() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [client, setClient] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = sessionStorage.getItem('portal_token')
    const c = sessionStorage.getItem('portal_client')
    if (!t || !c) {
      router.replace('/portal')
      return
    }
    setToken(t)
    setClient(JSON.parse(c))
    setReady(true)
  }, [router])

  const logout = () => {
    sessionStorage.removeItem('portal_token')
    sessionStorage.removeItem('portal_client')
    router.replace('/portal')
  }

  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401) {
      logout()
      return null
    }
    return res
  }

  return { token, client, ready, logout, authFetch }
}

export default function PortalLayout({ children, client, logout }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0954a5] to-[#073d7a] text-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Client Portal</h1>
            <p className="text-blue-200 text-xs">Insurance Wheat Ridge</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-blue-100">
              {client?.first_name} {client?.last_name}
            </span>
            <button onClick={logout} className="text-blue-200 hover:text-white transition" title="Logout">
              <LogOut size={18} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-blue-200 hover:text-white">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 flex gap-6">
        {/* Sidebar - desktop */}
        <nav className="hidden sm:block w-48 shrink-0">
          <div className="space-y-1 sticky top-20">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'bg-[#0954a5] text-white'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-[#0954a5]'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="fixed inset-0 top-14 bg-white z-40 sm:hidden p-4">
            <div className="space-y-1">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                      active
                        ? 'bg-[#0954a5] text-white'
                        : 'text-gray-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
