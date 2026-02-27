'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-16 w-auto">
              <Image 
                src="/images/Jubal Terry 2025 NMP-2.jpg" 
                alt="Farmers Insurance Logo"
                width={80}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-primary">Insurance Wheat Ridge</div>
              <div className="text-sm text-gray-600">Jubal Terry, Farmers Agent</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium transition">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-medium transition">About</Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium transition">Services ▾</button>
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/services/auto-insurance" className="block px-4 py-3 hover:bg-gray-50">Auto Insurance</Link>
                <Link href="/services/home-insurance" className="block px-4 py-3 hover:bg-gray-50">Home Insurance</Link>
                <Link href="/services/life-insurance" className="block px-4 py-3 hover:bg-gray-50">Life Insurance</Link>
                <Link href="/services/business-insurance" className="block px-4 py-3 hover:bg-gray-50">Business Insurance</Link>
                <Link href="/services/renters-insurance" className="block px-4 py-3 hover:bg-gray-50">Renters Insurance</Link>
                <Link href="/services/condo-insurance" className="block px-4 py-3 hover:bg-gray-50">Condo Insurance</Link>
              </div>
            </div>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium transition">Contact</Link>
            <a href="tel:3034641911" className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 font-medium transition flex items-center space-x-2">
              <Phone size={18} />
              <span>(303) 464-1911</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary">About</Link>
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">Services</div>
              <div className="pl-4 space-y-2">
                <Link href="/services/auto-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-primary">Auto Insurance</Link>
                <Link href="/services/home-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-primary">Home Insurance</Link>
                <Link href="/services/life-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-primary">Life Insurance</Link>
                <Link href="/services/business-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-primary">Business Insurance</Link>
                <Link href="/services/renters-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-primary">Renters Insurance</Link>
                <Link href="/services/condo-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-primary">Condo Insurance</Link>
              </div>
            </div>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary">Contact</Link>
            <a href="tel:3034641911" className="block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-medium text-center mt-4">
              Call (303) 464-1911
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
