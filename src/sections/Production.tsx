import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { assetUrl } from '../lib/assets'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const techniques = [
  ['Silk screen', 'Aplicação versátil para cores sólidas e comunicação de marca.'],
  ['Degradê', 'Transições de cor que transformam o produto em uma peça visual.'],
  ['Gravação a laser', 'Acabamento preciso e durável para itens em inox.'],
  ['Metalizado', 'Presença e brilho para ações com maior valor percebido.'],
  ['DTF', 'Detalhamento para diferentes superfícies e propostas criativas.'],
]

export const Production = () => {
  const scope = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    gsap.from('.production__image--front', {
      y: 90,
      rotate: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    })
    gsap.from('.production__image--back', {
      y: -45,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    })
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section className="section production" id="producao" ref={scope}>
      <div className="container production__top">
        <div data-reveal>
          <p className="eyebrow">Produção própria · não somos revenda</p>
          <h2 className="section-title">Aqui, a personalização acontece dentro de casa.</h2>
        </div>
        <p className="section-lead" data-reveal>A Hosana executa diferentes processos internamente, ampliando o controle sobre qualidade, acabamento e produção.</p>
      </div>

      <div className="container production__grid">
        <div className="production__art" data-reveal="clip">
          <div className="production__ring" aria-hidden="true" />
          <img
            className="production__image production__image--back"
            src={assetUrl('gb001 verde - azul.png')}
            loading="lazy"
            decoding="async"
            width="2106"
            height="2402"
            alt="Caneca com acabamento metalizado em degradê verde e azul"
          />
          <img
            className="production__image production__image--front"
            src={assetUrl('Garrafa térmica preta.png')}
            loading="lazy"
            decoding="async"
            width="933"
            height="2577"
            alt="Garrafa térmica preta adequada para gravação a laser"
          />
          <span className="production__art-label">Feito em Maringá<br />para todo o Brasil</span>
        </div>

        <div className="production__techniques">
          {techniques.map(([name, description], index) => (
            <button
              type="button"
              className={active === index ? 'is-active' : ''}
              key={name}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span>0{index + 1}</span>
              <span><strong>{name}</strong><small>{description}</small></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
