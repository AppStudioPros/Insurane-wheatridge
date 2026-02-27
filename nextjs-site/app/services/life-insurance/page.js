import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Phone, Shield, Heart, Users, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Life Insurance in Wheat Ridge, CO | Secure Your Family\'s Future',
  description: 'Protect your family\'s financial future with life insurance in Wheat Ridge. Term, whole, and universal life options available.',
}

export default function LifeInsurancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              ❤️ Life Insurance
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Life Insurance in Wheat Ridge, CO | Secure Your Family's Financial Future
            </h1>
            <p className="text-base sm:text-xl mb-8">
              Planning for the future means protecting the people you love. With trusted life insurance options, we help you secure financial peace of mind for your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-red-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-center">
                Get a Free Quote
              </Link>
              <a href="tel:3034641911" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-red-700 font-semibold text-center">
                Call (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Life Insurance */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Life Insurance Matters</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Life insurance provides financial protection for your loved ones if something happens to you. It can help cover funeral costs, outstanding debts, mortgage payments, and provide income replacement so your family can maintain their standard of living.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're just starting a family, building your career, or planning for retirement, life insurance is a cornerstone of responsible financial planning.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Life Insurance */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Types of Life Insurance</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Shield className="text-red-600" size={48} />,
                title: 'Term Life Insurance',
                description: 'Affordable coverage for a specific period (10, 20, or 30 years). Ideal for covering temporary needs like mortgages or children\'s education.'
              },
              {
                icon: <TrendingUp className="text-red-600" size={48} />,
                title: 'Whole Life Insurance',
                description: 'Permanent coverage that lasts your entire life with guaranteed premiums and cash value accumulation.'
              },
              {
                icon: <Heart className="text-red-600" size={48} />,
                title: 'Universal Life Insurance',
                description: 'Flexible permanent coverage with adjustable premiums and death benefits, plus cash value growth potential.'
              },
              {
                icon: <Users className="text-red-600" size={48} />,
                title: 'Adjustable Life Insurance',
                description: 'Combines features of term and permanent life insurance with the flexibility to adjust coverage as your needs change.'
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

      {/* Special Coverage Options */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Life Insurance Options</h2>
            <div className="space-y-6">
              {[
                { title: 'Business Life Insurance', desc: 'Protect your business with key person coverage, buy-sell agreements, and succession planning.' },
                { title: 'Final Expense Insurance', desc: 'Affordable coverage designed to cover funeral costs and final expenses.' },
                { title: 'Mortgage Protection', desc: 'Ensure your family can keep the home if something happens to you.' },
                { title: 'Child Life Insurance', desc: 'Affordable coverage for children that can build cash value over time.' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Protect What Matters Most</h2>
            <p className="text-base sm:text-xl mb-8">
              Life insurance isn't about you—it's about the people you love and the legacy you leave behind. Let's find the right coverage together.
            </p>
            <Link href="/contact" className="inline-block bg-white text-red-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Get Your Free Life Insurance Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Family?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your life insurance options and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-semibold">
              Get a Free Quote
            </Link>
            <a href="tel:3034641911" className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center">
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
