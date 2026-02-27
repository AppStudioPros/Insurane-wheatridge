import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import IndependentContactForm from '@/components/IndependentContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact Jubal Terry | Free Insurance Quote — Wheat Ridge, CO',
  description: 'Get a free insurance quote from Jubal Terry at Wheat Ridge Insurance Company. Auto, home, life, business, and specialty coverage. Call (303) 464-1911.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Insurance Wheat Ridge
            </h1>
            <p className="text-xl">
              Get Your Free Insurance Quote Today. Let&apos;s protect what matters most to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-center">
              <Phone className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <a href="tel:3034641911" className="text-primary hover:underline">(303) 464-1911</a>
              <p className="text-sm text-gray-600 mt-2">Fax: (303) 484-5255</p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-center">
              <Mail className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:jterry1@farmersagent.com" className="text-primary hover:underline break-all text-sm">jterry1@farmersagent.com</a>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-center">
              <MapPin className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700 text-sm">4251 Kipling St, Unit 165<br/>Wheat Ridge, CO 80033</p>
              <p className="text-xs text-gray-600 mt-2">South of Winchell&apos;s Donut Shop</p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-center">
              <Clock className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-700 text-sm">Mon-Fri: 8:30 AM - 5:00 PM</p>
              <p className="text-gray-700 text-sm">Sat-Sun: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="quote-form" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Request a Farmers Insurance Quote</h2>
              <p className="text-gray-500 mb-8">
                Looking for auto, home, life, business, or renters coverage? Fill out the form and Jubal will get back to you within 24 hours with a personalized Farmers quote.
              </p>
              <IndependentContactForm apiEndpoint="/api/farmers-contact" />
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Office</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-[260px] sm:h-[380px] md:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.3088849956974!2d-105.11819842345086!3d39.76647197154825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b872f4a8c8e9f%3A0x1234567890abcdef!2s4251%20Kipling%20St%20%23165%2C%20Wheat%20Ridge%2C%20CO%2080033!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Insurance Wheat Ridge Office Location"
                ></iframe>
              </div>
              <div className="mt-6 bg-blue-50 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Convenient Location:</strong> We&apos;re located just south of Winchell&apos;s Donut Shop on Kipling Street. Stop by anytime during our office hours for a free consultation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hear from Our Happy Clients</h2>
            <p className="text-xl text-gray-600">Don&apos;t just take our word for it — here&apos;s what clients say about working with Jubal.</p>
          </div>
          <Testimonials limit={3} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
