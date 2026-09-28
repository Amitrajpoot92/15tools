import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-data'
import { TOOLS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://topcalcbox.com'

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
    '/news',
    '/blog'
  ]

  const toolRoutes = TOOLS.map(tool => `/${tool.slug}`)
  
  const allStaticRoutes = [...staticPages, ...toolRoutes]

  const staticRoutes = allStaticRoutes.map((route) => ({
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
