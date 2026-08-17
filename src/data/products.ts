import { assetUrl } from '../lib/assets'

export interface Product {
  id: string
  name: string
  shortName: string
  category: string
  image?: string
  secondaryImages?: string[]
  alt?: string
  priceLabel: string
  priceReferenceQuantity?: number
  customization: string[]
  minimum: string
  description: string
  featured?: boolean
  imageFit?: 'cover' | 'contain'
}

export const products: Product[] = [
  {
    id: 'garrafa-acrilica',
    name: 'Garrafa Acrílica Personalizada',
    shortName: 'Garrafa Acrílica',
    category: 'Carro-chefe',
    image: assetUrl('1.1 BRINDES MOBILE.png'),
    secondaryImages: [assetUrl('1. BRINDES.png')],
    alt: 'Garrafa personalizada sendo apresentada em uma composição da Hosana Brindes',
    priceLabel: 'A partir de R$ 6,79/un. em pedidos de 100 unidades',
    priceReferenceQuantity: 100,
    customization: ['Silk screen', 'Degradê'],
    minimum: 'A partir de 10 unidades',
    description: 'Uma escolha versátil para eventos, equipes, ações promocionais e campanhas de marca.',
    featured: true,
    imageFit: 'cover',
  },
  {
    id: 'copo-termico',
    name: 'Copo Térmico 500 ml',
    shortName: 'Copo Térmico',
    category: 'Alta procura',
    image: assetUrl('COPO TÉRMICO 500ML COM ABRIDOR  AZUL 2.png'),
    secondaryImages: [
      assetUrl('COPO TÉRMICO 500ML COM ABRIDOR  BRANCO 2.png'),
      assetUrl('COPO TÉRMICO 500ML COM ABRIDOR ROSA NEON.png'),
    ],
    alt: 'Copo térmico azul de 500 ml com abridor',
    priceLabel: 'Valor conforme modelo, personalização e quantidade',
    customization: ['Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Presença de marca no escritório, em eventos e nos momentos de pausa da equipe.',
    featured: true,
    imageFit: 'contain',
  },
  {
    id: 'garrafa-termica',
    name: 'Garrafa Térmica Inox',
    shortName: 'Garrafa Térmica',
    category: 'Valor percebido',
    image: assetUrl('Garrafa térmica dourada.png'),
    secondaryImages: [
      assetUrl('Garrafa térmica preta.png'),
      assetUrl('Garrafa térmica tiffany.png'),
    ],
    alt: 'Garrafa térmica inox dourada para personalização a laser',
    priceLabel: 'A partir de R$ 31,90/un. em pedidos de 100 unidades',
    priceReferenceQuantity: 100,
    customization: ['Gravação a laser'],
    minimum: 'A partir de 10 unidades',
    description: 'Um presente corporativo durável para clientes, lideranças e times.',
    featured: true,
    imageFit: 'contain',
  },
  {
    id: 'bolsa-termica',
    name: 'Bolsa Térmica Personalizada',
    shortName: 'Bolsa Térmica',
    category: 'Uso cotidiano',
    priceLabel: 'Valor conforme modelo, personalização e quantidade',
    customization: ['Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Uma opção funcional para campanhas, equipes e ações de relacionamento.',
  },
  {
    id: 'sacola-algodao',
    name: 'Sacola de Algodão Personalizada',
    shortName: 'Sacola de Algodão',
    category: 'Marca em circulação',
    priceLabel: 'Valor conforme modelo, personalização e quantidade',
    customization: ['Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Comunicação útil para eventos, kits e pontos de contato com a marca.',
  },
]

export const galleryProducts = [
  {
    name: 'Copo térmico branco',
    image: assetUrl('COPO TÉRMICO 500ML COM ABRIDOR  BRANCO 2.png'),
    alt: 'Copo térmico branco com abridor',
  },
  {
    name: 'Garrafa térmica rosa',
    image: assetUrl('Garrafa térmica rosa.png'),
    alt: 'Garrafa térmica rosa',
  },
  {
    name: 'Copo térmico verde',
    image: assetUrl('COPO TÉRMICO 500ML COM ABRIDOR  VERDE 2.png'),
    alt: 'Copo térmico verde com abridor',
  },
  {
    name: 'Garrafa térmica branca',
    image: assetUrl('Garrafa térmica branco.png'),
    alt: 'Garrafa térmica branca',
  },
  {
    name: 'Copo térmico laranja',
    image: assetUrl('COPO TÉRMICO 500ML COM ABRIDOR LARANJA VERÃO.png'),
    alt: 'Copo térmico laranja com abridor',
  },
  {
    name: 'Garrafa térmica preta',
    image: assetUrl('Garrafa térmica preta.png'),
    alt: 'Garrafa térmica preta',
  },
  {
    name: 'Copo térmico rosa',
    image: assetUrl('COPO TÉRMICO 500ML COM ABRIDOR ROSA NEON.png'),
    alt: 'Copo térmico rosa com abridor',
  },
  {
    name: 'Garrafa térmica tiffany',
    image: assetUrl('Garrafa térmica tiffany.png'),
    alt: 'Garrafa térmica em tom tiffany',
  },
]

export const clientMarks = [
  ['Unimed', '1. UNIMED.png'],
  ['Magrass', '2. MAGRASS.png'],
  ['Natura', '3. NATURA.png'],
  ['Emagrecentro', '4. EMAGRECENTRO.png'],
  ['Odonto Excellence', '5. ODONTO EXCELLENCE.png'],
  ['Amorinha', '6. AMORINHA.png'],
  ['Smart Fit', '7. SMARTFIT.png'],
  ['Sicoob', '8. SICOOB.png'],
  ['Bombeiros', '9. BOMBEIRO.png'],
].map(([name, file]) => ({ name, image: assetUrl(file) }))
