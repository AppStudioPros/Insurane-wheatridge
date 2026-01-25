'use client'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    insuranceType: '',
    date: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // TODO: Integrate with Resend API when API key is provided
    // For now, just show success message
    setTimeout(() => {
      setStatus('success')
      setFormData({
        insuranceType: '',
        date: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      })
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className=\"min-h-screen\">
      <Navigation />

      {/* Hero Section */}
      <section className=\"relative bg-gradient-to-br from-primary to-primary/80 text-white py-16\">
        <div className=\"container mx-auto px-4\">
          <div className=\"max-w-4xl mx-auto text-center\">
            <h1 className=\"text-4xl lg:text-5xl font-bold mb-6\">
              Contact Insurance Wheat Ridge
            </h1>
            <p className=\"text-xl\">
              Get Your Free Insurance Quote Today. Let's protect what matters most to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className=\"py-16 bg-white\">
        <div className=\"container mx-auto px-4\">
          <div className=\"grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto\">
            <div className=\"bg-gray-50 p-6 rounded-lg text-center\">
              <Phone className=\"mx-auto mb-4 text-primary\" size={40} />
              <h3 className=\"font-bold text-gray-900 mb-2\">Phone</h3>
              <a href=\"tel:3034641911\" className=\"text-primary hover:underline\">(303) 464-1911</a>
              <p className=\"text-sm text-gray-600 mt-2\">Fax: (303) 484-5255</p>
            </div>
            <div className=\"bg-gray-50 p-6 rounded-lg text-center\">
              <Mail className=\"mx-auto mb-4 text-primary\" size={40} />
              <h3 className=\"font-bold text-gray-900 mb-2\">Email</h3>
              <a href=\"mailto:jterry1@farmersagent.com\" className=\"text-primary hover:underline break-all text-sm\">jterry1@farmersagent.com</a>
            </div>
            <div className=\"bg-gray-50 p-6 rounded-lg text-center\">
              <MapPin className=\"mx-auto mb-4 text-primary\" size={40} />
              <h3 className=\"font-bold text-gray-900 mb-2\">Address</h3>
              <p className=\"text-gray-700 text-sm\">4251 Kipling St, Unit 165<br/>Wheat Ridge, CO 80033</p>
              <p className=\"text-xs text-gray-600 mt-2\">South of Winchell's Donut Shop</p>
            </div>
            <div className=\"bg-gray-50 p-6 rounded-lg text-center\">
              <Clock className=\"mx-auto mb-4 text-primary\" size={40} />
              <h3 className=\"font-bold text-gray-900 mb-2\">Hours</h3>
              <p className=\"text-gray-700 text-sm\">Mon-Fri: 8:30 AM - 5:00 PM</p>
              <p className=\"text-gray-700 text-sm\">Sat-Sun: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className=\"py-16 bg-gray-50\">
        <div className=\"container mx-auto px-4\">
          <div className=\"grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto\">
            {/* Contact Form */}
            <div>
              <h2 className=\"text-3xl font-bold text-gray-900 mb-6\">Request a Quote</h2>
              <form onSubmit={handleSubmit} className=\"space-y-6\">
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">
                    What insurance are you interested in? <span className=\"text-red-500\">*</span>
                  </label>
                  <select
                    name=\"insuranceType\"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    required
                    className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\"
                  >
                    <option value=\"\">Select an option</option>
                    <option value=\"auto\">Auto</option>
                    <option value=\"home\">Home</option>
                    <option value=\"life\">Life</option>
                    <option value=\"business\">Business</option>
                    <option value=\"condo\">Condo</option>
                    <option value=\"renters\">Renters</option>
                  </select>
                </div>

                <div className=\"grid md:grid-cols-2 gap-6\">
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 mb-2\">
                      First Name <span className=\"text-red-500\">*</span>
                    </label>
                    <input
                      type=\"text\"
                      name=\"firstName\"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\"
                    />
                  </div>
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 mb-2\">
                      Last Name <span className=\"text-red-500\">*</span>
                    </label>
                    <input
                      type=\"text\"
                      name=\"lastName\"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\"
                    />
                  </div>
                </div>

                <div className=\"grid md:grid-cols-2 gap-6\">
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 mb-2\">
                      Email <span className=\"text-red-500\">*</span>
                    </label>
                    <input
                      type=\"email\"
                      name=\"email\"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\"
                    />
                  </div>
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 mb-2\">
                      Phone
                    </label>
                    <input
                      type=\"tel\"
                      name=\"phone\"
                      value={formData.phone}
                      onChange={handleChange}
                      className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\"
                    />
                  </div>
                </div>

                <div>
                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">
                    Anything else you'd like to tell us?
                  </label>
                  <textarea
                    name=\"message\"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\"
                  ></textarea>
                </div>

                <button
                  type=\"submit\"
                  disabled={status === 'sending'}
                  className=\"w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50\"
                >
                  <Send size={20} />
                  <span>{status === 'sending' ? 'Sending...' : 'Send Request'}</span>
                </button>

                {status === 'success' && (
                  <div className=\"bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg\">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className=\"text-3xl font-bold text-gray-900 mb-6\">Visit Our Office</h2>
              <div className=\"bg-white rounded-lg shadow-md overflow-hidden h-[500px]\">
                <iframe
                  src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.3088849956974!2d-105.11819842345086!3d39.76647197154825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b872f4a8c8e9f%3A0x1234567890abcdef!2s4251%20Kipling%20St%20%23165%2C%20Wheat%20Ridge%2C%20CO%2080033!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus\"
                  width=\"100%\"
                  height=\"100%\"
                  style={{ border: 0 }}
                  allowFullScreen=\"\"
                  loading=\"lazy\"
                  referrerPolicy=\"no-referrer-when-downgrade\"
                  title=\"Insurance Wheat Ridge Office Location\"
                ></iframe>
              </div>
              <div className=\"mt-6 bg-blue-50 p-6 rounded-lg border-l-4 border-primary\">
                <p className=\"text-gray-700 leading-relaxed\">
                  <strong>Convenient Location:</strong> We're located just south of Winchell's Donut Shop on Kipling Street. Stop by anytime during our office hours for a free consultation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className=\"py-16 bg-white\">
        <div className=\"container mx-auto px-4\">
          <h2 className=\"text-3xl font-bold text-gray-900 mb-8 text-center\">Hear from Our Happy Clients</h2>
          <div className=\"max-w-2xl mx-auto\">
            <Testimonials limit={1} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
