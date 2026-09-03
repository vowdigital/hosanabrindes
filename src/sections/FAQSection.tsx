import { FAQ } from '../components/FAQ'

export const FAQSection = () => (
  <section className="section faq-section" id="faq" aria-labelledby="faq-titulo">
    <div className="container faq-section__grid">
      <div className="faq-section__heading" data-reveal>
        <h2 className="eyebrow" id="faq-titulo">Perguntas frequentes</h2>
        <p className="section-title">O que você precisa saber antes de pedir.</p>
        <p className="section-lead">Ainda ficou alguma dúvida? O atendimento pelo WhatsApp ajuda a encontrar a opção certa.</p>
      </div>
      <FAQ />
    </div>
  </section>
)
