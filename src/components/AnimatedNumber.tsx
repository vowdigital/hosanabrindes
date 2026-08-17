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

  useGSAP(() => {
    if (!element.current) return
    const format = (number: number) => `${prefix}${number.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`

    if (reducedMotion) {
      element.current.textContent = format(value)
      return
    }

    const counter = { value: 0 }
    gsap.to(counter, {
      value,
      duration: 1.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: element.current, start: 'top 88%', once: true },
      onUpdate: () => {
        if (element.current) element.current.textContent = format(counter.value)
      },
    })
  }, { dependencies: [value, prefix, suffix, decimals, reducedMotion] })

  return <span ref={element}>{prefix}{value.toLocaleString('pt-BR')}{suffix}</span>
}
