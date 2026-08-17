import { assetUrl } from '../lib/assets'
import { CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'

export const AcrylicFeature = () => (
  <section className="section acrylic-feature">
    <div className="container acrylic-feature__grid">
      <div className="acrylic-feature__media" data-reveal="clip">
        <img
          src={assetUrl('1. BRINDES.png')}
          width="1980"
          height="720"
          loading="lazy"
          decoding="async"
          alt="Campanha Hosana com garrafa personalizada em destaque"
        />
        <span>Top 1 em campanhas</span>
      </div>
      <div className="acrylic-feature__content" data-reveal>
        <p className="eyebrow">Garrafa acrílica</p>
        <h2 className="section-title">O brinde que funciona em eventos, equipes e campanhas.</h2>
        <p className="section-lead">Leve, versátil e produzida para colocar a identidade da sua empresa em circulação todos os dias.</p>
        <ul className="check-list">
          <li><CheckIcon /> A partir de R$ 6,79/un. em 100 unidades</li>
          <li><CheckIcon /> Personalização inclusa</li>
          <li><CheckIcon /> Silk ou degradê, conforme o modelo</li>
          <li><CheckIcon /> Produção própria</li>
        </ul>
        <WhatsAppButton
          label="Pedir orçamento"
          product="Garrafas Acrílicas Personalizadas"
          location="acrylic_feature"
          trackingEvent="product_quote_click"
          trackingData={{ product_id: 'garrafa-acrilica' }}
        />
      </div>
    </div>
  </section>
)
