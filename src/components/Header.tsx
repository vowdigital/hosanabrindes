import { useEffect, useState } from 'react'
import { assetUrl } from '../lib/assets'
import { CloseIcon, MenuIcon } from './Icons'
import { WhatsAppButton } from './WhatsAppButton'

const links = [
  ['Produtos', '#produtos'],
  ['Diferenciais', '#producao'],
  ['Como funciona', '#processo'],
  ['Avaliações', '#avaliacoes'],
  ['FAQ', '#faq'],
]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#inicio" aria-label="Hosana Brindes — início" onClick={() => setOpen(false)}>
          <img src={assetUrl('lg-01 (2).svg')} width="46" height="46" alt="" />
          <span>Hosana <strong>Brindes</strong></span>
        </a>

        <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Navegação principal">
          <div className="site-nav__panel">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <WhatsAppButton
              className="site-nav__cta-mobile"
              variant="compact"
              location="mobile_menu"
              onClick={() => setOpen(false)}
            />
          </div>
        </nav>

        <WhatsAppButton
          className="site-header__cta"
          variant="compact"
          location="header"
        />

        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
