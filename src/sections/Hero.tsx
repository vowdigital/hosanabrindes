import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ArrowIcon, CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const heroBackgroundModules = import.meta.glob('../../assets/assetsimg/img*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const heroBackgroundOrder = [11, 3, 17, 6, 14, 1, 8, 16, 4, 13, 9, 18, 2, 15, 7, 12]

const heroBackgroundImages = heroBackgroundOrder
  .map((imageNumber) => ({
    id: imageNumber,
    src: heroBackgroundModules[`../../assets/assetsimg/img${imageNumber}.webp`],
  }))
  .filter((image): image is { id: number; src: string } => Boolean(image.src))

export const Hero = () => {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (heroBackgroundImages.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroBackgroundImages.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  useGSAP(() => {
    if (reducedMotion) return

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .from('.hero__eyebrow', { y: 12, duration: 0.45 })
      .from('.hero__title-line > span', { y: 20, duration: 0.68, stagger: 0.06 }, '-=0.25')
      .from('.hero__intro, .hero__actions, .hero__proof', { y: 15, duration: 0.48, stagger: 0.08 }, '-=0.42')

    gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    }).to('.hero__content', { yPercent: 8, ease: 'none' }, 0)
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section className="hero" id="inicio" ref={scope} aria-labelledby="inicio-titulo">
      <div className="hero__background" aria-hidden="true">
        {heroBackgroundImages.map((image, index) => (
          <div
            key={image.id}
            className={`hero__background-image ${index === activeIndex ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          />
        ))}
      </div>
      <div className="container hero__grid">
        <div className="hero__content">
          <h1 className="eyebrow hero__eyebrow" id="inicio-titulo">Brindes corporativos personalizados</h1>
          <p className="hero__title">
            <span className="hero__title-line"><span>Sua marca</span></span>
            <span className="hero__title-line"><span>nas mãos de</span></span>
            <span className="hero__title-line hero__title-line--red"><span>quem importa.</span></span>
          </p>
          <p className="hero__intro">
            Brindes personalizados com <strong>produção própria</strong>, atendimento para empresas e envio para todo o Brasil.
          </p>
          <div className="hero__actions">
            <div className="hero__primary-action">
              <WhatsAppButton
                location="hero"
                trackingEvent="hero_cta_click"
              />
              <p className="hero__whatsapp-note">Atendimento comercial pelo WhatsApp</p>
            </div>
            <a className="text-link" href="#produtos">Conhecer produtos <ArrowIcon /></a>
          </div>
          <div className="hero__proof" aria-label="Destaques comerciais">
            <span><CheckIcon /> A partir de 10 unidades</span>
            <span><CheckIcon /> +10 anos de mercado</span>
          </div>
        </div>
      </div>
      <div className="hero__side-note" aria-hidden="true">Produção própria · não somos revenda</div>
    </section>
  )
}
