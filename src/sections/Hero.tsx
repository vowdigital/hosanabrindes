import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ArrowIcon, CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const Hero = () => {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

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
    <section className="hero" id="inicio" ref={scope}>
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">Brindes corporativos personalizados</p>
          <h1 className="hero__title">
            <span className="hero__title-line"><span>Sua marca</span></span>
            <span className="hero__title-line"><span>nas mãos de</span></span>
            <span className="hero__title-line hero__title-line--red"><span>quem importa.</span></span>
          </h1>
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
