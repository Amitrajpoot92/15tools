import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://topcalcbox.com'

  const routes = [
    '',
    '/percentage-calculator',
    '/discount-calculator',
    '/gst-calculator',
    '/profit-and-loss-calculator',
    '/wholesale-price-calculator',
    '/emi-calculator',
    '/sip-calculator',
    '/subscription-cost-calculator',
    '/marks-percentage-calculator',
    '/attendance-percentage-calculator',
    '/negative-marking-calculator',
    '/average-calculator',
    '/bodmas-calculator',
    '/age-calculator-online',
    '/birthday-countdown',
    '/age-difference-calculator',
    '/date-difference-calculator',
    '/cost-per-item-calculator',
    '/price-per-kg-calculator',
    '/tip-calculator',
    '/fuel-cost-calculator',
    '/grocery-bill-calculator',
    '/bmi-calculator',
    '/calorie-calculator',
    '/love-calculator',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
