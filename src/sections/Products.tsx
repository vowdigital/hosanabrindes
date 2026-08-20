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

  const advanceProducts = () => {
    const storyScroller = scope.current?.querySelector<HTMLElement>('.products__stories')
    storyScroller?.scrollBy({ left: storyScroller.clientWidth * 0.82, behavior: 'smooth' })
  }

  const rewindProducts = () => {
    const storyScroller = scope.current?.querySelector<HTMLElement>('.products__stories')
    storyScroller?.scrollBy({ left: storyScroller.clientWidth * -0.82, behavior: 'smooth' })
  }

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.product-story')
    const storyScroller = scope.current?.querySelector<HTMLElement>('.products__stories')
    if (!storyScroller || !cards.length) return

    const syncActiveProduct = () => {
      const viewportFocus = storyScroller.getBoundingClientRect().left + storyScroller.clientWidth / 2
      const cardCenters = cards.map((card) => {
        const bounds = card.getBoundingClientRect()
        return bounds.left + bounds.width / 2
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
        pushDataLayer('product_view', { product_id: products[closestIndex].id, product_name: products[closestIndex].name })
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

    const handleScroll = () => syncActiveProduct()
    storyScroller.addEventListener('scroll', handleScroll, { passive: true })

    const trigger = ScrollTrigger.create({
      trigger: scope.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: syncActiveProduct,
      onRefresh: syncActiveProduct,
    })

    syncActiveProduct()

    return () => {
      storyScroller.removeEventListener('scroll', handleScroll)
      trigger.kill()
    }
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

        <div className="products__stories-wrap">
        <div
          className="products__stories"
          role="region"
          aria-label="Carrossel de produtos corporativos"
          tabIndex={0}
        >
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
        <button className="products__scroll-arrow products__scroll-arrow--previous" type="button" onClick={rewindProducts} aria-label="Ver produto anterior">
          <span aria-hidden="true">←</span>
        </button>
        <button className="products__scroll-arrow products__scroll-arrow--next" type="button" onClick={advanceProducts} aria-label="Ver próximo produto">
          <span aria-hidden="true">→</span>
        </button>
        </div>
      </div>
    </section>
  )
}
