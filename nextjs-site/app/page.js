import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import { CheckCircle2, Shield, Users, Clock, Phone, ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Home',
  description: 'Trusted Wheat Ridge insurance company providing auto, home, life, and business coverage. Get personalized quotes, digital service, and local support today.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Wheat Ridge Insurance Company | Insurance Solutions in Wheat Ridge, CO
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90">
                Life can change quickly, and when it does, you want to make sure the things that matter most—like your family, home, car, and business—are well protected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-center text-lg transition">
                  Get a Free Quote
                </Link>
                <a href="tel:3034641911" className="bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary/90 font-semibold text-center text-lg transition">
                  Call (303) 464-1911
                </a>
              </div>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/Jubal Terry 2025 NMP-42.jpg"
                alt="Jubal Terry, Your Local Insurance Agent in Wheat Ridge"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Agent */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Jubal Terry | Meet Your Local Insurance Agent in Wheat Ridge
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm Jubal Terry, your dedicated insurance agent at Wheat Ridge Insurance Company. Located right here in Wheat Ridge at 4251 Kipling St #165, I take pride in offering friendly, knowledgeable, and transparent service to individuals, families, and business owners throughout the area.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              With hands-on experience and a people-first approach, I help you navigate every aspect of insurance—from understanding your options to selecting coverage that fits your lifestyle and budget. My mission is to educate and empower you to make decisions that protect your future, not just sell you a policy.
            </p>
            <Link href="/about" className="inline-flex items-center text-primary font-semibold hover:underline text-lg">
              Learn More About Me <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Coverage Options for Every Stage of Life</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">At Wheat Ridge Insurance Company, we understand that insurance isn't one-size-fits-all. That's why we offer a wide range of solutions designed to protect what matters most.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Auto Insurance Wheat Ridge', 
                desc: 'Your vehicle gets you where you need to go and it deserves dependable protection. We help you find an auto insurance policy that balances affordability with comprehensive coverage.',
                link: '/services/auto-insurance', 
                icon: '🚗' 
              },
              { 
                title: 'Property & Home Insurance Wheat Ridge', 
                desc: 'Your home is more than an investment; it\'s where memories are made. Our home insurance options safeguard your dwelling, belongings, and liability.',
                link: '/services/home-insurance', 
                icon: '🏠' 
              },
              { 
                title: 'Life Insurance Wheat Ridge', 
                desc: 'Planning for the future means protecting the people you love. With trusted life insurance options, we help you secure financial peace of mind for your family.',
                link: '/services/life-insurance', 
                icon: '❤️' 
              },
              { 
                title: 'Business Insurance', 
                desc: 'Running a business comes with real risks. From liability to property protection, we help business owners find coverage that protects their operations, employees, and assets.',
                link: '/services/business-insurance', 
                icon: '💼' 
              },
              { 
                title: 'Renters Insurance', 
                desc: 'Even if you don\'t own your home, your personal property still matters. Our renters insurance provides financial protection against theft, fire, and other covered losses.',
                link: '/services/renters-insurance', 
                icon: '🔑' 
              },
              { 
                title: 'Condo Insurance Wheat Ridge', 
                desc: 'Condo insurance helps cover what your HOA\'s master policy doesn\'t. We\'ll help you protect what\'s inside your unit with coverage that fits your home and lifestyle.',
                link: '/services/condo-insurance', 
                icon: '🏢' 
              },
            ].map((service) => (
              <div key={service.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                <Link href={service.link} className="inline-flex items-center text-primary font-semibold hover:underline">
                  Learn More <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Wheat Ridge Insurance Company?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Selecting the right insurance partner isn't just about policies—it's about trust, clarity, and support when it matters most.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="text-primary" size={40} />,
                title: 'Personalized Guidance',
                desc: 'We take the time to listen, understand your goals, and build coverage that suits your life. No cookie-cutter templates.'
              },
              {
                icon: <Shield className="text-primary" size={40} />,
                title: 'Local Expertise',
                desc: 'As a local business serving Wheat Ridge and surrounding communities, we understand the Colorado risks, trends, and regulations that shape your coverage needs.'
              },
              {
                icon: <CheckCircle2 className="text-primary" size={40} />,
                title: 'Clear Communication',
                desc: 'Insurance jargon shouldn\'t slow you down. We explain your options in clear, straightforward language.'
              },
              {
                icon: <Clock className="text-primary" size={40} />,
                title: 'Committed Support',
                desc: 'From your first quote to submitting a claim, we\'re here for you with quick help, ongoing coverage reviews, and answers you can count on.'
              },
              {
                icon: <CheckCircle2 className="text-primary" size={40} />,
                title: 'Flexible Solutions',
                desc: 'We partner with trusted carriers to offer a range of coverage options, competitive rates, and flexible plans tailored to your needs.'
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How the Insurance Process Works</h2>
            <p className="text-xl text-gray-600">We make getting insured easy</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: '1', title: 'Free Consultation', desc: 'Reach out by phone or in person to discuss what coverage you need.' },
              { number: '2', title: 'Personalized Quote', desc: 'We assess your situation and provide a custom quote based on your priorities.' },
              { number: '3', title: 'Policy Selection', desc: 'You choose the solution that fits your lifestyle and budget.' },
              { number: '4', title: 'Ongoing Support', desc: 'We\'re here to help with adjustments, questions, and claims whenever necessary.' },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">We're proud to serve Wheat Ridge residents and local business owners with integrity, professionalism, and care.</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white px-6 rounded-lg">
                <AccordionTrigger className="text-lg font-semibold">What products do you offer?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  I offer the following products: Auto insurance, Home insurance, Business insurance, Motorcycle insurance, Recreational insurance, Renters insurance, Umbrella insurance, Term Life insurance, and Whole Life insurance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-white px-6 rounded-lg">
                <AccordionTrigger className="text-lg font-semibold">What is your address?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  4251 Kipling St, Unit 165, Wheat Ridge, CO 80033. We're located just south of Winchell's Donut Shop.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-white px-6 rounded-lg">
                <AccordionTrigger className="text-lg font-semibold">What neighborhoods do you serve?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  I serve the following neighborhoods: Jefferson County, Denver County, Larimer County, Gilbert County, and Broomfield County.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-white px-6 rounded-lg">
                <AccordionTrigger className="text-lg font-semibold">What are your hours?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Monday to Friday: 8:30 AM - 5:00 PM. Saturday and Sunday: Closed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Get Your Free Insurance Quote Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Now is the perfect time to secure your future and protect what matters most. We're proud to be your local Wheat Ridge Insurance Company. Ready to protect your today and safeguard your tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg transition">
              Get a Quote — It's Fast & Free
            </Link>
            <a href="tel:3034641911" className="bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary/90 font-semibold text-lg transition flex items-center justify-center">
              <Phone className="mr-2" size={20} />
              Call: (303) 464-1911
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
