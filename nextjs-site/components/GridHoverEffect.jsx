'use client'
import { useEffect, useRef } from 'react'

const GRID_START = 5
const GRID_STEP  = 30
const RADIUS     = 55    // px — highlight reach around each trail point
const TRAIL_MS   = 800   // ms each trail point lingers before fully fading

export default function GridHoverEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let rafId    = null
    const trail  = []   // [{ x, y, ts }] — recent mouse positions with timestamps

    const syncSize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    const draw = () => {
      const { width, height } = canvas
      const now = performance.now()

      ctx.clearRect(0, 0, width, height)

      // Drop expired trail points
      while (trail.length > 0 && now - trail[0].ts > TRAIL_MS) trail.shift()

      // Nothing left to draw — stop the loop
      if (trail.length === 0) { rafId = null; return }

      for (let gx = GRID_START; gx < width;  gx += GRID_STEP) {
        for (let gy = GRID_START; gy < height; gy += GRID_STEP) {
          // Each crosshair takes the max alpha across all active trail points
          let maxAlpha = 0

          for (const pt of trail) {
            const dist = Math.hypot(gx - pt.x, gy - pt.y)
            if (dist >= RADIUS) continue

            const proximity = 1 - dist / RADIUS          // 1 at center, 0 at edge
            const age       = (now - pt.ts) / TRAIL_MS   // 0 = fresh, 1 = expired
            const alpha     = proximity * proximity * (1 - age)  // quadratic falloff both ways

            if (alpha > maxAlpha) maxAlpha = alpha
          }

          if (maxAlpha > 0.01) {
            ctx.strokeStyle = `rgba(252, 211, 77, ${maxAlpha})`
            ctx.lineWidth   = 1.5
            ctx.lineCap     = 'square'
            ctx.beginPath()
            ctx.moveTo(gx,     gy - 5)
            ctx.lineTo(gx,     gy + 5)
            ctx.moveTo(gx - 5, gy)
            ctx.lineTo(gx + 5, gy)
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const now  = performance.now()
      const last = trail[trail.length - 1]
      // Throttle to ~60fps — avoid stacking duplicate points during fast movement
      if (last && now - last.ts < 16) return

      const rect = canvas.getBoundingClientRect()
      trail.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, ts: now })

      if (!rafId) rafId = requestAnimationFrame(draw)
    }

    // Mouse leaving — just stop adding points; existing trail fades out naturally
    const onLeave = () => {}

    const section = canvas.parentElement
    section.addEventListener('mousemove',  onMove)
    section.addEventListener('mouseleave', onLeave)

    return () => {
      section.removeEventListener('mousemove',  onMove)
      section.removeEventListener('mouseleave', onLeave)
      ro.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  )
}
