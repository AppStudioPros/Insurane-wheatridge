import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Phone, Shield, CheckCircle2, Home, Zap } from 'lucide-react'

export const metadata = {
  title: 'Home Insurance in Wheat Ridge, CO | Protect Your Property',
  description: 'Comprehensive home insurance in Wheat Ridge. Protect your dwelling, belongings, and liability with customizable coverage options.',
}

export default function HomeInsurancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              🏠 Home Insurance
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Home Insurance in Wheat Ridge, CO | Where Memories Are Made and Protected
            </h1>
            <p className="text-base sm:text-xl mb-8">
              Your home is more than an investment; it's where memories are made. Our home insurance options safeguard your dwelling, belongings, and liability with coverage designed for your peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-center">
                Get a Free Quote
              </Link>
              <a href="tel:3034641911" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-700 font-semibold text-center">
                Call (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Home Insurance Matters */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Home Insurance Is More Important Than Ever</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A home is usually the most valuable asset you'll own. Protecting it with the right insurance policy is essential to your financial stability and peace of mind. Home insurance covers your home's structure, personal belongings, and even liability if someone gets hurt on your property.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether it's fire, hail, theft, or natural disasters, comprehensive home insurance is designed to help you recover and rebuild—giving you confidence no matter what life throws your way.
            </p>
          </div>
        </div>
      </section>

      {/* Core Coverage Types */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Home Insurance Coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Home className="text-green-600" size={48} />,
                title: 'Dwelling Coverage',
                description: 'Protects the physical structure of your home from covered perils like fire, windstorm, hail, and vandalism.'
              },
              {
                icon: <Shield className="text-green-600" size={48} />,
                title: 'Personal Property Coverage',
                description: 'Covers your belongings—furniture, electronics, clothing, and more—against theft, damage, or loss.'
              },
              {
                icon: <CheckCircle2 className="text-green-600" size={48} />,
                title: 'Liability Protection',
                description: 'Provides financial protection if someone is injured on your property or if you accidentally damage someone else\'s property.'
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

      {/* Optional Coverages */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Optional Coverage Enhancements</h2>
            <div className="space-y-6">
              {[
                { title: 'Water Backup & Sump Pump Coverage', desc: 'Protects against damage from sewer or drain backups—a common and costly issue.' },
                { title: 'Equipment Breakdown Coverage', desc: 'Covers repair or replacement of home systems and appliances like HVAC, water heaters, and more.' },
                { title: 'Identity Theft Coverage', desc: 'Helps cover expenses related to restoring your identity after theft.' },
                { title: 'Earthquake Coverage', desc: 'Specialized protection for earthquake damage (typically not covered in standard policies).' },
                { title: 'Scheduled Personal Property', desc: 'Additional coverage for high-value items like jewelry, art, or collectibles.' },
                { title: 'Cyber Shield', desc: 'Provides cyber attack recovery and ransom coverage for smart home devices.' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Comprehensive Protection for Your Home</h2>
            <p className="text-base sm:text-xl mb-8">
              From dwelling coverage to identity theft protection, we help you customize a policy that fits your home, budget, and lifestyle.
            </p>
            <Link href="/contact" className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Get Your Free Home Insurance Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Home?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a personalized home insurance quote tailored to your property and needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold">
              Get a Free Quote
            </Link>
            <a href="tel:3034641911" className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center">
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
