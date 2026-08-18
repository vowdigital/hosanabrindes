import { useCallback, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { assetUrl } from '../lib/assets'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { BottleStageScene } from '../components/BottleStageScene'

const bottles = [
  { name: 'Branca', file: 'Garrafa térmica branco.png', width: 1427, height: 2645, swatch: '#eeeae5', accent: '#a99f96' },
  { name: 'Dourada', file: 'Garrafa térmica dourada.png', width: 697, height: 2351, swatch: '#c7a76d', accent: '#a67c35' },
  { name: 'Preta', file: 'Garrafa térmica preta.png', width: 933, height: 2577, swatch: '#252525', accent: '#cf1f26' },
  { name: 'Rosa', file: 'Garrafa térmica rosa.png', width: 975, height: 2691, swatch: '#ed72aa', accent: '#d42c76' },
  { name: 'Tiffany', file: 'Garrafa térmica tiffany.png', width: 970, height: 2678, swatch: '#83d1d2', accent: '#298f93' },
]

const wrapIndex = (index: number) => ((index % bottles.length) + bottles.length) % bottles.length

export const AcrylicFeature = () => {
  const scope = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const items = useRef<Array<HTMLElement | null>>([])
  const rotation = useRef(0)
  const targetRotation = useRef(0)
  const animation = useRef<gsap.core.Tween | null>(null)
  const autoplayProgress = useRef<HTMLSpanElement>(null)
  const drag = useRef({ active: false, startX: 0, deltaX: 0, pointerId: -1 })
  const hovering = useRef(false)
  const focusWithin = useRef(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const reducedMotion = useReducedMotion()

  const syncInteraction = () => {
    setInteracting(hovering.current || focusWithin.current || drag.current.active)
  }

  const renderCarousel = useCallback((value: number) => {
    const carouselWidth = stage.current?.clientWidth || 600
    const spread = Math.min(carouselWidth * 0.285, 180)

    items.current.forEach((item, index) => {
      if (!item) return
      let distance = index - value
      while (distance > bottles.length / 2) distance -= bottles.length
      while (distance < -bottles.length / 2) distance += bottles.length
      const distanceFromCenter = Math.abs(distance)
      const prominence = Math.max(0, 1 - distanceFromCenter / 2.7)

      gsap.set(item, {
        xPercent: -50,
        yPercent: -50,
        x: distance * spread,
        y: distanceFromCenter * 18,
        z: prominence * 150 - 95,
        scale: 0.5 + prominence * 0.5,
        autoAlpha: 0.14 + prominence * 0.86,
        rotateY: distance * -11,
        rotateZ: distance * 1.8,
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
        const currentItem = items.current[wrapIndex(Math.round(targetRotation.current))]
        if (currentItem && !reducedMotion) {
          gsap.fromTo(currentItem.querySelector('img'), { scale: 0.985 }, { scale: 1, duration: 0.45, ease: 'back.out(2)' })
        }
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

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return
    const deltaX = drag.current.deltaX
    drag.current.active = false
    drag.current.pointerId = -1
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)

    if (Math.abs(deltaX) > 34) rotateBy(deltaX < 0 ? 1 : -1)
    else renderCarousel(targetRotation.current)
    syncInteraction()
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

  useGSAP(() => {
    const progress = autoplayProgress.current
    if (!progress) return
    gsap.set(progress, { scaleX: 0 })
    if (paused || interacting || reducedMotion) return

    const autoplay = gsap.to(progress, {
      scaleX: 1,
      duration: 4.8,
      ease: 'none',
      repeat: -1,
      onRepeat: () => rotateBy(1),
    })
    return () => autoplay.kill()
  }, { scope, dependencies: [paused, interacting, reducedMotion, rotateBy], revertOnUpdate: true })

  return (
    <section className="section acrylic-feature" id="garrafas" ref={scope}>
      <div className="container acrylic-feature__grid">
        <div
          className="acrylic-feature__media"
          data-reveal="clip"
          onMouseEnter={() => {
            hovering.current = true
            syncInteraction()
          }}
          onMouseLeave={() => {
            hovering.current = false
            syncInteraction()
          }}
          onFocusCapture={() => {
            focusWithin.current = true
            syncInteraction()
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              focusWithin.current = false
              syncInteraction()
            }
          }}
          aria-roledescription="carrossel"
          aria-label="Cores de garrafas térmicas"
        >
          <BottleStageScene accent={bottles[active].accent} active={active} />
          <div className="bottle-carousel__topline" aria-hidden="true">
            <span>Escolha sua cor</span>
            <span>Arraste para explorar</span>
          </div>
          <span className="acrylic-feature__badge">5 cores disponíveis</span>

          <div
            className="bottle-carousel__stage"
            ref={stage}
            tabIndex={0}
            role="group"
            aria-label={`Garrafa térmica ${bottles[active].name.toLowerCase()}, item ${active + 1} de ${bottles.length}`}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                rotateBy(-1)
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                rotateBy(1)
              }
            }}
            onPointerDown={(event) => {
              if (event.pointerType === 'mouse' && event.button !== 0) return
              animation.current?.kill()
              drag.current = { active: true, startX: event.clientX, deltaX: 0, pointerId: event.pointerId }
              event.currentTarget.setPointerCapture(event.pointerId)
              syncInteraction()
            }}
            onPointerMove={(event) => {
              if (!drag.current.active || event.pointerId !== drag.current.pointerId) return
              drag.current.deltaX = event.clientX - drag.current.startX
              const dragDistance = Math.max(120, Math.min(event.currentTarget.clientWidth * 0.3, 180))
              renderCarousel(targetRotation.current - drag.current.deltaX / dragDistance)
            }}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
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
            <div className="bottle-carousel__caption">
              <span className="bottle-carousel__count">0{active + 1} / 0{bottles.length}</span>
              <p aria-live="polite">Garrafa térmica <strong>{bottles[active].name}</strong></p>
            </div>
            <div className="bottle-carousel__actions">
              <button
                className="bottle-carousel__autoplay"
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? 'Retomar rotação automática' : 'Pausar rotação automática'}
                aria-pressed={paused}
              >
                <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
              </button>
              <div className="bottle-carousel__dots" aria-label="Escolher cor">
                {bottles.map((bottle, index) => (
                  <button
                    type="button"
                    className={active === index ? 'is-active' : ''}
                    style={{ '--dot-color': bottle.swatch } as CSSProperties}
                    key={bottle.name}
                    onClick={() => goTo(index)}
                    aria-label={`Mostrar garrafa ${bottle.name.toLowerCase()}`}
                    aria-current={active === index ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
            <span className="bottle-carousel__progress" aria-hidden="true"><span ref={autoplayProgress} /></span>
          </div>
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
