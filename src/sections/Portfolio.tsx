import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { portfolioImageAlts } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const portfolioImageModules = import.meta.glob('../../assets/assetsimg/img*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const portfolioImageOrder = [11, 3, 17, 6, 14, 1, 8, 16, 4, 13, 9, 18, 2, 15, 7, 12, 5, 10]
const galleryProducts = portfolioImageOrder.map((imageNumber) => ({
  name: `Brinde personalizado ${imageNumber}`,
  image: portfolioImageModules[`../../assets/assetsimg/img${imageNumber}.webp`],
  alt: portfolioImageAlts[imageNumber],
}))

const galleryRows = Array.from({ length: 3 }, () => [] as typeof galleryProducts)
galleryProducts.forEach((product, index) => galleryRows[index % galleryRows.length].push(product))

export const Portfolio = () => {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const images = scope.current?.querySelectorAll<HTMLImageElement>('[data-gallery-src]')
    if (!images?.length) return

    const loadImage = (image: HTMLImageElement) => {
      const source = image.dataset.gallerySrc
      if (!source) return

      image.src = source
      image.removeAttribute('data-gallery-src')
    }

    if (!('IntersectionObserver' in window)) {
      images.forEach(loadImage)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        loadImage(entry.target as HTMLImageElement)
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '500px 0px' })

    images.forEach((image) => observer.observe(image))

    return () => observer.disconnect()
  }, [])

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

    let isInViewport = false

    const play = () => {
      tracks.forEach((track) => track.classList.add('is-animating'))
      animations.forEach((animation) => animation.play())
    }

    const pause = () => {
      tracks.forEach((track) => track.classList.remove('is-animating'))
      animations.forEach((animation) => animation.pause())
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pause()
      } else if (isInViewport) {
        play()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const trigger = ScrollTrigger.create({
      trigger: scope.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        isInViewport = true
        if (!document.hidden) play()
      },
      onEnterBack: () => {
        isInViewport = true
        if (!document.hidden) play()
      },
      onLeave: () => {
        isInViewport = false
        pause()
      },
      onLeaveBack: () => {
        isInViewport = false
        pause()
      },
    })

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      trigger.kill()
      pause()
      animations.forEach((animation) => animation.kill())
    }
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section className="section portfolio" id="portfolio" ref={scope} aria-labelledby="portfolio-titulo">
      <div className="container portfolio__heading" data-reveal>
        <h2 className="eyebrow" id="portfolio-titulo">Mais itens do nosso acervo</h2>
        <p className="section-title">Sua marca em novas cores e formatos.</p>
      </div>

      <div className="portfolio-marquee" aria-label="Três carrosséis com produtos personalizados">
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
                    <figure className="portfolio-card" key={`${item.name}-${copy}`}>
                      <img
                        data-gallery-src={item.image}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        alt={copy === 0 ? item.alt : ''}
                      />
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
