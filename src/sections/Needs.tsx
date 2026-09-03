import { needQuoteMessage } from '../lib/whatsapp'
import { WhatsAppButton } from '../components/WhatsAppButton'

const needs = [
  {
    number: '01',
    title: 'Presentear colaboradores',
    text: 'RH, onboarding, datas comemorativas e reconhecimento.',
    message: 'Presentear colaboradores',
  },
  {
    number: '02',
    title: 'Fortalecer sua marca',
    text: 'Eventos, feiras, ativações, lançamentos e campanhas.',
    message: 'Fortalecer a marca em eventos e campanhas',
  },
  {
    number: '03',
    title: 'Criar kits corporativos',
    text: 'Presentes para clientes, equipes, lideranças ou parceiros.',
    message: 'Criar kits corporativos',
  },
  {
    number: '04',
    title: 'Produzir em quantidade',
    text: 'Pedidos empresariais com personalização, processo e escala.',
    message: 'Produzir brindes em quantidade',
  },
]

export const Needs = () => (
  <section className="section needs" id="objetivos" aria-labelledby="objetivos-titulo">
    <div className="container">
      <div className="needs__heading" data-reveal>
        <div>
          <p className="eyebrow">Comece pelo objetivo</p>
          <h2 className="section-title" id="objetivos-titulo">O que sua empresa quer colocar em movimento?</h2>
        </div>
        <p className="section-lead">A escolha fica mais simples quando o produto nasce do contexto certo.</p>
      </div>
      <div className="needs__grid">
        {needs.map((need) => (
          <article className="need-card" key={need.number} data-reveal>
            <span>{need.number}</span>
            <h3>{need.title}</h3>
            <p>{need.text}</p>
            <WhatsAppButton
              label="Solicitar orçamento"
              message={needQuoteMessage(need.message)}
              location="need_card"
              trackingData={{ need: need.message }}
              aria-label={`Solicitar orçamento para ${need.title.toLowerCase()} pelo WhatsApp`}
            />
          </article>
        ))}
      </div>
    </div>
  </section>
)
