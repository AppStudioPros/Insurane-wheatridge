'use client'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import AnimatedCounter from '@/components/AnimatedCounter'
import AnimatedServiceIcon from '@/components/AnimatedServiceIcon'
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
      iconType: 'car',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Home Insurance',
      desc: 'Safeguard your home and belongings with customizable coverage that fits your needs.',
      link: '/services/home-insurance',
      iconType: 'home',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Life Insurance',
      desc: 'Secure your family\'s financial future with flexible life insurance solutions.',
      link: '/services/life-insurance',
      iconType: 'life',
      color: 'from-red-500 to-red-600'
    },
    { 
      title: 'Business Insurance',
      desc: 'Protect your business operations, employees, and assets with tailored coverage.',
      link: '/services/business-insurance',
      iconType: 'business',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Renters Insurance',
      desc: 'Affordable protection for your personal property and liability coverage.',
      link: '/services/renters-insurance',
      iconType: 'renters',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      title: 'Condo Insurance',
      desc: 'Specialized coverage for condo owners that complements your HOA policy.',
      link: '/services/condo-insurance',
      iconType: 'condo',
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
                <a href="tel:3034641911" className="relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-primary font-bold text-center text-lg transition-all duration-300 group">
                  <span className="absolute inset-0 bg-gradient-to-r from-white via-red-100 to-white bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center">
                    <Phone className="inline mr-2" size={20} />
                    (303) 464-1911
                  </span>
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
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <Image 
                src="/images/Jubal Terry 2025 NMP-42.jpg"
                alt="Jubal Terry, Your Trusted Insurance Agent in Wheat Ridge"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
              {/* Floating Card */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm sm:text-base text-gray-600 font-medium">Happy Clients Served</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section - NEW */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-primary to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Trusted by the Wheat Ridge Community</h2>
            <p className="text-xl text-white/90">Real numbers. Real results. Real peace of mind.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: 2, suffix: '+', label: 'Years of Service', icon: Award },
              { number: 500, suffix: '+', label: 'Clients Protected', icon: Users },
              { number: 98, suffix: '%', label: 'Customer Satisfaction', icon: TrendingUp },
              { number: 24, suffix: '/7', label: 'Claim Support', icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="mx-auto mb-4 text-yellow-300" size={48} />
                <div className="text-5xl font-bold mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Agent - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-semibold mb-4">
                Meet Your Agent
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Jubal Terry | Your Local Insurance Expert
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I'm Jubal Terry, your dedicated insurance agent at Wheat Ridge Insurance Company. Located right here in Wheat Ridge at 4251 Kipling St #165, I take pride in offering friendly, knowledgeable, and transparent service to individuals, families, and business owners throughout the area.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                With hands-on experience and a people-first approach, I help you navigate every aspect of insurance—from understanding your options to selecting coverage that fits your lifestyle and budget. My mission is to educate and empower you to make decisions that protect your future, not just sell you a policy.
              </p>
              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:text-blue-700 text-lg group">
                Learn More About Me 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Enhanced with Icons and Animation */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Coverage for Every Stage of Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that insurance isn't one-size-fits-all. That's why we offer comprehensive solutions designed to protect what matters most.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={service.link} className="group block h-full">
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full transform hover:-translate-y-2">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 transition-transform duration-300`}>
                        <AnimatedServiceIcon type={service.iconType} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.desc}
                      </p>
                      <div className="inline-flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                        Learn More 
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
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
