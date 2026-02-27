import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Phone, Shield, Building2, CheckCircle2, Home } from 'lucide-react'

export const metadata = {
  title: 'Condo Insurance in Wheat Ridge, CO | Specialized Coverage',
  description: 'Specialized condo insurance in Wheat Ridge. Protect your unit, belongings, and improvements with coverage that complements your HOA policy.',
}

export default function CondoInsurancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              🏢 Condo Insurance
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Condo Insurance in Wheat Ridge, CO | Specialized Protection for Condo Owners
            </h1>
            <p className="text-base sm:text-xl mb-8">
              Condo insurance helps cover what your HOA's master policy doesn't. We'll help you protect what's inside your unit with coverage that fits your home and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-teal-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-center">
                Get a Free Quote
              </Link>
              <a href="tel:3034641911" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-teal-700 font-semibold text-center">
                Call (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Condo Insurance */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Condo Insurance Is Unique</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              When you own a condo, your HOA's master insurance policy covers the building structure and common areas. But it typically doesn't cover your personal belongings, interior improvements, or liability inside your unit.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              That's where condo insurance (HO-6 policy) comes in—it fills the gaps left by the master policy and provides comprehensive protection for your unit and possessions.
            </p>
          </div>
        </div>
      </section>

      {/* Core Coverage */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Condo Insurance Covers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Home className="text-teal-600" size={48} />,
                title: 'Interior Unit Coverage',
                description: 'Protects the interior of your condo including walls, floors, ceilings, cabinets, fixtures, and any improvements you\'ve made.'
              },
              {
                icon: <Building2 className="text-teal-600" size={48} />,
                title: 'Personal Property',
                description: 'Covers your belongings—furniture, electronics, clothing, and more—against theft, fire, and other covered perils.'
              },
              {
                icon: <Shield className="text-teal-600" size={48} />,
                title: 'Liability Protection',
                description: 'Provides coverage if someone is injured in your condo or if you accidentally cause damage to another unit or common area.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding HOA Coverage */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your HOA's Master Policy</h2>
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-teal-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important: Know Your HOA's Coverage Type</h3>
              <p className="text-gray-700 mb-4">
                HOA master policies come in different types ("bare walls-in," "single entity," or "all-in"). Understanding your HOA's coverage is crucial to avoiding gaps in protection.
              </p>
              <p className="text-gray-700">
                We'll help you review your HOA's master policy and ensure your condo insurance properly fills any coverage gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Coverage */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Optional Coverage Enhancements</h2>
            <div className="space-y-6">
              {[
                { title: 'Loss Assessment Coverage', desc: 'Helps pay your share of assessments charged by the HOA for damage to common areas.' },
                { title: 'Water Backup Coverage', desc: 'Protects against damage from sewer or drain backups within your unit.' },
                { title: 'Scheduled Personal Property', desc: 'Additional coverage for high-value items like jewelry, art, or collectibles.' },
                { title: 'Earthquake Coverage', desc: 'Specialized protection for earthquake damage (typically not covered in standard policies).' },
                { title: 'Identity Theft Coverage', desc: 'Helps cover expenses related to restoring your identity after theft.' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-teal-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Complete Protection for Your Condo</h2>
            <p className="text-base sm:text-xl mb-8">
              Don't assume your HOA's policy has you covered. Let's make sure you have the right protection for your condo and everything in it.
            </p>
            <Link href="/contact" className="inline-block bg-white text-teal-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Get Your Free Condo Insurance Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Condo?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a personalized condo insurance quote tailored to your unit and HOA requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 font-semibold">
              Get a Free Quote
            </Link>
            <a href="tel:3034641911" className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center">
              <Phone className="mr-2" size={20} />
              (303) 464-1911
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
