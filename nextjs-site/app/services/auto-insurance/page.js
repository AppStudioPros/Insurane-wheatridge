import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Phone, Shield, CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Auto Insurance in Wheat Ridge, CO | Comprehensive Car Coverage',
  description: 'Protect your vehicle with comprehensive auto insurance in Wheat Ridge. Get liability, collision, and comprehensive coverage with competitive rates.',
}

export default function AutoInsurancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Auto Insurance in Wheat Ridge, CO | Protection Designed for the Way You Live and Drive
            </h1>
            <p className="text-xl mb-8">
              Your vehicle gets you where you need to go, and it deserves dependable protection. We help you find an auto insurance policy that balances affordability with comprehensive coverage, including protection from accidents, theft, and unexpected harm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold text-center">
                Get a Free Quote
              </Link>
              <a href="tel:3034641911" className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 font-semibold text-center">
                Call (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Auto Insurance Matters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Auto Insurance Is Still Essential in Today's World</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Auto coverage is a legal requirement and critical for your financial well-being. It protects your car, provides peace of mind, and ensures you're not facing challenges alone if something unexpected happens on the road.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today's drivers need coverage that adapts to advanced vehicle technology and changing lifestyles—from daily commutes to road trips, remote work schedules, and even luxury automobile ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Main Types of Auto Coverage</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="text-primary" size={48} />,
                title: 'Liability Coverage',
                description: 'Can help pay the cost of injuries to others and damage to their property when you\'re at fault for a covered claim. Required by law in nearly all states.'
              },
              {
                icon: <CheckCircle2 className="text-primary" size={48} />,
                title: 'Collision Coverage',
                description: 'Can help cover the cost to repair or replace your own vehicle for losses covered under the policy. Applies to collisions with other vehicles or objects.'
              },
              {
                icon: <Shield className="text-primary" size={48} />,
                title: 'Comprehensive Coverage',
                description: 'Can cover your vehicle for losses caused by things other than a collision—like theft, vandalism, hail, fire, and animal damage.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Enhanced Coverage Options</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rental Car Coverage</h3>
                <p className="text-gray-700">Helps pay for a temporary replacement vehicle while your car is being repaired due to a covered claim.</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Loan/Lease Gap Protection</h3>
                <p className="text-gray-700">Helps bridge the difference when the current market value of a totaled car is less than what you still owe on a loan or lease.</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Roadside Assistance</h3>
                <p className="text-gray-700">Covers towing, jump-starts, and ride costs for continued travel during disruptions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The Benefits of Auto Coverage from Farmers®</h2>
            <p className="text-xl mb-8">
              If you're in an accident, our goal at Farmers is to help you get back on the road—safely and quickly—with our award-winning claims service.
            </p>
            <Link href="/contact" className="inline-block bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Get Your Free Quote Today
            </Link>
          </div>
        </div>
      </section>

      {/* Local Agent Advantage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Advantage of Working With a Local Agent</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Working with a local agent in Wheat Ridge provides personalized service, knowledge of local conditions, and tailored coverage. I help review your coverage alternatives to reflect your driving habits, vehicle ownership, and protection needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you need coverage for daily commutes, luxury vehicles, or international travel, I'm here to ensure you have the right protection at the right price.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Vehicle?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a personalized auto insurance quote that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 font-semibold">
              Get a Free Quote
            </Link>
            <a href="tel:3034641911" className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center">
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
