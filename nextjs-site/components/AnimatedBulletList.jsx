'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const DEFAULT_ITEMS = [
  'High-risk or non-standard auto coverage',
  'Hard-to-place home or property insurance',
  'Specialty and niche business policies',
  'Coverage for situations standard carriers decline',
  'Unique life or liability needs',
]

const SWEEP_MS = 3000   // time for the sweep to cross one line
const GAP_MS   = 400    // pause between lines
const RESET_MS = 1800   // pause after last line before looping

export default function AnimatedBulletList({ items = DEFAULT_ITEMS }) {
  const [activeIndex, setActiveIndex] = useState(-1)  // -1 = not started
  const [cycleKey,    setCycleKey]    = useState(0)

  const [ref, inView] = useInView({ threshold: 0.4 })

  // Start when scrolled into view, reset when scrolled out
  useEffect(() => {
    if (inView && activeIndex === -1) {
      // Small delay before first sweep so it feels intentional
      const t = setTimeout(() => setActiveIndex(0), 300)
      return () => clearTimeout(t)
    }
    if (!inView) {
      setActiveIndex(-1)
      setCycleKey(prev => prev + 1)
    }
  }, [inView])

  // Cycle through items
  useEffect(() => {
    if (activeIndex < 0) return

    let t1, t2
    t1 = setTimeout(() => {
      if (activeIndex < items.length - 1) {
        t2 = setTimeout(() => setActiveIndex(prev => prev + 1), GAP_MS)
      } else {
        t2 = setTimeout(() => {
          setCycleKey(prev => prev + 1)
          setActiveIndex(0)
        }, RESET_MS)
      }
    }, SWEEP_MS)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [activeIndex, cycleKey])

  return (
    <ul ref={ref} className="space-y-3 mb-8">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          {/* Checkmark — never changes color */}
          <span className="text-primary font-bold mt-0.5 flex-shrink-0">✓</span>

          {/* Text wrapper — always renders base gray text, no layout shift */}
          <span className="relative inline-block text-gray-700 leading-snug">
            {/* Base layer — always visible, sets the width */}
            {item}

            {/* Sweep overlay — only mounts on active item */}
            {i === activeIndex && (
              <>
                {/* Outer glow — wide blur */}
                <span
                  key={`outer-${i}-${cycleKey}`}
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    color: '#CC0000',
                    filter: 'blur(8px)',
                    maskImage: 'linear-gradient(90deg, transparent 25%, white 44%, white 56%, transparent 75%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 25%, white 44%, white 56%, transparent 75%)',
                    maskSize: '250% 100%',
                    WebkitMaskSize: '250% 100%',
                    animation: `maskSweep ${SWEEP_MS}ms linear forwards`,
                  }}
                >{item}</span>
                {/* Inner layer — tight glow */}
                <span
                  key={`inner-${i}-${cycleKey}`}
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    color: '#CC0000',
                    filter: 'blur(2px)',
                    maskImage: 'linear-gradient(90deg, transparent 40%, white 46%, white 54%, transparent 60%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 40%, white 46%, white 54%, transparent 60%)',
                    maskSize: '250% 100%',
                    WebkitMaskSize: '250% 100%',
                    animation: `maskSweep ${SWEEP_MS}ms linear forwards`,
                  }}
                >{item}</span>
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
