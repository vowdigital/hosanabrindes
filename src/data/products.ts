import { assetUrl } from '../lib/assets'

const galleryAssetUrls = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const galleryBackgrounds: Record<string, string> = {
  '1.png': '#bfc9e4',
  '2.png': '#c8ceca',
  '3.png': '#f6c7b0',
  '4.png': '#f0bfd0',
  '5.png': '#cfc3e2',
  '8.png': '#bcd8c6',
  '9.png': '#d9edaa',
  'AMARELO.png': '#e6eeb7',
  'AZUL ESCURO.png': '#c4cfe7',
  'CINZA ESCURO.png': '#d0d2d1',
  'COPO TÉRMICO 500ML COM ABRIDOR LILAS.png': '#ddd5e6',
  'COPO TÉRMICO 500ML COM ABRIDOR PRETO 2.png': '#d0cdcb',
  'COPO TÉRMICO 500ML COM ABRIDOR ROSÉ 2.png': '#ead5dc',
  'COPO TÉRMICO 500ML COM ABRIDOR ROXO.png': '#d9c9e4',
  'COPO TÉRMICO 500ML COM ABRIDOR TIFFANY.png': '#c4e9e5',
  'G4.png': '#c5dfcd',
  'G5.png': '#e3e5ef',
  'G6.png': '#e7c7ce',
  'G7.png': '#c4e7e6',
  'gb011_440ml_munique_branca.png': '#ede9e4',
  'gb011_440ml_munique_cobre.png': '#e3c3ad',
  'gb011_440ml_munique_dourada.png': '#eddbb3',
  'gb011_440ml_munique_laranja.png': '#efc4a6',
  'gb011_440ml_munique_laranja_neon.png': '#ffd0a5',
  'gb011_440ml_munique_preta.png': '#cfccca',
  'gb011_440ml_munique_roxa.png': '#dfc5e6',
  'gb011_440ml_munique_tradicional.png': '#d8dcde',
  'gb011_440ml_munique_verde.png': '#c5dccd',
  'gb011_440ml_munique_verde_neon.png': '#d9ecae',
  'gb011_440ml_munique_vermelha.png': '#ebc2c1',
  'long 1.png': '#edc0c1',
  'long 2.png': '#ece8df',
  'long3.png': '#d8d0d2',
  'PRATA.png': '#dcdddd',
  'preto.png': '#ceccca',
  'rosa baby.png': '#f4dbe6',
  'rosa neon.png': '#f5c2d5',
  'rosa.png': '#e6c1d9',
  'roxo.png': '#d8c4e4',
  'tiffany.png': '#c7e9e7',
  'todas a as 013.png': '#c4e3e9',
  'VERDE CLARO.png': '#dce8bf',
  'VERDE ESCURO.png': '#c0dcca',
  'verde neon.png': '#d9edaa',
  'verde.png': '#bfdac8',
  'vermelho.png': '#e9c0c1',
}

const sectionGalleryAssets = new Set([
  'copo1.jpeg',
  'garrafa1.jpeg',
  'doiscopos.jpeg',
  'garrafaazul.jpeg',
  'facas.jpeg',
  'canivete.jpeg',
  'degrade2.jpeg',
  'herotop.jpeg',
  'silkscreen.jpeg',
  'laser.jpeg',
  'dtf.png',
])

const galleryNames: Record<string, string> = {
  '1.png': 'Copo long drink azul-marinho',
  '2.png': 'Copo long drink cinza',
  '3.png': 'Copo long drink laranja',
  '4.png': 'Copo long drink rosa',
  '5.png': 'Copo long drink roxo',
  '8.png': 'Copo long drink verde',
  '9.png': 'Copo long drink verde neon',
  'AMARELO.png': 'Sacochila amarela',
  'AZUL ESCURO.png': 'Sacochila azul-escura',
  'CINZA ESCURO.png': 'Sacochila cinza-escura',
  'G4.png': 'Taça de gin verde',
  'G5.png': 'Taça de gin branca',
  'G6.png': 'Taça de gin vinho',
  'G7.png': 'Taça de gin tiffany',
  'long 1.png': 'Copo long drink vermelho',
  'long 2.png': 'Copo long drink branco',
  'long3.png': 'Copo long drink estampado',
  'PRATA.png': 'Sacochila prata',
  'VERDE CLARO.png': 'Sacochila verde-clara',
  'VERDE ESCURO.png': 'Sacochila verde-escura',
}

const formatGalleryName = (filename: string) => {
  if (galleryNames[filename]) return galleryNames[filename]

  const withoutExtension = filename.replace(/\.[^.]+$/, '')
  if (withoutExtension.startsWith('gb011_440ml_munique_')) {
    return `Caneca Munique ${withoutExtension.replace('gb011_440ml_munique_', '').replaceAll('_', ' ')}`
  }
  if (withoutExtension.startsWith('COPO TÉRMICO 500ML COM ABRIDOR ')) {
    return `Copo térmico ${withoutExtension.replace('COPO TÉRMICO 500ML COM ABRIDOR ', '').replace(/ 2$/, '').toLowerCase()}`
  }

  return `Caneca ${withoutExtension.replaceAll('_', ' ').toLowerCase()}`
}

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
    backgroundColor: '#e7beba',
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
    backgroundColor: '#c7d1e9',
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
    backgroundColor: '#ddc5b3',
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
    backgroundColor: '#badbdd',
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
    backgroundColor: '#eab7d2',
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
    backgroundColor: '#b9dcc6',
    accentColor: '#238451',
  },
]

export const galleryProducts = Object.entries(galleryAssetUrls)
  .filter(([path]) => !sectionGalleryAssets.has(path.split('/').pop() ?? path))
  .map(([path, image]) => {
    const filename = path.split('/').pop() ?? path
    const name = formatGalleryName(filename)
    return {
      name,
      image,
      alt: `${name} para personalização`,
      background: galleryBackgrounds[filename] ?? '#eee9e6',
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { numeric: true }))
