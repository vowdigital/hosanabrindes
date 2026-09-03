import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 0 }: AnimatedNumberProps) => {
  const element = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  const format = (number: number) => `${prefix}${number.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`

  useGSAP(() => {
    if (!element.current) return

    if (reducedMotion) {
      element.current.textContent = format(value)
      return
    }

    element.current.textContent = format(0)
    const counter = { value: 0 }
    const animation = gsap.to(counter, {
      value,
      duration: 1.75,
      ease: 'power1.out',
      snap: { value: decimals > 0 ? 10 ** decimals : 1 },
      scrollTrigger: { trigger: element.current, start: 'top 86%', once: true },
      onUpdate: () => {
        if (element.current) element.current.textContent = format(counter.value)
      },
    })

    return () => animation.kill()
  }, { dependencies: [value, prefix, suffix, decimals, reducedMotion] })

  return <span ref={element}>{format(value)}</span>
}
