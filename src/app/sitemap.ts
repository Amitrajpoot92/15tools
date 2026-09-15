import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://topcalcbox.com'

  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
    '/percentage-calculator',
    '/discount-calculator',
    '/gst-calculator',
    '/profit-and-loss-calculator',
    '/margin-calculator',
    '/age-calculator-online',
    '/birthday-countdown',
    '/age-difference-calculator',
    '/date-difference-calculator',
    '/tip-calculator',
    '/fuel-cost-calculator',
    '/marks-percentage-calculator',
    '/attendance-percentage-calculator',
    '/negative-marking-calculator',
    '/subscription-cost-calculator',
    '/bmi-calculator',
    '/emi-calculator',
    '/sip-calculator',
    '/electricity-bill-calculator',
    '/calorie-calculator'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
