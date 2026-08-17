type IconProps = { size?: number; className?: string }

export const ArrowIcon = ({ size = 18, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const WhatsAppIcon = ({ size = 20, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.5 11.72a8.38 8.38 0 0 1-12.36 7.36L3.5 20.5l1.46-4.47A8.38 8.38 0 1 1 20.5 11.72Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.12 7.9c.18-.4.36-.41.63-.42h.54c.16 0 .33.06.42.32l.65 1.58c.08.2.04.37-.08.53l-.5.61c-.14.16-.11.31-.02.47.58 1.02 1.42 1.84 2.45 2.4.18.1.32.08.45-.08l.68-.79c.15-.18.34-.22.54-.14l1.48.7c.21.1.35.15.39.27.05.12.05.68-.16 1.12-.2.45-1.18.9-1.63.95-.43.05-.98.08-1.58-.1-.37-.12-.84-.28-1.45-.54-.26-.11-2.48-.91-4.2-3.38-.48-.68-1.04-1.79-1.04-2.86 0-1.06.55-1.59.75-1.8.2-.2.43-.25.58-.25h.42c.13 0 .3-.05.46.32" fill="currentColor" />
  </svg>
)

export const StarIcon = ({ size = 16, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m12 2.4 2.82 5.72 6.31.92-4.56 4.45 1.08 6.28L12 16.8l-5.65 2.97 1.08-6.28-4.56-4.45 6.31-.92L12 2.4Z" />
  </svg>
)

export const MenuIcon = ({ size = 24, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const CloseIcon = ({ size = 24, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const CheckIcon = ({ size = 18, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
