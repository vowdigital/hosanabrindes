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
  backgroundColor: string
  accentColor: string
}

export const products: Product[] = [
  {
    id: 'garrafa-personalizada',
    name: 'Garrafa Personalizada',
    shortName: 'Garrafa Personalizada',
    category: 'Versátil',
    image: assetUrl('Garrafa térmica branco.png'),
    secondaryImages: [
      assetUrl('Garrafa térmica preta.png'),
      assetUrl('Garrafa térmica tiffany.png'),
    ],
    alt: 'Garrafa térmica branca para personalização',
    priceLabel: 'Valor conforme modelo, personalização e quantidade',
    customization: ['Gravação a laser', 'Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Uma escolha durável para equipes, kits corporativos e ações de relacionamento.',
    featured: true,
    imageFit: 'contain',
    backgroundColor: '#f4e7e5',
    accentColor: '#b72b30',
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
    backgroundColor: '#e7eaf4',
    accentColor: '#222a5a',
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
    backgroundColor: '#eee4dc',
    accentColor: '#8b6453',
  },
  {
    id: 'bolsa-termica',
    name: 'Bolsa Térmica Personalizada',
    shortName: 'Bolsa Térmica',
    category: 'Uso cotidiano',
    image: assetUrl('AZUL CLARO.png'),
    alt: 'Bolsa térmica azul-clara com fechamento por cordão',
    priceLabel: 'Valor conforme modelo, personalização e quantidade',
    customization: ['Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Uma opção funcional para campanhas, equipes e ações de relacionamento.',
    imageFit: 'contain',
    backgroundColor: '#e2ecec',
    accentColor: '#276a70',
  },
  {
    id: 'copo-gin',
    name: 'Copo de Gin Personalizado',
    shortName: 'Copo de Gin',
    category: 'Eventos e celebrações',
    image: assetUrl('G3.png'),
    alt: 'Copo de gin rosa para personalização',
    priceLabel: 'Valor conforme modelo, personalização e quantidade',
    customization: ['Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Uma escolha marcante para eventos, confraternizações e experiências de marca.',
    imageFit: 'contain',
    backgroundColor: '#f6ddea',
    accentColor: '#c21868',
  },
  {
    id: 'caneca-matte',
    name: 'Caneca Matte Personalizada',
    shortName: 'Caneca Matte',
    category: 'Novidade',
    image: assetUrl('DSC_0173 - MATTE VERDE.png'),
    alt: 'Caneca matte verde para personalização',
    priceLabel: 'Valor conforme personalização e quantidade',
    customization: ['Personalização sob consulta'],
    minimum: 'A partir de 10 unidades',
    description: 'Uma caneca de presença marcante para kits, eventos e experiências de marca.',
    imageFit: 'contain',
    backgroundColor: '#dcece2',
    accentColor: '#238451',
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
