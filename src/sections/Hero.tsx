import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { assetUrl } from '../lib/assets'
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
      .from('.hero-visual__main', { x: 24, scale: 0.98, duration: 0.76 }, '-=0.7')
      .from('.hero-product, .hero-visual__label', { y: 22, autoAlpha: 0, duration: 0.58, stagger: 0.07 }, '-=0.5')

    gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
      .to('.hero__content', { yPercent: 8, ease: 'none' }, 0)
      .to('.hero-visual__main', { yPercent: 9, ease: 'none' }, 0)
      .to('.hero-product--cup', { yPercent: 24, rotate: -13, ease: 'none' }, 0)
      .to('.hero-product--bottle', { yPercent: 15, rotate: 11, ease: 'none' }, 0)
      .to('.hero-product--bag', { yPercent: -12, rotate: 2, ease: 'none' }, 0)
      .to('.hero-product--gin', { yPercent: 30, rotate: 14, ease: 'none' }, 0)
      .to('.hero-visual__label', { yPercent: -18, rotate: -7, ease: 'none' }, 0)

    const visual = scope.current?.querySelector<HTMLElement>('.hero-visual')
    if (!visual || !window.matchMedia('(pointer: fine)').matches) return

    const onMove = (event: PointerEvent) => {
      const rect = visual.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      gsap.to('.hero-product--cup', { x: x * 19, y: y * 14, duration: 0.55, overwrite: 'auto' })
      gsap.to('.hero-product--bottle', { x: x * -14, y: y * -11, duration: 0.55, overwrite: 'auto' })
      gsap.to('.hero-product--bag', { x: x * 8, y: y * -6, duration: 0.7, overwrite: 'auto' })
      gsap.to('.hero-product--gin', { x: x * -23, y: y * 17, duration: 0.6, overwrite: 'auto' })
      gsap.to('.hero-visual__main', { x: x * 7, y: y * 5, duration: 0.75, overwrite: 'auto' })
    }

    const onLeave = () => {
      gsap.to('.hero-product, .hero-visual__main', { x: 0, y: 0, duration: 0.75, ease: 'power3.out', overwrite: 'auto' })
    }

    visual.addEventListener('pointermove', onMove)
    visual.addEventListener('pointerleave', onLeave)
    return () => {
      visual.removeEventListener('pointermove', onMove)
      visual.removeEventListener('pointerleave', onLeave)
    }
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

        <div className="hero-visual" aria-label="Seleção de produtos Hosana Brindes">
          <div className="hero-visual__main">
            <img
              src={assetUrl('Garrafa térmica branco.png')}
              width="1427"
              height="2645"
              fetchPriority="high"
              alt="Garrafa térmica branca para personalização"
            />
          </div>
          <img
            className="hero-product hero-product--cup"
            src={assetUrl('COPO TÉRMICO 500ML COM ABRIDOR ROSA NEON.png')}
            width="598"
            height="950"
            fetchPriority="high"
            alt="Copo térmico rosa de 500 ml"
          />
          <img
            className="hero-product hero-product--bottle"
            src={assetUrl('Garrafa térmica dourada.png')}
            width="697"
            height="2351"
            fetchPriority="high"
            alt="Garrafa térmica inox dourada"
          />
          <img
            className="hero-product hero-product--bag"
            src={assetUrl('AZUL CLARO.png')}
            width="2500"
            height="2500"
            fetchPriority="low"
            decoding="async"
            alt="Sacochila azul-clara personalizada"
          />
          <img
            className="hero-product hero-product--gin"
            src={assetUrl('G3.png')}
            width="1662"
            height="3249"
            fetchPriority="low"
            decoding="async"
            alt="Taça de gin rosa personalizada"
          />
          <div className="hero-visual__label">
            <span>Produção em</span>
            <strong>Maringá</strong>
            <small>Entrega nacional</small>
          </div>
        </div>
      </div>
      <div className="hero__side-note" aria-hidden="true">Produção própria · não somos revenda</div>
    </section>
  )
}
