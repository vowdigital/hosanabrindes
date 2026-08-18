import { useEffect, useState, type CSSProperties } from 'react'
import { assetUrl } from '../lib/assets'
import { CloseIcon, MenuIcon } from './Icons'
import { WhatsAppButton } from './WhatsAppButton'

const links = [
  { label: 'Produtos', href: '#produtos' },
  { label: 'Diferenciais', href: '#producao' },
  { label: 'FAQ', href: '#faq' },
]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeLink, setActiveLink] = useState('#inicio')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 20)
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['#inicio', ...links.map(({ href }) => href)]
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visible) setActiveLink(`#${visible.target.id}`)
    }, {
      rootMargin: '-18% 0px -64% 0px',
      threshold: [0, 0.2, 0.45, 0.7],
    })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
      style={{ '--scroll-progress': scrollProgress } as CSSProperties}
    >
      <div className="container site-header__inner">
        <span className="site-header__glow" aria-hidden="true" />
        <a className="brand" href="#inicio" aria-label="Hosana Brindes — início" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            <img src={assetUrl('lg-01 (2).svg')} width="46" height="46" alt="" />
            <span />
          </span>
          <span className="brand__wordmark">Hosana <strong>Brindes</strong></span>
        </a>

        <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Navegação principal">
          <div className="site-nav__panel">
            {links.map(({ label, href }) => (
              <a
                className={activeLink === href ? 'site-nav__link--active' : ''}
                key={href}
                href={href}
                aria-current={activeLink === href ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
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
        <span className="site-header__progress" aria-hidden="true" />
      </div>
    </header>
  )
}
