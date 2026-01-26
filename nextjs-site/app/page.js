'use client'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import AnimatedCounter from '@/components/AnimatedCounter'
import { CheckCircle2, Shield, Users, Clock, Phone, ArrowRight, Award, Heart, TrendingUp, Zap, Car, Home as HomeIcon, Briefcase, Key, Building2, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const services = [
    { 
      title: 'Auto Insurance',
      desc: 'Comprehensive protection for your vehicles with competitive rates and excellent coverage options.',
      link: '/services/auto-insurance',
      icon: Car,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Home Insurance',
      desc: 'Safeguard your home and belongings with customizable coverage that fits your needs.',
      link: '/services/home-insurance',
      icon: HomeIcon,
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Life Insurance',
      desc: 'Secure your family\'s financial future with flexible life insurance solutions.',
      link: '/services/life-insurance',
      icon: HeartHandshake,
      color: 'from-red-500 to-red-600'
    },
    { 
      title: 'Business Insurance',
      desc: 'Protect your business operations, employees, and assets with tailored coverage.',
      link: '/services/business-insurance',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Renters Insurance',
      desc: 'Affordable protection for your personal property and liability coverage.',
      link: '/services/renters-insurance',
      icon: Key,
      color: 'from-orange-500 to-orange-600'
    },
    { 
      title: 'Condo Insurance',
      desc: 'Specialized coverage for condo owners that complements your HOA policy.',
      link: '/services/condo-insurance',
      icon: Building2,
      color: 'from-teal-500 to-teal-600'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                🏆 Trusted by Wheat Ridge Families Since 2022
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Insurance Solutions You Can{' '}
                <span className="text-yellow-300">Trust</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                Protecting what matters most—your family, home, car, and business—with personalized coverage and local expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group bg-white text-primary px-8 py-4 rounded-xl hover:bg-yellow-300 hover:text-primary font-bold text-center text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Your Free Quote
                  <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <a href="tel:3034641911" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-primary font-bold text-center text-lg transition-all duration-300">
                  <Phone className="inline mr-2" size={20} />
                  (303) 464-1911
                </a>
              </div>

              {/* Trust Badges */}
              <motion.div 
                className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="text-yellow-300" size={24} />
                  <span className="text-sm">Licensed Agent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-yellow-300" size={24} />
                  <span className="text-sm">Farmers Insurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="text-yellow-300" size={24} />
                  <span className="text-sm">Local Service</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <Image 
                src="/images/Jubal Terry 2025 NMP-42.jpg"
                alt="Jubal Terry, Your Trusted Insurance Agent in Wheat Ridge"
                fill
                className="object-cover"
                priority
              />
              {/* Floating Card */}
              <motion.div 
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Users className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-gray-600 font-medium">Happy Clients Served</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
