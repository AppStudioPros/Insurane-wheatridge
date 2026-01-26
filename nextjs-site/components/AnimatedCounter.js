'use client'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function AnimatedCounter({ end, duration = 2.5, suffix = '', prefix = '' }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <div ref={ref}>
      {inView && (
        <CountUp 
          end={end} 
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          separator=","
        />
      )}
    </div>
  )
}
