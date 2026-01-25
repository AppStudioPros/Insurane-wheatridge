'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marjorie Curtis',
    text: "I've been a customer of Jubal Terry Farmers insurance company for several years now and I can't speak highly enough of their service. From the moment I reached out for a quote, to handling claims, they have consistently demonstrated professionalism, efficiency and care. Additionally, I appreciate Jubal Terry Farmers insurance companies commitment to transparency and integrity. They have been upfront about policy details and never hesitated to answer my questions or address any concerns I've had. Thank you, Jubal Terry Farmers insurance company for providing peace of mind and excellent service!",
    rating: 5
  },
  {
    name: 'Deborah W.',
    text: 'I appreciate the dedication to reviewing my policies to be sure I have the correct coverage at a fair premium price. It is one of the reasons I have remained with Farmers for so many years.',
    rating: 5
  },
  {
    name: 'Nancy L.',
    text: 'The experience has been great as a new customer it means a lot for that personal touch. Looking forward to a long business venture.',
    rating: 5
  },
  {
    name: 'Caleb J.',
    text: "Jubal's office and Lynette have been an absolute pleasure to work with ever since they have taken over my policies from my old farmers agent who retired. They always keep me up to date and make sure everything is simple and easy. Thank you guys for always looking out for me and my family.",
    rating: 5
  },
  {
    name: 'Marjorie C.',
    text: "Whether you're looking for homeowners insurance, auto insurance, renters insurance, or another kind, Jubal Terry was there to help me understand the insurance coverage I needed. He helped me understand my coverage options so I can protect what matters most to me. Thank you Jubal for your fast turn time in getting me the bundle insurance that I needed.",
    rating: 5
  },
  {
    name: 'Tom Sperr',
    text: "Jubal Terry is great to deal with, he's always happy to hear from you and help you with your insurance needs. I would and do recommend him to anyone.",
    rating: 5
  },
  {
    name: 'Tara Stiner',
    text: 'Fantastic customer service and overall a great experience moving our policies to them!',
    rating: 5
  },
  {
    name: 'Clyde W',
    text: 'Jubal was friendly, informative and stayed on top of the transition at every turn.',
    rating: 5
  },
  {
    name: 'Scott B.',
    text: "Jubal's great.",
    rating: 5
  },
  {
    name: 'Pamela P.',
    text: 'Lanette Sawyer has always been wonderful to work with!',
    rating: 5
  },
  {
    name: 'Rebecca C.',
    text: 'Great team. Answers come swiftly',
    rating: 5
  }
]

export default function Testimonials({ limit }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials
  const showNavigation = !limit

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (limit) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            <p className="font-semibold text-gray-900">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex mb-4">
          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
            <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
          "{testimonials[currentIndex].text}"
        </p>
        <p className="font-bold text-lg text-gray-900">- {testimonials[currentIndex].name}</p>
      </div>
      
      {showNavigation && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button onClick={prev} className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition">
            <ChevronLeft size={24} />
          </button>
          <span className="text-gray-600">{currentIndex + 1} / {testimonials.length}</span>
          <button onClick={next} className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
