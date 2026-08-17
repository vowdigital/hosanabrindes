import { useEffect, useState } from 'react'
import { WhatsAppButton } from './WhatsAppButton'

export const FloatingWhatsApp = () => {
  const [quiet, setQuiet] = useState(false)

  useEffect(() => {
    const visibleSections = new Set<Element>()
    const targets = ['#inicio', '#orcamento', '.final-cta']
      .map((selector) => document.querySelector(selector))
      .filter((element): element is Element => Boolean(element))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target)
        else visibleSections.delete(entry.target)
      })
      setQuiet(visibleSections.size > 0)
    }, { threshold: 0.2 })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <WhatsAppButton
        className={`floating-whatsapp ${quiet ? 'is-quiet' : ''}`}
        label="Orçamento"
        variant="compact"
        location="floating_desktop"
      />
      <div className="mobile-sticky">
        <WhatsAppButton
          fullWidth
          location="sticky_mobile"
        />
      </div>
    </>
  )
}
