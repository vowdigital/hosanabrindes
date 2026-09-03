import { CheckIcon } from '../components/Icons'
import { WhatsAppButton } from '../components/WhatsAppButton'
import copoUm from '../../assets/copo1.jpeg'
import garrafaUm from '../../assets/garrafa1.jpeg'
import doiscopos from '../../assets/doiscopos.jpeg'
import garrafaAzul from '../../assets/garrafaazul.jpeg'
import facas from '../../assets/facas.jpeg'
import canivete from '../../assets/canivete.jpeg'

const mosaicItems = [
  {
    image: copoUm,
    alt: 'Copo personalizado com identidade visual para ação corporativa',
  },
  {
    image: garrafaUm,
    alt: 'Garrafa térmica branca personalizada com nome',
  },
  {
    image: doiscopos,
    alt: 'Dois copos térmicos personalizados',
  },
  {
    image: garrafaAzul,
    alt: 'Garrafa azul personalizada com gravação a laser',
  },
  {
    image: facas,
    alt: 'Facas personalizadas com gravação a laser',
  },
  {
    image: canivete,
    alt: 'Canivete personalizado com gravação a laser',
  },
]

export const AcrylicFeature = () => (
  <section className="section acrylic-feature" id="produtos-personalizados" aria-labelledby="produtos-personalizados-titulo">
    <div className="container acrylic-feature__grid">
      <div className="acrylic-feature__media product-mosaic" data-reveal="clip" aria-label="Mosaico de produtos personalizados">
        {mosaicItems.map((item) => (
          <figure className="product-mosaic__item" key={item.image}>
            <img src={item.image} loading="lazy" decoding="async" alt={item.alt} />
          </figure>
        ))}
      </div>

      <div className="acrylic-feature__content" data-reveal>
        <h2 className="eyebrow" id="produtos-personalizados-titulo">Produtos personalizados</h2>
        <p className="section-title">Sua marca presente em diferentes momentos.</p>
        <p className="section-lead">Produtos personalizados para empresas, eventos e ações promocionais, desenvolvidos para colocar a identidade da sua marca em circulação todos os dias.</p>
        <ul className="check-list">
          <li><CheckIcon /> Diversos produtos e categorias</li>
          <li className="check-list__highlight"><CheckIcon /> Pedidos a partir de 10 unidades</li>
          <li><CheckIcon /> Silk screen, gravação a laser, DTF e outras técnicas</li>
          <li><CheckIcon /> Produção própria</li>
        </ul>
        <WhatsAppButton
          label="Quero personalizar meus produtos"
          product="Produtos Personalizados"
          location="acrylic_feature"
          trackingEvent="product_quote_click"
          trackingData={{ product_id: 'produtos-personalizados' }}
        />
        <p className="acrylic-feature__cta-note">Envie sua ideia ou sua logo e receba uma proposta personalizada.</p>
      </div>
    </div>
  </section>
)
