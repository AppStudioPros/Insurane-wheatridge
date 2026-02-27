import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Phone, Shield, Briefcase, Building, Users } from 'lucide-react'

export const metadata = {
  title: 'Business Insurance in Wheat Ridge, CO | Protect Your Company',
  description: 'Comprehensive business insurance for Wheat Ridge companies. Protect your operations, employees, and assets with tailored coverage.',
}

export default function BusinessInsurancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              💼 Business Insurance
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Business Insurance in Wheat Ridge, CO | Protect Your Operations
            </h1>
            <p className="text-base sm:text-xl mb-8">
              Running a business comes with real risks. From liability to property protection, we help business owners find coverage that protects their operations, employees, and assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-center">
                Get a Free Quote
              </Link>
              <a href="tel:3034641911" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-700 font-semibold text-center">
                Call (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Business Insurance */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Business Insurance Is Essential</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Whether you run a small startup or an established enterprise, business insurance protects your company from financial losses due to property damage, liability claims, employee injuries, and more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The right coverage helps you focus on growing your business with confidence, knowing you're protected against unexpected events.
            </p>
          </div>
        </div>
      </section>

      {/* Core Coverage Types */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Essential Business Insurance Coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="text-purple-600" size={48} />,
                title: 'General Liability',
                description: 'Protects against claims of bodily injury, property damage, and advertising injury that occur during business operations.'
              },
              {
                icon: <Building className="text-purple-600" size={48} />,
                title: 'Commercial Property',
                description: 'Covers your business property including buildings, equipment, inventory, and furniture from covered perils.'
              },
              {
                icon: <Users className="text-purple-600" size={48} />,
                title: 'Workers\' Compensation',
                description: 'Provides benefits for employees who suffer work-related injuries or illnesses, including medical costs and lost wages.'
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

      {/* Additional Coverage */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Business Coverage Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Commercial Auto Insurance', desc: 'Coverage for vehicles used for business purposes.' },
                { title: 'Business Umbrella Policy', desc: 'Additional liability protection beyond your primary policies.' },
                { title: 'Professional Liability (E&O)', desc: 'Protects against claims of professional negligence or mistakes.' },
                { title: 'Cyber Liability Insurance', desc: 'Coverage for data breaches and cyber attacks.' },
                { title: 'Business Interruption', desc: 'Covers lost income if your business is forced to close temporarily.' },
                { title: 'Equipment Breakdown', desc: 'Protects against mechanical and electrical equipment failures.' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-purple-600 pl-6 py-3 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industries We Serve</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                'Restaurants & Food Service',
                'Retail Stores',
                'Construction',
                'Professional Services',
                'Healthcare',
                'Technology',
                'Manufacturing',
                'Real Estate',
                'Hospitality'
              ].map((industry, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Protect Your Business Investment</h2>
            <p className="text-base sm:text-xl mb-8">
              We understand that every business is unique. Let's create a customized insurance plan that addresses your specific risks and budget.
            </p>
            <Link href="/contact" className="inline-block bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Get Your Free Business Insurance Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a comprehensive business insurance consultation and personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold">
              Get a Free Quote
            </Link>
            <a href="tel:3034641911" className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center">
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
