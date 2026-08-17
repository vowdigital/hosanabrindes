import { assetUrl } from '../lib/assets'
import { WhatsAppButton } from '../components/WhatsAppButton'

export const FinalCTA = () => (
  <section className="final-cta">
    <div className="container final-cta__inner">
      <img
        className="final-cta__product final-cta__product--left"
        src={assetUrl('COPO TÉRMICO 500ML COM ABRIDOR  BRANCO 2.png')}
        loading="lazy"
        decoding="async"
        width="1183"
        height="2154"
        alt="Copo térmico branco"
      />
      <div className="final-cta__content" data-reveal>
        <p className="eyebrow">Sua próxima ação começa aqui</p>
        <h2>Vamos colocar sua marca em circulação?</h2>
        <p>Conte o que sua empresa precisa e receba um orçamento personalizado.</p>
        <WhatsAppButton
          location="final_cta"
        />
      </div>
      <img
        className="final-cta__product final-cta__product--right"
        src={assetUrl('Garrafa térmica tiffany.png')}
        loading="lazy"
        decoding="async"
        width="970"
        height="2678"
        alt="Garrafa térmica em tom tiffany"
      />
    </div>
  </section>
)
