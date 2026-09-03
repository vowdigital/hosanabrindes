import { CONTACT } from '../config/contact'
import { faqItems } from '../data/faq'
import { products } from '../data/portfolio'

const SITE_URL = 'https://hosanabrindes.com.br/'
const ORGANIZATION_ID = `${SITE_URL}#organizacao`
const WEBSITE_ID = `${SITE_URL}#website`
const CATALOG_ID = `${SITE_URL}#catalogo`

const absoluteUrl = (path: string) => new URL(path.replace(/^\//, ''), SITE_URL).href

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'Hosana Brindes',
      url: SITE_URL,
      inLanguage: 'pt-BR',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': ORGANIZATION_ID,
      name: 'Hosana Brindes',
      url: SITE_URL,
      description: 'Empresa especializada em brindes corporativos personalizados, com produção própria em Maringá e entrega para todo o Brasil.',
      telephone: CONTACT.whatsappDisplay,
      logo: absoluteUrl('/assets/lg-01%20(2).svg'),
      image: absoluteUrl('/assets/1.%20BRINDES.png'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'R. Milton Eduardo Luders, 98, Conj. Itaparica',
        addressLocality: 'Maringá',
        addressRegion: 'PR',
        postalCode: '87043-570',
        addressCountry: 'BR',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
      sameAs: [`https://instagram.com/${CONTACT.instagram}`],
      knowsAbout: [
        'Brindes corporativos personalizados',
        'Produção própria de brindes',
        'Silk screen',
        'Degradê',
        'Gravação a laser',
        'Metalizado',
        'DTF',
      ],
    },
    {
      '@type': 'ItemList',
      '@id': CATALOG_ID,
      name: 'Portfólio de brindes corporativos personalizados',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}#produto-${product.id}`,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: product.category,
          image: product.images.map(absoluteUrl),
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
}

export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
  />
)
