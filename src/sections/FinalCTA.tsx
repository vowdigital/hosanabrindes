import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { assetUrl } from '../lib/assets'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { WhatsAppButton } from '../components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const FinalCTA = () => {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return

    gsap.fromTo('.final-cta__product--left', {
      yPercent: 20,
      rotate: -14,
      scale: 0.92,
      autoAlpha: 0.65,
    }, {
      yPercent: -18,
      rotate: -5,
      scale: 1.04,
      autoAlpha: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85,
        invalidateOnRefresh: true,
      },
    })

    gsap.fromTo('.final-cta__product--right', {
      yPercent: -18,
      rotate: 13,
      scale: 1.05,
      autoAlpha: 0.7,
    }, {
      yPercent: 20,
      rotate: 3,
      scale: 0.93,
      autoAlpha: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85,
        invalidateOnRefresh: true,
      },
    })
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section className="final-cta" id="orcamento" ref={scope} aria-labelledby="orcamento-titulo">
      <div className="container final-cta__inner">
        <img
          className="final-cta__product final-cta__product--left"
          src={assetUrl('COPO TÉRMICO 500ML COM ABRIDOR  BRANCO 2.png')}
          loading="lazy"
          decoding="async"
          width="1183"
          height="2154"
          alt=""
          aria-hidden="true"
        />
        <div className="final-cta__content" data-reveal>
          <p className="eyebrow">Sua próxima ação começa aqui</p>
          <h2 id="orcamento-titulo">Vamos colocar sua marca em circulação?</h2>
          <p>Conte o que sua empresa precisa e receba um orçamento personalizado.</p>
          <WhatsAppButton
            location="final_cta"
          />
        </div>
        <img
          className="final-cta__product final-cta__product--right"
          src={assetUrl('Garrafa térmica tiffany.png')}
          loading="lazy"
          decoding="async"
          width="970"
          height="2678"
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
