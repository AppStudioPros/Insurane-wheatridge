import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import { GraduationCap, Award, MapPin, Phone } from 'lucide-react'

export const metadata = {
  title: 'About Jubal Terry | Farmers Insurance Agent in Wheat Ridge, CO',
  description: 'Meet Jubal Terry, your trusted Farmers Insurance agent in Wheat Ridge, CO. Over 2 years of experience providing personalized insurance solutions.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About Jubal Terry
            </h1>
            <p className="text-xl">
              Your Trusted Farmers Insurance Agent in Wheat Ridge, Colorado
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Jubal Terry 2025 NMP-42.jpg"
                alt="Jubal Terry, Farmers Insurance Agent"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Farmers Insurance Agency Owner</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                As your local Farmers® insurance agent in Wheat Ridge CO, at 4251 Kipling St #165, I help customers like you identify the insurance coverage that best fits your needs. This process is straightforward and personalized to help make you smarter about insurance.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                I have over two years of knowledge and experience to help you better understand your coverage options—whether that's auto, home, renters, business insurance, and more. We are just south of Winchell's Donut Shop on Kipling Street.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Give me a call at (303) 464-1911 and I'll be happy to answer any questions you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 font-semibold text-center">
                  Get a Free Quote
                </Link>
                <a href="tel:3034641911" className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold text-center">
                  Call (303) 464-1911
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Credentials & Experience</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Award className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Agent License</h3>
                <p className="text-gray-700">#653703</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Award className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Years with Farmers</h3>
                <p className="text-gray-700">Over 2 years</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <GraduationCap className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-700">Geology, Wheat Ridge High School</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <MapPin className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed States</h3>
                <p className="text-gray-700">Colorado (CO)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-primary">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Out of Work Geologist So I Bought an Insurance Agency!!</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a skilled unconventional and conventional oil and gas prospect generator with wide-ranging experience throughout all Rocky Mountain basins, Appalachian basin, Cherokee basin, and the Illinois basin. My extensive knowledge of stratigraphic concepts in fossil fuel exploration, structural geology, economic evaluation, regional studies, play and prospect generation, evaluation, and development has given me strong analytical and problem-solving skills that I now apply to helping families and businesses protect what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Neighborhoods We Serve</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Jefferson County',
                  'Denver County',
                  'Larimer County',
                  'Gilbert County',
                  'Broomfield County'
                ].map((area) => (
                  <div key={area} className="flex items-center space-x-3">
                    <MapPin className="text-primary flex-shrink-0" size={24} />
                    <span className="text-lg text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What My Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take my word for it—here's what my clients have to say about their experience.</p>
          </div>
          <Testimonials limit={6} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stop by our office, conveniently located just south of Winchell's Donut Shop, or give me a call. I'd love to answer your questions and provide a free, customized insurance quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Schedule a Consultation
            </Link>
            <a href="tel:3034641911" className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 font-semibold flex items-center justify-center">
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
