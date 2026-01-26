import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Phone, Shield, Key, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Renters Insurance in Wheat Ridge, CO | Affordable Protection',
  description: 'Affordable renters insurance in Wheat Ridge. Protect your personal property and get liability coverage with flexible options.',
}

export default function RentersInsurancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              🔑 Renters Insurance
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Renters Insurance in Wheat Ridge, CO | Affordable Protection for Your Belongings
            </h1>
            <p className="text-xl mb-8">
              Even if you don't own your home, your personal property still matters. Our renters insurance provides financial protection against theft, fire, and other covered losses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-orange-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-center">
                Get a Free Quote
              </Link>
              <a href="tel:3034641911" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-700 font-semibold text-center">
                Call (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Renters Insurance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Renters Insurance Is Important</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Many renters assume their landlord's insurance covers their belongings—it doesn't. Your landlord's policy only covers the building structure. Your personal possessions, from furniture to electronics to clothing, need their own protection.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Renters insurance is surprisingly affordable and provides essential coverage for your belongings, liability protection, and even additional living expenses if your rental becomes uninhabitable.
            </p>
          </div>
        </div>
      </section>

      {/* Core Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Renters Insurance Covers</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Key className="text-orange-600" size={48} />,
                title: 'Personal Property',
                description: 'Protects your belongings—furniture, electronics, clothing, and more—from theft, fire, vandalism, and other covered perils.'
              },
              {
                icon: <Shield className="text-orange-600" size={48} />,
                title: 'Liability Coverage',
                description: 'Covers legal costs and damages if someone is injured in your rental or if you accidentally damage someone else\'s property.'
              },
              {
                icon: <CheckCircle2 className="text-orange-600" size={48} />,
                title: 'Additional Living Expenses',
                description: 'Covers hotel and meal costs if your rental becomes uninhabitable due to a covered loss like fire or severe water damage.'
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

      {/* Optional Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Optional Coverage Enhancements</h2>
            <div className="space-y-6">
              {[
                { title: 'Scheduled Personal Property', desc: 'Extra coverage for high-value items like jewelry, cameras, or musical instruments.' },
                { title: 'Water Backup Coverage', desc: 'Protects against damage from sewer or drain backups.' },
                { title: 'Identity Theft Coverage', desc: 'Helps cover expenses related to restoring your identity after theft.' },
                { title: 'Earthquake Coverage', desc: 'Specialized protection for earthquake damage in applicable areas.' },
                { title: 'Pet Damage Coverage', desc: 'Covers damage caused by your pets to the rental property.' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-orange-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Affordable Protection Starting at Just Pennies a Day</h2>
            <p className="text-xl mb-8">
              Most renters insurance policies cost less than a cup of coffee each week. Can you really afford not to have it?
            </p>
            <Link href="/contact" className="inline-block bg-white text-orange-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Get Your Free Renters Insurance Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Belongings?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a personalized renters insurance quote that fits your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 font-semibold">
              Get a Free Quote
            </Link>
            <a href="tel:3034641911" className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center">
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
