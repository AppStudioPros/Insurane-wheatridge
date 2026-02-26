import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Terms of Service | Insurance Wheat Ridge',
  description: 'Terms of Service for Insurance Wheat Ridge. Read our terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-5 sm:p-8 lg:p-12 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-sm text-gray-600 mb-8">Last Updated: February 2026</p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p>
                  By accessing or using the Insurance Wheat Ridge website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you may not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Services Provided</h2>
                <p>
                  Insurance Wheat Ridge, operated by Jubal Terry (License #653703), provides insurance agency services including quotes, policy recommendations, application assistance, and ongoing customer support for various insurance products including auto, home, life, business, renters, and condo insurance.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Guarantee of Coverage</h2>
                <p>
                  Quotes provided are estimates and not guarantees of coverage. Final policy terms, pricing, and approval are determined by insurance carriers based on their underwriting guidelines. We do not guarantee that you will qualify for any specific policy or rate.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Accuracy of Information</h2>
                <p className="mb-4">
                  You agree to provide accurate, current, and complete information when requesting quotes or applying for insurance. Providing false or misleading information may result in:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Denial of coverage</li>
                  <li>Policy cancellation</li>
                  <li>Claim denial</li>
                  <li>Legal consequences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Agency Relationship</h2>
                <p>
                  Insurance Wheat Ridge acts as an insurance agent representing various insurance carriers. We are compensated through commissions paid by insurance carriers. Our role is to help you find appropriate coverage, but we do not make the final underwriting or claims decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Website Use</h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Transmit viruses or malicious code</li>
                  <li>Collect user information without consent</li>
                  <li>Interfere with website functionality</li>
                  <li>Use automated systems to access our website without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, and software, is the property of Insurance Wheat Ridge, Farmers Insurance, or their content suppliers and is protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Insurance Wheat Ridge and its agents shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services or website, even if we have been advised of the possibility of such damages.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Insurance Wheat Ridge, its agents, and affiliates from any claims, losses, damages, or expenses arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                <p>
                  These Terms of Service are governed by the laws of the State of Colorado, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Jefferson County, Colorado.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="mb-4">For questions about these Terms of Service, please contact:</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Insurance Wheat Ridge</strong></p>
                  <p>Jubal Terry, Farmers Insurance Agent</p>
                  <p>License #653703</p>
                  <p>4251 Kipling St, Unit 165</p>
                  <p>Wheat Ridge, CO 80033</p>
                  <p className="mt-2">Phone: <a href="tel:3034641911" className="text-primary hover:underline">(303) 464-1911</a></p>
                  <p>Email: <a href="mailto:jubal.terry@insurancewheatridge.com" className="text-primary hover:underline">jubal.terry@insurancewheatridge.com</a></p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-primary hover:underline font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
