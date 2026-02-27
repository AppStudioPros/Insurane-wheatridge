'use client'
import { useEffect, useState, useRef } from 'react'

// The SVG grid tile is 60×60px with crosshair centers at:
// x: 5, 35, 65, 95... (every 30px starting at 5)
// y: 5, 35, 65, 95... (every 30px starting at 5)
const GRID_START = 5
const GRID_STEP = 30
const CROSSHAIR_SIZE = 14  // SVG size — slightly larger than the 10px white ones to pop

export default function AnimatedCrosshairs({ count = 25 }) {
  const [crosshairs, setCrosshairs] = useState([])
  const wrapperRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const { width, height } = el.getBoundingClientRect()

    // Build every valid grid intersection within the container
    const positions = []
    for (let x = GRID_START; x < width; x += GRID_STEP) {
      for (let y = GRID_START; y < height; y += GRID_STEP) {
        positions.push({ x, y })
      }
    }

    // Shuffle and pick a random subset
    const shuffled = [...positions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(count, shuffled.length))

    setCrosshairs(
      selected.map((pos, i) => ({
        id: i,
        // offset by half the SVG size so the center aligns with the grid point
        top: pos.y - CROSSHAIR_SIZE / 2,
        left: pos.x - CROSSHAIR_SIZE / 2,
        delay: Math.random() * 14,
        duration: 4 + Math.random() * 8,
      }))
    )
  }, [count])

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {crosshairs.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            top: c.top,
            left: c.left,
            opacity: 0,
            animation: `crosshairFlash ${c.duration}s ease-in-out ${c.delay}s infinite`,
          }}
        >
          <svg
            width={CROSSHAIR_SIZE}
            height={CROSSHAIR_SIZE}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="0" x2="7" y2="14" stroke="#FCD34D" strokeWidth="1.5" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="#FCD34D" strokeWidth="1.5" />
          </svg>
        </div>
      ))}
    </div>
  )
}
