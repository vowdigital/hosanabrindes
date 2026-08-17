import { useState } from 'react'
import { faqItems } from '../data/faq'

export const FAQ = () => {
  const [active, setActive] = useState<number | null>(0)

  return (
    <div className="faq-list">
      {faqItems.map((item, index) => {
        const isOpen = active === index
        const panelId = `faq-panel-${index}`
        return (
          <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setActive(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-item__symbol" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </h3>
            <div id={panelId} className="faq-item__panel" hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
