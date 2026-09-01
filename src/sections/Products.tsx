import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { products } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { pushDataLayer } from '../lib/tracking'
import { WhatsAppButton } from '../components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type PortfolioProduct = (typeof products)[number]

const ProductGallery = ({ product, eager }: { product: PortfolioProduct; eager: boolean }) => {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % product.images.length)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [activeImage, product.images.length])

  const moveImage = (direction: number) => {
    setActiveImage((current) => (current + direction + product.images.length) % product.images.length)
  }

  return (
    <div className="product-story__gallery">
      <div className="product-story__images" aria-label={`Galeria de ${product.name}`}>
      <div
        className="product-story__image-track"
        style={{ transform: `translate3d(-${activeImage * 100}%, 0, 0)` }}
      >
        {product.images.map((image, imageIndex) => (
          <div className="product-story__image-slide" key={image} aria-hidden={imageIndex !== activeImage}>
            <img
              className="product-story__image"
              src={image}
              alt={`${product.alt} ${imageIndex + 1}`}
              loading={eager && imageIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>
      </div>
      <button
        className="product-story__image-control product-story__image-control--previous"
        type="button"
        onClick={() => moveImage(-1)}
        aria-label={`Ver imagem anterior de ${product.name}`}
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        className="product-story__image-control product-story__image-control--next"
        type="button"
        onClick={() => moveImage(1)}
        aria-label={`Ver próxima imagem de ${product.name}`}
      >
        <span aria-hidden="true">→</span>
      </button>
      <div className="product-story__image-dots" role="group" aria-label={`Selecionar imagem de ${product.name}`}>
        {product.images.map((_, imageIndex) => (
          <button
            className={imageIndex === activeImage ? 'is-active' : ''}
            type="button"
            key={imageIndex}
            onClick={() => setActiveImage(imageIndex)}
            aria-label={`Ver imagem ${imageIndex + 1} de ${product.name}`}
            aria-pressed={imageIndex === activeImage}
          />
        ))}
      </div>
    </div>
  )
}

export const Products = () => {
  const scope = useRef<HTMLElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

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

    if (!isMobile) {
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

      }

      const trigger = ScrollTrigger.create({
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: syncActiveProduct,
        onRefresh: syncActiveProduct,
      })

      return () => trigger.kill()
    }

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
  }, { scope, dependencies: [reducedMotion, isMobile], revertOnUpdate: true })

  return (
    <section
      className="section products"
      id="produtos"
      ref={scope}
      style={{
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
              className={`product-story ${active === index ? 'is-active' : ''}`}
              id={`produto-${product.id}`}
              key={product.id}
              style={{ '--story-accent': product.accentColor } as CSSProperties}
            >
              <div className="product-story__visual">
                <span className="product-story__number">0{index + 1}</span>
                <ProductGallery product={product} eager={index === 0} />
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
