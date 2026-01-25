import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <Image 
                src="/images/Jubal Terry 2025 NMP-2.jpg" 
                alt="Farmers Insurance Logo"
                width={60}
                height={60}
                className="rounded"
              />
              <div>
                <div className="text-xl font-bold text-primary">Insurance Wheat Ridge</div>
                <div className="text-sm text-gray-600">Jubal Terry, Farmers Insurance Agent</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary font-medium">About</Link>
              <Link href="/services" className="text-gray-700 hover:text-primary font-medium">Services</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link>
              <a href="tel:3034641911" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 font-medium">
                (303) 464-1911
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Trusted Insurance Solutions in Wheat Ridge, CO
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Protecting what matters most with personalized coverage for auto, home, life, and business insurance.
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
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src="/images/Jubal Terry 2025 NMP-42.jpg"
                alt="Jubal Terry, Your Local Insurance Agent"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Coverage Options for Every Stage of Life</h2>
            <p className="text-xl text-gray-600">Personalized insurance solutions designed to protect what matters most to you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Auto Insurance', desc: 'Comprehensive protection for your vehicles', link: '/services/auto-insurance', icon: '🚗' },
              { title: 'Home Insurance', desc: 'Safeguard your home and belongings', link: '/services/home-insurance', icon: '🏠' },
              { title: 'Life Insurance', desc: 'Secure your family\'s financial future', link: '/services/life-insurance', icon: '❤️' },
              { title: 'Business Insurance', desc: 'Protect your business operations', link: '/services/business-insurance', icon: '💼' },
              { title: 'Renters Insurance', desc: 'Coverage for your personal property', link: '/services/renters-insurance', icon: '🔑' },
              { title: 'Condo Insurance', desc: 'Specialized protection for condo owners', link: '/services/condo-insurance', icon: '🏢' },
            ].map((service) => (
              <div key={service.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Link href={service.link} className="text-primary font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Insurance Wheat Ridge</h3>
              <p className="text-gray-400 mb-4">Jubal Terry, Farmers Insurance Agent</p>
              <p className="text-gray-400">License #653703</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone size={18} />
                  <span>(303) 464-1911</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={18} />
                  <span>jterry1@farmersagent.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>4251 Kipling St, Unit 165, Wheat Ridge, CO 80033</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 8:30 AM - 5:00 PM</p>
                <p>Saturday: Closed</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Jubal Terry, Farmers Insurance Agent. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
