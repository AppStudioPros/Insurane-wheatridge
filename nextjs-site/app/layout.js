import './globals.css'
import { Inter } from 'next/font/google'
import LeadCapturePopup from '@/components/LeadCapturePopup'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Insurance Wheat Ridge | Jubal Terry, Farmers Insurance Agent',
    template: '%s | Insurance Wheat Ridge',
  },
  description: 'Trusted Wheat Ridge insurance company providing auto, home, life, and business coverage. Get personalized quotes, digital service, and local support today.',
  keywords: ['insurance', 'Wheat Ridge', 'Farmers Insurance', 'auto insurance', 'home insurance', 'life insurance', 'business insurance', 'Colorado insurance'],
  authors: [{ name: 'Jubal Terry' }],
  creator: 'Insurance Wheat Ridge',
  publisher: 'Farmers Insurance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://insurancewheatridge.com',
    siteName: 'Insurance Wheat Ridge',
    title: 'Insurance Wheat Ridge | Jubal Terry, Farmers Insurance Agent',
    description: 'Trusted Wheat Ridge insurance company providing auto, home, life, and business coverage.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Insurance Wheat Ridge - Jubal Terry, Farmers Insurance Agent',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Wheat Ridge | Jubal Terry, Farmers Insurance Agent',
    description: 'Trusted Wheat Ridge insurance company providing auto, home, life, and business coverage.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <LeadCapturePopup />
      </body>
    </html>
  )
}
