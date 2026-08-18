import { useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { products } from '../data/products'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { pushDataLayer } from '../lib/tracking'
import { WhatsAppButton } from '../components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const Products = () => {
  const scope = useRef<HTMLElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.product-story')
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 68%',
        end: 'bottom 32%',
        onEnter: () => {
          pushDataLayer('product_view', { product_id: products[index].id, product_name: products[index].name })
        },
        once: false,
      })

      if (!reducedMotion) {
        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            end: 'top 48%',
            scrub: 0.65,
          },
        })

        entrance
          .fromTo(card.querySelector('.product-story__visual'), {
            autoAlpha: 0.35,
            clipPath: 'inset(10% 4% 10% 4%)',
            scale: 0.94,
            y: 54,
          }, {
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            y: 0,
            ease: 'power2.out',
          }, 0)
          .fromTo(card.querySelector('.product-story__body'), {
            autoAlpha: 0,
            y: 30,
          }, {
            autoAlpha: 1,
            y: 0,
            ease: 'power2.out',
          }, 0.18)
      }
    })

    const syncActiveProduct = () => {
      const viewportFocus = window.innerHeight * 0.52
      const cardCenters = cards.map((card) => {
        const bounds = card.getBoundingClientRect()
        return bounds.top + bounds.height / 2
      })
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cardCenters.forEach((cardCenter, index) => {
        const distance = Math.abs(cardCenter - viewportFocus)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (activeRef.current !== closestIndex) {
        activeRef.current = closestIndex
        setActive(closestIndex)
      }

      let backgroundColor = products[closestIndex].backgroundColor

      if (!reducedMotion) {
        for (let index = 0; index < cardCenters.length - 1; index += 1) {
          const currentCenter = cardCenters[index]
          const nextCenter = cardCenters[index + 1]

          if (viewportFocus >= currentCenter && viewportFocus <= nextCenter) {
            const progress = gsap.utils.clamp(0, 1, (viewportFocus - currentCenter) / (nextCenter - currentCenter))
            backgroundColor = gsap.utils.interpolate(
              products[index].backgroundColor,
              products[index + 1].backgroundColor,
              progress,
            )
            break
          }
        }
      }

      if (scope.current) scope.current.style.backgroundColor = backgroundColor
    }

    ScrollTrigger.create({
      trigger: scope.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: syncActiveProduct,
      onRefresh: syncActiveProduct,
    })
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section
      className="section products"
      id="produtos"
      ref={scope}
      style={{
        '--products-background': products[active].backgroundColor,
        '--products-accent': products[active].accentColor,
      } as CSSProperties}
    >
      <div className="container products__layout">
        <div className="products__intro">
          <p className="eyebrow">Portfólio corporativo</p>
          <h2 className="section-title">O brinde certo para cada momento da sua marca.</h2>
          <p className="section-lead">Produtos pensados para ações de RH, marketing, eventos e relacionamento — com escala e personalização profissional.</p>
          <ol className="products__index" aria-label="Produtos em destaque">
            {products.map((product, index) => (
              <li key={product.id} className={active === index ? 'is-active' : ''}>
                <a href={`#produto-${product.id}`}>
                  <span>0{index + 1}</span>{product.shortName}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="products__stories">
          {products.map((product, index) => (
            <article
              className={`product-story ${active === index ? 'is-active' : ''} ${!product.image ? 'product-story--type' : ''}`}
              id={`produto-${product.id}`}
              key={product.id}
              style={{ '--story-accent': product.accentColor } as CSSProperties}
            >
              <div className={`product-story__visual product-story__visual--${product.imageFit || 'contain'}`}>
                <span className="product-story__number">0{index + 1}</span>
                {product.image ? (
                  <img src={product.image} alt={product.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                ) : (
                  <div className="product-story__typographic" aria-hidden="true">
                    <span>{product.shortName.split(' ')[0]}</span>
                    <strong>{product.shortName.split(' ').slice(1).join(' ')}</strong>
                  </div>
                )}
                <span className="product-story__category">{product.category}</span>
              </div>
              <div className="product-story__body">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <dl>
                  <div><dt>Investimento</dt><dd>{product.priceLabel}</dd></div>
                  <div><dt>Pedido</dt><dd>{product.minimum}</dd></div>
                  <div><dt>Acabamento</dt><dd>{product.customization.join(' · ')}</dd></div>
                </dl>
                <WhatsAppButton
                  label="Pedir orçamento"
                  product={product.name}
                  location="product_card"
                  trackingEvent="product_quote_click"
                  trackingData={{ product_id: product.id, product_name: product.name }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
