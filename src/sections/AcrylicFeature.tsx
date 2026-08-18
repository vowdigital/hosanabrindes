import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { assetUrl } from '../lib/assets'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'

const bottles = [
  { name: 'Branca', file: 'Garrafa térmica branco.png', width: 1427, height: 2645 },
  { name: 'Dourada', file: 'Garrafa térmica dourada.png', width: 697, height: 2351 },
  { name: 'Preta', file: 'Garrafa térmica preta.png', width: 933, height: 2577 },
  { name: 'Rosa', file: 'Garrafa térmica rosa.png', width: 975, height: 2691 },
  { name: 'Tiffany', file: 'Garrafa térmica tiffany.png', width: 970, height: 2678 },
]

const wrapIndex = (index: number) => ((index % bottles.length) + bottles.length) % bottles.length

export const AcrylicFeature = () => {
  const scope = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const items = useRef<Array<HTMLElement | null>>([])
  const rotation = useRef(0)
  const targetRotation = useRef(0)
  const animation = useRef<gsap.core.Tween | null>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()

  const renderCarousel = useCallback((value: number) => {
    const carouselWidth = stage.current?.clientWidth || 600
    const radius = Math.min(carouselWidth * 0.28, 175)
    const depth = Math.min(carouselWidth * 0.2, 125)

    items.current.forEach((item, index) => {
      if (!item) return
      const angle = (index - value) * (Math.PI * 2 / bottles.length)
      const prominence = (Math.cos(angle) + 1) / 2

      gsap.set(item, {
        xPercent: -50,
        yPercent: -50,
        x: Math.sin(angle) * radius,
        z: Math.cos(angle) * depth,
        scale: 0.58 + prominence * 0.42,
        autoAlpha: 0.12 + prominence * 0.88,
        rotateY: -Math.sin(angle) * 16,
        zIndex: Math.round(prominence * 100),
      })
    })
  }, [])

  const rotateBy = useCallback((steps: number) => {
    if (!steps) return
    targetRotation.current += steps
    setActive(wrapIndex(Math.round(targetRotation.current)))
    animation.current?.kill()

    const proxy = { value: rotation.current }
    animation.current = gsap.to(proxy, {
      value: targetRotation.current,
      duration: reducedMotion ? 0.01 : 0.95,
      ease: 'power3.inOut',
      overwrite: true,
      onUpdate: () => {
        rotation.current = proxy.value
        renderCarousel(proxy.value)
      },
      onComplete: () => {
        rotation.current = targetRotation.current
      },
    })
  }, [reducedMotion, renderCarousel])

  const goTo = (index: number) => {
    const current = wrapIndex(Math.round(targetRotation.current))
    let distance = index - current
    if (distance > bottles.length / 2) distance -= bottles.length
    if (distance < -bottles.length / 2) distance += bottles.length
    rotateBy(distance)
  }

  useGSAP(() => {
    renderCarousel(rotation.current)
    const onResize = () => renderCarousel(rotation.current)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      animation.current?.kill()
    }
  }, { scope, dependencies: [renderCarousel], revertOnUpdate: true })

  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setInterval(() => rotateBy(1), 3800)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, rotateBy])

  return (
    <section className="section acrylic-feature" ref={scope}>
      <div className="container acrylic-feature__grid">
        <div
          className="acrylic-feature__media"
          data-reveal="clip"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
          }}
          aria-roledescription="carrossel"
          aria-label="Cores de garrafas térmicas"
        >
          <div className="bottle-carousel__stage" ref={stage}>
            {bottles.map((bottle, index) => (
              <figure
                className="bottle-carousel__item"
                key={bottle.file}
                ref={(element) => { items.current[index] = element }}
                aria-hidden={active !== index}
              >
                <img
                  src={assetUrl(bottle.file)}
                  width={bottle.width}
                  height={bottle.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  alt={active === index ? `Garrafa térmica ${bottle.name.toLowerCase()} para personalização` : ''}
                />
              </figure>
            ))}
          </div>

          <button className="bottle-carousel__control bottle-carousel__control--previous" type="button" onClick={() => rotateBy(-1)} aria-label="Garrafa anterior">
            <span aria-hidden="true">‹</span>
          </button>
          <button className="bottle-carousel__control bottle-carousel__control--next" type="button" onClick={() => rotateBy(1)} aria-label="Próxima garrafa">
            <span aria-hidden="true">›</span>
          </button>

          <div className="bottle-carousel__footer">
            <p aria-live="polite">Garrafa térmica <strong>{bottles[active].name}</strong></p>
            <div className="bottle-carousel__dots" aria-label="Escolher cor">
              {bottles.map((bottle, index) => (
                <button
                  type="button"
                  className={active === index ? 'is-active' : ''}
                  key={bottle.name}
                  onClick={() => goTo(index)}
                  aria-label={`Mostrar garrafa ${bottle.name.toLowerCase()}`}
                  aria-current={active === index ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
          <span>5 cores disponíveis</span>
        </div>

        <div className="acrylic-feature__content" data-reveal>
          <p className="eyebrow">Garrafas personalizadas</p>
          <h2 className="section-title">Sua marca presente em todos os momentos.</h2>
          <p className="section-lead">Modelos duráveis e versáteis para colocar a identidade da sua empresa em circulação todos os dias.</p>
          <ul className="check-list">
            <li><CheckIcon /> Diversas cores e modelos</li>
            <li><CheckIcon /> A partir de 10 unidades</li>
            <li><CheckIcon /> Gravação a laser ou personalização sob consulta</li>
            <li><CheckIcon /> Produção própria</li>
          </ul>
          <WhatsAppButton
            label="Pedir orçamento"
            product="Garrafas Personalizadas"
            location="acrylic_feature"
            trackingEvent="product_quote_click"
            trackingData={{ product_id: 'garrafa-personalizada' }}
          />
        </div>
      </div>
    </section>
  )
}
