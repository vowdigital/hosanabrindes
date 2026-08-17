import { useEffect } from 'react'
import { initializeCampaignTracking, pushDataLayer } from '../lib/tracking'

export const useCampaignTracking = () => {
  useEffect(() => {
    initializeCampaignTracking()
    const fired = new Set<number>()

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percentage = (window.scrollY / scrollable) * 100

      ;[50, 90].forEach((threshold) => {
        if (percentage >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          pushDataLayer(`scroll_${threshold}`, { scroll_percent: threshold })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
