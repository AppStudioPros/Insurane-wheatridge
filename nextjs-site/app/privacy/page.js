import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Privacy Policy | Insurance Wheat Ridge',
  description: 'Privacy Policy for Insurance Wheat Ridge. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-5 sm:p-8 lg:p-12 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-600 mb-8">Last Updated: February 2026</p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p>
                  Insurance Wheat Ridge ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address, date of birth, and Social Security number (for insurance quotes and applications)</li>
                  <li><strong>Financial Information:</strong> Payment information and banking details (processed securely through our payment processors)</li>
                  <li><strong>Insurance Information:</strong> Policy details, coverage information, claims history, and underwriting data</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, device information, and website usage data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide insurance quotes and policy recommendations</li>
                  <li>Process insurance applications and issue policies</li>
                  <li>Manage claims and customer service requests</li>
                  <li>Send policy updates, renewal notices, and important communications</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Insurance Carriers:</strong> To obtain quotes and issue policies</li>
                  <li><strong>Service Providers:</strong> Third-party vendors who assist with our business operations</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Partners:</strong> With your consent for additional services</li>
                </ul>
                <p className="mt-4">We do not sell your personal information to third parties for marketing purposes.</p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain processing of your information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your website experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="mb-4">If you have questions about this Privacy Policy, please contact us:</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Insurance Wheat Ridge</strong></p>
                  <p>Jubal Terry, Farmers Insurance Agent</p>
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
