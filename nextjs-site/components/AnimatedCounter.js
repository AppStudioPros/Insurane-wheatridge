'use client'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function AnimatedCounter({ end, duration = 2.5, suffix = '', prefix = '', decimals = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp 
          start={0}
          end={end} 
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          separator=","
          decimals={decimals}
          useEasing={true}
          easingFn={(t, b, c, d) => {
            // easeOutExpo easing for smooth deceleration
            return c * (-Math.pow(2, -10 * t / d) + 1) + b;
          }}
        />
      ) : (
        <span>0{suffix}</span>
      )}
    </div>
  )
}
