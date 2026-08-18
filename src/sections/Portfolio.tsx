import { useRef, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { galleryProducts } from '../data/products'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const galleryRows = Array.from({ length: 4 }, () => [] as typeof galleryProducts)
galleryProducts.forEach((product, index) => galleryRows[index % galleryRows.length].push(product))

export const Portfolio = () => {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    const tracks = gsap.utils.toArray<HTMLElement>('.portfolio-marquee__track', scope.current)
    if (!tracks.length) return

    const animations = tracks.map((track, index) => {
      const movesRight = index % 2 === 0
      return gsap.fromTo(track,
        { xPercent: movesRight ? -50 : 0 },
        {
          xPercent: movesRight ? 0 : -50,
          duration: galleryRows[index].length * 5.5,
          repeat: -1,
          ease: 'none',
          paused: true,
        },
      )
    })

    const play = () => animations.forEach((animation) => animation.play())
    const pause = () => animations.forEach((animation) => animation.pause())

    const trigger = ScrollTrigger.create({
      trigger: scope.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
    })

    return () => {
      trigger.kill()
      animations.forEach((animation) => animation.kill())
    }
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section className="section portfolio" id="portfolio" ref={scope}>
      <div className="container portfolio__heading" data-reveal>
        <p className="eyebrow">Mais itens do nosso acervo</p>
        <h2 className="section-title">Sua marca em novas cores e formatos.</h2>
        <p className="section-lead">Quatro linhas em movimento com todos os produtos do nosso acervo.</p>
      </div>

      <div className="portfolio-marquee" aria-label="Galeria completa de produtos">
        {galleryRows.map((row, rowIndex) => (
          <div
            className="portfolio-marquee__viewport"
            key={rowIndex}
            aria-label={`Linha ${rowIndex + 1} da galeria`}
          >
            <div className="portfolio-marquee__track">
              {[0, 1].map((copy) => (
                <div className="portfolio-marquee__group" key={copy} aria-hidden={copy === 1}>
                  {row.map((item) => (
                    <figure
                      className="portfolio-card"
                      key={`${item.name}-${copy}`}
                      style={{ '--portfolio-tone': item.background } as CSSProperties}
                    >
                      <img src={item.image} loading="lazy" decoding="async" alt={copy === 0 ? item.alt : ''} />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
