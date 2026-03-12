import './globals.css'
import { Inter } from 'next/font/google'
import LeadCapturePopup from '@/components/LeadCapturePopup'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import InstallPrompt from '@/components/InstallPrompt'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.insurancewheatridge.com'),
  title: {
    default: 'Insurance Wheatridge | Farmers Insurance Agent J. Terry | Wheat Ridge, CO',
    template: '%s | Insurance Wheatridge',
  },
  description: 'Your local Farmers Insurance agent in Wheat Ridge, Colorado. Auto, home, life, business, renters, and condo insurance. Get a free quote today.',
  keywords: ['insurance', 'Wheat Ridge', 'Farmers Insurance', 'auto insurance', 'home insurance', 'life insurance', 'business insurance', 'Colorado insurance'],
  authors: [{ name: 'Jubal Terry' }],
  creator: 'Insurance Wheatridge',
  publisher: 'Farmers Insurance',
  alternates: {
    canonical: 'https://www.insurancewheatridge.com',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.insurancewheatridge.com',
    siteName: 'Insurance Wheatridge',
    title: 'Insurance Wheatridge | Farmers Insurance Agent J. Terry | Wheat Ridge, CO',
    description: 'Your local Farmers Insurance agent in Wheat Ridge, Colorado. Auto, home, life, business, renters, and condo insurance. Get a free quote today.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Insurance Wheatridge - Jubal Terry, Farmers Insurance Agent',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Wheatridge | Farmers Insurance Agent J. Terry | Wheat Ridge, CO',
    description: 'Your local Farmers Insurance agent in Wheat Ridge, Colorado. Auto, home, life, business, renters, and condo insurance. Get a free quote today.',
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
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    other: { 'msvalidate.01': 'pending' },
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0954a5" />
        <StructuredData />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <ServiceWorkerRegistration />
        <InstallPrompt />
        {children}
        <LeadCapturePopup />
      </body>
    </html>
  )
}
