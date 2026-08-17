import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const MotionController = ({ children }: { children: ReactNode }) => {
  const scope = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return

    gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current).forEach((element) => {
      const isClip = element.dataset.reveal === 'clip'
      gsap.from(element, {
        autoAlpha: 0,
        y: isClip ? 0 : 28,
        clipPath: isClip ? 'inset(0 0 100% 0)' : undefined,
        duration: isClip ? 1.05 : 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh, { once: true })
    return () => window.removeEventListener('load', refresh)
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return <div ref={scope}>{children}</div>
}
