import { clientMarks } from '../data/products'
import { assetUrl } from '../lib/assets'
import { CONTACT } from '../config/contact'
import { StarIcon } from '../components/Icons'

export const SocialProof = () => (
  <section className="section social-proof" id="avaliacoes">
    <div className="container social-proof__headline" data-reveal>
      <p className="eyebrow">Confiança comprovada</p>
      <h2 className="section-title">Uma reputação construída pedido após pedido.</h2>
    </div>

    <div className="container social-proof__grid">
      <div className="social-proof__score" data-reveal>
        <span className="social-proof__stars" aria-label="5 estrelas">
          {Array.from({ length: 5 }).map((_, index) => <StarIcon key={index} />)}
        </span>
        <strong>4,9</strong>
        <p><b>2.919 avaliações</b><br />publicadas no Google</p>
      </div>
      <div className="social-proof__instagram" data-reveal>
        <span>Instagram</span>
        <strong>+122 mil</strong>
        <p>pessoas acompanham <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer">@{CONTACT.instagram}</a></p>
      </div>
      <figure className="social-proof__creative" data-reveal="clip">
        <picture>
          <source media="(max-width: 600px)" srcSet={assetUrl('2.2 GOOGLE MOBILE.png')} />
          <img
            src={assetUrl('2. GOOGLE.png')}
            width="1980"
            height="720"
            loading="lazy"
            decoding="async"
            alt="Arte institucional da Hosana destacando a nota 4,9 no Google"
          />
        </picture>
      </figure>
    </div>

    <div className="container client-marks" data-reveal>
      <p>+18 mil clientes atendidos · algumas marcas que já estiveram em nossa produção</p>
      <div className="client-marks__grid">
        {clientMarks.map((mark) => (
          <div className="client-mark" key={mark.name} title={mark.name}>
            <img src={mark.image} loading="lazy" decoding="async" alt={`Marca ${mark.name}`} />
          </div>
        ))}
      </div>
    </div>
  </section>
)
