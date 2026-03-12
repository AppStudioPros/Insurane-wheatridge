'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Download, Car, Home, Shield } from 'lucide-react'

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
}

function IDCard({ card }) {
  const isAuto = card.card_type === 'auto'
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-[#0954a5] to-[#073d7a] rounded-2xl shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg tracking-wide">FARMERS INSURANCE</h3>
            <p className="text-blue-200 text-xs uppercase tracking-widest mt-0.5">Insurance Identification Card</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            {isAuto ? <Car size={24} className="text-white" /> : <Home size={24} className="text-white" />}
          </div>
        </div>

        {/* Card Body */}
        <div className="bg-white mx-3 mb-3 rounded-xl p-5 space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Insured</p>
            <p className="text-gray-900 font-bold text-lg">{card.insured_name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Policy Number</p>
              <p className="text-gray-900 font-semibold text-sm">{card.policy_number}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Type</p>
              <p className="text-gray-900 font-semibold text-sm capitalize">{card.card_type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Effective Date</p>
              <p className="text-gray-900 font-semibold text-sm">{formatDate(card.effective_date)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Expiration Date</p>
              <p className="text-gray-900 font-semibold text-sm">{formatDate(card.expiration_date)}</p>
            </div>
          </div>

          {card.vehicle_info && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Vehicle</p>
              <p className="text-gray-900 font-semibold text-sm">{card.vehicle_info}</p>
            </div>
          )}

          {card.coverage_details && typeof card.coverage_details === 'object' && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Coverage</p>
              <div className="space-y-1">
                {Object.entries(card.coverage_details).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-gray-900 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="px-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-blue-200" />
            <span className="text-blue-200 text-xs">Insurance Wheat Ridge</span>
          </div>
          <span className="text-blue-300 text-xs">(303) 422-3535</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Take a screenshot to save this card to your phone
      </p>
    </div>
  )
}

export default function IDCardsPage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCards = async () => {
    const t = sessionStorage.getItem('portal_token')
    if (!t) return
    try {
      const r = await fetch('/api/portal/id-cards?_t=' + Date.now(), { headers: { Authorization: 'Bearer ' + t }, cache: 'no-store' })
      if (!r.ok) return
      const d = await r.json()
      setCards(d ?? [])
    } catch (e) {}
    setLoading(false)
  }

  useEffect(() => { if (ready) fetchCards() }, [ready])
  useEffect(() => {
    if (!ready) return
    const id = setInterval(fetchCards, 5000)
    return () => clearInterval(id)
  }, [ready])

  if (!ready) return null

  return (
    <PortalLayout client={client} logout={logout}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance ID Cards</h2>
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : cards.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No ID cards available yet.</div>
      ) : (
        <div className="space-y-8">
          {cards.map(card => (
            <IDCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </PortalLayout>
  )
}
