import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Insurance Wheat Ridge</h3>
            <p className="text-gray-400 mb-2">Jubal Terry</p>
            <p className="text-gray-400 mb-2">Farmers Insurance Agent</p>
            <p className="text-gray-400 text-sm">License #653703</p>
            <p className="text-gray-400 text-sm mt-4">Over 2 years with Farmers Insurance</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition">Home</Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition">About</Link>
              <Link href="/services/auto-insurance" className="block text-gray-400 hover:text-white transition">Auto Insurance</Link>
              <Link href="/services/home-insurance" className="block text-gray-400 hover:text-white transition">Home Insurance</Link>
              <Link href="/services/life-insurance" className="block text-gray-400 hover:text-white transition">Life Insurance</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition">Contact Us</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:3034641911" className="hover:text-white">(303) 464-1911</a>
                  <p className="text-sm">Fax: (303) 484-5255</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <a href="mailto:jterry1@farmersagent.com" className="hover:text-white break-all">jterry1@farmersagent.com</a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>4251 Kipling St, Unit 165<br/>Wheat Ridge, CO 80033</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Office Hours</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span className="font-medium">Mon-Fri</span>
              </div>
              <p className="pl-7">8:30 AM - 5:00 PM</p>
              <p className="pl-7">Saturday: Closed</p>
              <p className="pl-7">Sunday: Closed</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Service Areas</h4>
              <p className="text-sm text-gray-400">Jefferson County, Denver County, Larimer County, Gilbert County, Broomfield County</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Jubal Terry, Farmers Insurance Agent. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
