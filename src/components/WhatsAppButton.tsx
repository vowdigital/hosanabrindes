import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import whatsappIcon from '../../whatsapp.svg'
import { buildWhatsAppUrl, configuratorMessage, productQuoteMessage, WHATSAPP_MESSAGES } from '../lib/whatsapp'
import { pushDataLayer } from '../lib/tracking'

type WhatsAppButtonVariant = 'primary' | 'compact'

interface WhatsAppButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  label?: string
  product?: string
  quantity?: string
  location: string
  fullWidth?: boolean
  variant?: WhatsAppButtonVariant
  message?: string
  trackingEvent?: string
  trackingData?: Record<string, unknown>
}

const getMessage = ({ message, product, quantity }: Pick<WhatsAppButtonProps, 'message' | 'product' | 'quantity'>) => {
  if (message) return message
  if (product && quantity) return configuratorMessage(product, quantity)
  if (product) return productQuoteMessage(product)
  return WHATSAPP_MESSAGES.default
}

export const WhatsAppButton = ({
  label = 'Solicitar orçamento',
  product,
  quantity,
  location,
  fullWidth = false,
  variant = 'primary',
  message,
  trackingEvent,
  trackingData = {},
  className = '',
  onClick,
  'aria-label': ariaLabel,
  ...props
}: WhatsAppButtonProps) => {
  const whatsappMessage = getMessage({ message, product, quantity })
  const classes = [
    'whatsapp-button',
    `whatsapp-button--${variant}`,
    fullWidth ? 'whatsapp-button--full' : '',
    className,
  ].filter(Boolean).join(' ')

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = buildWhatsAppUrl(whatsappMessage)
    const context = {
      location,
      product: product || null,
      quantity: quantity || null,
      ...trackingData,
    }
    pushDataLayer('whatsapp_click', context)
    if (trackingEvent) pushDataLayer(trackingEvent, context)
    onClick?.(event)
  }

  return (
    <a
      {...props}
      className={classes}
      href={buildWhatsAppUrl(whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel || `${label} pelo WhatsApp`}
      onClick={handleClick}
    >
      <img className="whatsapp-button__icon" src={whatsappIcon} width="21" height="21" alt="" aria-hidden="true" />
      <span>{label}</span>
    </a>
  )
}
