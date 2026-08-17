import { COMPANY, CONTACT } from '../config/contact'
import { assetUrl } from '../lib/assets'
import { WhatsAppButton } from '../components/WhatsAppButton'

export const Footer = () => (
  <footer className="footer">
    <div className="container footer__top">
      <div className="footer__brand">
        <a href="#inicio" aria-label="Voltar ao início">
          <img src={assetUrl('lg-01 (2).svg')} width="58" height="58" alt="" />
          <span>Hosana <strong>Brindes</strong></span>
        </a>
        <p>Produção em Maringá.<br />Entrega para todo o Brasil.</p>
      </div>
      <div className="footer__contact">
        <span>Atendimento</span>
        <strong className="footer__phone">{CONTACT.whatsappDisplay}</strong>
        <WhatsAppButton
          variant="compact"
          location="footer"
        />
        <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer">@{CONTACT.instagram}</a>
        <a href={CONTACT.site} target="_blank" rel="noreferrer">hosanabrindes.com.br</a>
      </div>
      <div className="footer__address">
        <span>Onde estamos</span>
        <address>{COMPANY.address}</address>
      </div>
    </div>
    <div className="container footer__bottom">
      <p>{COMPANY.legalName} · CNPJ {COMPANY.cnpj}</p>
      <p>{COMPANY.secondaryName} · CNPJ {COMPANY.secondaryCnpj}</p>
      <p>© {new Date().getFullYear()} Hosana Brindes</p>
    </div>
  </footer>
)
