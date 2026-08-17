import { FAQ } from '../components/FAQ'

export const FAQSection = () => (
  <section className="section faq-section" id="faq">
    <div className="container faq-section__grid">
      <div className="faq-section__heading" data-reveal>
        <p className="eyebrow">Perguntas frequentes</p>
        <h2 className="section-title">O que você precisa saber antes de pedir.</h2>
        <p className="section-lead">Ainda ficou alguma dúvida? O atendimento pelo WhatsApp ajuda a encontrar a opção certa.</p>
      </div>
      <FAQ />
    </div>
  </section>
)
