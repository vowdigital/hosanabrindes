import { CONTACT } from '../config/contact'
import { getCampaignOriginLine } from './tracking'

export const WHATSAPP_MESSAGES = {
  default: 'Olá! Vim pelo site da Hosana e gostaria de solicitar um orçamento de brindes personalizados.',
  hero: 'Olá! Vim pelo site da Hosana e gostaria de solicitar um orçamento de brindes personalizados.',
} as const

export const buildWhatsAppUrl = (message: string) => {
  const origin = getCampaignOriginLine()
  const fullMessage = origin ? `${message}\n\n${origin}` : message
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(fullMessage)}`
}

export const productQuoteMessage = (product: string) =>
  `Olá! Vim pelo site da Hosana e gostaria de solicitar um orçamento para ${product}.`

export const needQuoteMessage = (need: string) =>
  `Olá! Vim pelo site da Hosana. Meu objetivo é ${need.toLowerCase()} e gostaria de receber sugestões e um orçamento.`

export const configuratorMessage = (product: string, quantity: string) =>
  `Olá! Vim pelo site da Hosana.\n\nProduto: ${product}\nQuantidade: ${quantity} unidades\n\nGostaria de solicitar um orçamento.`
