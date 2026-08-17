const CAMPAIGN_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const

type CampaignKey = (typeof CAMPAIGN_KEYS)[number]
export type CampaignData = Partial<Record<CampaignKey, string>>

const STORAGE_KEY = 'hosana_campaign_origin'

export const pushDataLayer = (event: string, data: Record<string, unknown> = {}) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

export const initializeCampaignTracking = () => {
  const params = new URLSearchParams(window.location.search)
  const current = CAMPAIGN_KEYS.reduce<CampaignData>((result, key) => {
    const value = params.get(key)
    if (value) result[key] = value.slice(0, 180)
    return result
  }, {})

  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') as CampaignData
    const merged = { ...saved, ...current }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // Tracking must never block the conversion experience.
  }

  window.dataLayer = window.dataLayer || []
}

export const getCampaignData = (): CampaignData => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') as CampaignData
  } catch {
    return {}
  }
}

const clean = (value?: string) => value?.replace(/[\r\n|]+/g, ' ').trim()

export const getCampaignOriginLine = () => {
  const campaign = getCampaignData()
  const parts = [
    campaign.utm_source && `Origem: ${clean(campaign.utm_source)}`,
    campaign.utm_campaign && `Campanha: ${clean(campaign.utm_campaign)}`,
    campaign.utm_term && `Termo: ${clean(campaign.utm_term)}`,
  ].filter(Boolean)

  if (parts.length) return parts.join(' | ')
  if (campaign.gclid) return 'Origem: Google Ads'
  if (campaign.fbclid) return 'Origem: Meta Ads'
  return ''
}
