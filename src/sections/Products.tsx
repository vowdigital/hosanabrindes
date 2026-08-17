import { useRef, useState } from 'react'
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
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.product-story')
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 58%',
        end: 'bottom 42%',
        onEnter: () => {
          setActive(index)
          pushDataLayer('product_view', { product_id: products[index].id, product_name: products[index].name })
        },
        onEnterBack: () => setActive(index),
        once: false,
      })

      if (!reducedMotion) {
        gsap.from(card.querySelector('.product-story__visual'), {
          clipPath: 'inset(12% 0 12% 0)',
          scale: 0.96,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        })
      }
    })
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section className="section products" id="produtos" ref={scope}>
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
            <article className={`product-story ${!product.image ? 'product-story--type' : ''}`} id={`produto-${product.id}`} key={product.id}>
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
