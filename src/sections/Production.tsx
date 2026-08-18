import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { assetUrl } from '../lib/assets'
import { useReducedMotion } from '../hooks/useReducedMotion'

const techniques = [
  {
    name: 'Silk screen',
    description: 'Aplicação versátil para cores sólidas e comunicação de marca.',
    image: 'AZUL CLARO.png',
    alt: 'Bolsa azul-clara usada como referência para aplicação em silk screen',
  },
  {
    name: 'Degradê',
    description: 'Transições de cor que transformam o produto em uma peça visual.',
    image: 'gb001 verde - azul.png',
    alt: 'Caneca com acabamento em degradê verde e azul',
  },
  {
    name: 'Gravação a laser',
    description: 'Acabamento preciso e durável para itens em inox.',
    image: 'Garrafa térmica preta.png',
    alt: 'Garrafa térmica preta usada como referência para gravação a laser',
  },
  {
    name: 'Metalizado',
    description: 'Presença e brilho para ações com maior valor percebido.',
    image: 'Garrafa térmica dourada.png',
    alt: 'Garrafa térmica dourada com acabamento metalizado',
  },
  {
    name: 'DTF',
    description: 'Detalhamento para diferentes superfícies e propostas criativas.',
    image: 'G3.png',
    alt: 'Copo de gin rosa usado como referência provisória para personalização DTF',
  },
]

export const Production = () => {
  const scope = useRef<HTMLElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    techniques.forEach((technique) => {
      const preload = new Image()
      preload.src = assetUrl(technique.image)
    })
  }, [])

  useGSAP(() => {
    if (reducedMotion || !image.current) return
    gsap.fromTo(image.current, {
      autoAlpha: 0,
      x: -110,
      rotate: -3,
    }, {
      autoAlpha: 1,
      x: 0,
      rotate: 0,
      duration: 0.72,
      ease: 'power3.out',
    })
  }, { scope, dependencies: [active, reducedMotion], revertOnUpdate: true })

  const activeTechnique = techniques[active]

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
            className="production__image production__image--active"
            src={assetUrl(activeTechnique.image)}
            ref={image}
            key={activeTechnique.image}
            loading="lazy"
            decoding="async"
            alt={activeTechnique.alt}
          />
          <span className="production__art-label">Feito em Maringá<br />para todo o Brasil</span>
        </div>

        <div className="production__techniques">
          {techniques.map((technique, index) => (
            <button
              type="button"
              className={active === index ? 'is-active' : ''}
              key={technique.name}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span>0{index + 1}</span>
              <span><strong>{technique.name}</strong><small>{technique.description}</small></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
