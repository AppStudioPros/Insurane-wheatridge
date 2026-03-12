export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Insurance Wheat Ridge - Jubal Terry, Farmers Insurance Agent",
    "alternateName": "Insurance Wheatridge",
    "image": "https://www.insurancewheatridge.com/images/Jubal%20Terry%202025%20NMP-7.jpg",
    "logo": "https://www.insurancewheatridge.com/images/Jubal%20Terry%202025%20NMP-2.jpg",
    "@id": "https://www.insurancewheatridge.com",
    "url": "https://www.insurancewheatridge.com",
    "telephone": "+1-303-464-1911",
    "faxNumber": "+1-303-484-5255",
    "email": "jterry1@farmersagent.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4251 Kipling St, Unit 165",
      "addressLocality": "Wheat Ridge",
      "addressRegion": "CO",
      "postalCode": "80033",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.7661,
      "longitude": -105.0814
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "17:00"
      }
    ],
    "sameAs": [],
    "areaServed": [
      { "@type": "City", "name": "Wheat Ridge", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      { "@type": "City", "name": "Lakewood", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      { "@type": "City", "name": "Arvada", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      { "@type": "City", "name": "Golden", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      { "@type": "City", "name": "Denver", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      { "@type": "City", "name": "Edgewater", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      { "@type": "AdministrativeArea", "name": "Jefferson County" },
      { "@type": "AdministrativeArea", "name": "Denver County" },
      { "@type": "AdministrativeArea", "name": "Broomfield County" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Insurance Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Insurance", "description": "Comprehensive auto insurance coverage including liability, collision, and comprehensive protection for drivers in Wheat Ridge and the Denver metro area." } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Insurance", "description": "Homeowners insurance to protect your property, belongings, and liability in Wheat Ridge and surrounding Colorado communities." } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Life Insurance", "description": "Term and whole life insurance solutions to secure your family's financial future." } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Insurance", "description": "Commercial insurance including general liability, property, and workers compensation for Wheat Ridge businesses." } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Renters Insurance", "description": "Affordable renters insurance to protect personal property and provide liability coverage for tenants." } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Condo Insurance", "description": "Specialized condo insurance that complements HOA master policies for condo owners in Colorado." } }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Jubal Terry",
      "jobTitle": "Farmers Insurance Agent",
      "knowsAbout": ["Auto Insurance", "Home Insurance", "Life Insurance", "Business Insurance", "Renters Insurance", "Condo Insurance"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "11",
      "bestRating": "5"
    }
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What insurance products does Jubal Terry offer in Wheat Ridge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jubal Terry offers a full range of insurance products through Farmers Insurance including auto insurance, home insurance, life insurance, business insurance, renters insurance, and condo insurance. He also has access to independent markets and specialty carriers for non-standard coverage needs."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Insurance Wheat Ridge located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Insurance Wheat Ridge is located at 4251 Kipling St, Unit 165, Wheat Ridge, CO 80033. We serve Wheat Ridge, Lakewood, Arvada, Golden, Edgewater, and the greater Denver metro area."
        }
      },
      {
        "@type": "Question",
        "name": "What neighborhoods and areas does Insurance Wheat Ridge serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve clients throughout Wheat Ridge, Lakewood, Arvada, Golden, Edgewater, and the broader Denver metro area including Jefferson County, Denver County, Larimer County, and Broomfield County."
        }
      },
      {
        "@type": "Question",
        "name": "What are the office hours for Insurance Wheat Ridge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our office hours are Monday through Friday, 8:30 AM to 5:00 PM. We are closed on Saturday and Sunday. You can reach us by phone at (303) 464-1911 or by email at jterry1@farmersagent.com."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get a free insurance quote from Jubal Terry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Getting a free quote is easy! You can call us directly at (303) 464-1911, visit our office at 4251 Kipling St Unit 165 in Wheat Ridge, or fill out the contact form on our website. Jubal will personally review your needs and provide a customized quote."
        }
      }
    ]
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Insurance Wheat Ridge",
    "url": "https://www.insurancewheatridge.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.insurancewheatridge.com/contact?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  )
}
