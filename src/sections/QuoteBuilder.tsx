import { useState } from 'react'
import { CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'

const productOptions = [
  'Garrafa Acrílica',
  'Copo Térmico',
  'Garrafa Térmica/Inox',
  'Bolsa Térmica',
  'Copo de Gin',
  'Outro produto',
]

const quantityOptions = ['10 a 49', '50 a 99', '100 a 299', '300 a 499', '500+']

export const QuoteBuilder = () => {
  const [product, setProduct] = useState(productOptions[0])
  const [quantity, setQuantity] = useState(quantityOptions[2])

  return (
    <section className="section quote-builder" id="orcamento">
      <div className="container quote-builder__grid">
        <div className="quote-builder__intro" data-reveal>
          <p className="eyebrow">Orçamento sem formulário longo</p>
          <h2 className="section-title">Dê o primeiro passo em menos de um minuto.</h2>
          <p className="section-lead">Escolha duas informações. O atendimento continua no WhatsApp com uma pessoa da equipe.</p>
          <div className="quote-builder__note"><CheckIcon /> Condição comercial limitada a 10 pedidos na agenda de produção.</div>
        </div>

        <div className="quote-builder__panel" data-reveal>
          <fieldset>
            <legend><span>01</span> Qual produto você procura?</legend>
            <div className="choice-grid choice-grid--products">
              {productOptions.map((option) => (
                <button
                  type="button"
                  className={product === option ? 'is-selected' : ''}
                  aria-pressed={product === option}
                  onClick={() => setProduct(option)}
                  key={option}
                >
                  {option}{product === option && <CheckIcon />}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend><span>02</span> Quantas unidades, aproximadamente?</legend>
            <div className="choice-grid choice-grid--quantity">
              {quantityOptions.map((option) => (
                <button
                  type="button"
                  className={quantity === option ? 'is-selected' : ''}
                  aria-pressed={quantity === option}
                  onClick={() => setQuantity(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="quote-builder__summary">
            <p><span>Seu pedido</span><strong>{product} · {quantity} unidades</strong></p>
            <WhatsAppButton
              label="Receber orçamento no WhatsApp"
              product={product}
              quantity={quantity}
              location="quote_builder"
              fullWidth
              trackingEvent="product_quote_click"
              trackingData={{ product_name: product }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
