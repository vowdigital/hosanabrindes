import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { galleryProducts } from '../data/products'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const Portfolio = () => {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    const rows = gsap.utils.toArray<HTMLElement>('.portfolio-marquee__track')
    const animations = rows.map((row, index) => gsap.fromTo(row,
      { xPercent: index === 0 ? 0 : -50 },
      {
        xPercent: index === 0 ? -50 : 0,
        duration: index === 0 ? 34 : 39,
        repeat: -1,
        ease: 'none',
        paused: true,
      },
    ))

    const trigger = ScrollTrigger.create({
      trigger: scope.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => animations.forEach((animation) => animation.play()),
      onEnterBack: () => animations.forEach((animation) => animation.play()),
      onLeave: () => animations.forEach((animation) => animation.pause()),
      onLeaveBack: () => animations.forEach((animation) => animation.pause()),
    })

    return () => {
      trigger.kill()
      animations.forEach((animation) => animation.kill())
    }
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  const firstRow = galleryProducts.slice(0, 4)
  const secondRow = galleryProducts.slice(4)

  return (
    <section className="section portfolio" ref={scope}>
      <div className="container portfolio__heading" data-reveal>
        <p className="eyebrow">Cores, formatos, possibilidades</p>
        <h2 className="section-title">Sua marca pode estar em muito mais lugares.</h2>
        <p className="section-lead">Uma seleção real de cores e modelos disponíveis para diferentes contextos corporativos.</p>
      </div>

      <div className="portfolio-marquee" aria-label="Galeria de produtos">
        {[firstRow, secondRow].map((row, rowIndex) => (
          <div className="portfolio-marquee__viewport" key={rowIndex}>
            <div className="portfolio-marquee__track">
              {[...row, ...row].map((item, index) => (
                <figure className="portfolio-card" key={`${item.name}-${index}`} aria-hidden={index >= row.length}>
                  <img src={item.image} loading="lazy" decoding="async" alt={index < row.length ? item.alt : ''} />
                  <figcaption>{item.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
