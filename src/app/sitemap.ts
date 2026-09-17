import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-data'

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
    '/electricity-bill-calculator',
    '/bmi-calculator',
    '/calorie-calculator',
    '/love-calculator',
    '/blog'
  ]

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
