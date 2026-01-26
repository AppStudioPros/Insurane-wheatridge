import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Accessibility Statement | Insurance Wheat Ridge',
  description: 'Our commitment to digital accessibility for Insurance Wheat Ridge website and services.',
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 lg:p-12 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Accessibility Statement</h1>
            <p className="text-sm text-gray-600 mb-8">Last Updated: January 2024</p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
                <p>
                  Insurance Wheat Ridge is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conformance Status</h2>
                <p>
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
                <p className="mb-4">Our website includes the following accessibility features:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clear and consistent navigation structure</li>
                  <li>Descriptive alt text for images</li>
                  <li>Proper heading hierarchy</li>
                  <li>Sufficient color contrast</li>
                  <li>Keyboard navigation support</li>
                  <li>Readable and resizable text</li>
                  <li>Form field labels and error messages</li>
                  <li>Skip navigation links</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Assistive Technologies</h2>
                <p>
                  Our website is designed to be compatible with assistive technologies including screen readers, screen magnification software, speech recognition software, and keyboard-only navigation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Known Limitations</h2>
                <p className="mb-4">
                  Despite our best efforts, some areas of our website may not yet be fully accessible. We are actively working to improve accessibility across all pages. Known limitations include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Some third-party content embedded from external sources</li>
                  <li>Certain PDF documents that are in the process of being updated</li>
                  <li>Some legacy content being gradually updated to current standards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback and Contact</h2>
                <p className="mb-4">
                  We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Insurance Wheat Ridge</strong></p>
                  <p>Jubal Terry, Farmers Insurance Agent</p>
                  <p>4251 Kipling St, Unit 165</p>
                  <p>Wheat Ridge, CO 80033</p>
                  <p className="mt-2">Phone: <a href="tel:3034641911" className="text-primary hover:underline">(303) 464-1911</a></p>
                  <p>Email: <a href="mailto:jterry1@farmersagent.com" className="text-primary hover:underline">jterry1@farmersagent.com</a></p>
                </div>
                <p className="mt-4">
                  We aim to respond to accessibility feedback within 3 business days and to propose a solution within 10 business days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Formats</h2>
                <p>
                  If you require information from our website in an alternative format (such as large print, audio, or accessible electronic format), please contact us and we will work with you to provide the information in a format that meets your needs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Efforts</h2>
                <p className="mb-4">
                  We are continuously working to enhance the accessibility of our website. Our ongoing efforts include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular accessibility audits and testing</li>
                  <li>Staff training on accessibility best practices</li>
                  <li>Incorporating accessibility into our design and development process</li>
                  <li>Seeking feedback from users with disabilities</li>
                  <li>Updating content and features to meet evolving accessibility standards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                <p>
                  Our website is built using standard web technologies including HTML5, CSS3, and JavaScript. We test our website with current versions of major browsers including Chrome, Firefox, Safari, and Edge.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
                <p>
                  Some content on our website is provided by third parties. While we strive to ensure all content is accessible, we may not have complete control over the accessibility of third-party content. If you encounter inaccessible third-party content, please let us know so we can work with our partners to address the issue.
                </p>
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
