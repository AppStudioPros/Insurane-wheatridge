'use client'
import { Car, Home as HomeIcon, HeartHandshake, Briefcase, Key, Building2 } from 'lucide-react'

export default function AnimatedServiceIcon({ type, className = "" }) {
  const iconProps = {
    className: `text-white ${className}`,
    size: 32
  }

  const animations = {
    car: 'group-hover:animate-[car-drive_0.6s_ease-in-out]',
    home: 'group-hover:animate-[door-open_0.6s_ease-in-out]',
    life: 'group-hover:animate-[heart-shake_0.5s_ease-in-out]',
    business: 'group-hover:animate-[briefcase-open_0.5s_ease-in-out]',
    renters: 'group-hover:animate-[key-rotate_0.6s_ease-in-out]',
    condo: 'group-hover:animate-[building-sway_0.6s_ease-in-out]'
  }

  const iconMap = {
    car: <Car {...iconProps} className={`${iconProps.className} ${animations.car}`} />,
    home: <HomeIcon {...iconProps} className={`${iconProps.className} ${animations.home}`} />,
    life: <HeartHandshake {...iconProps} className={`${iconProps.className} ${animations.life}`} />,
    business: <Briefcase {...iconProps} className={`${iconProps.className} ${animations.business}`} />,
    renters: <Key {...iconProps} className={`${iconProps.className} ${animations.renters}`} />,
    condo: <Building2 {...iconProps} className={`${iconProps.className} ${animations.condo}`} />
  }

  return iconMap[type] || null
}
