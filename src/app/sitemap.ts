import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://topcalcbox.com";
  const now = new Date();

  const calculatorRoutes = [
    "/percentage-calculator",
    "/discount-calculator",
    "/gst-calculator",
    "/profit-and-loss-calculator",
    "/wholesale-price-calculator",
    "/emi-calculator",
    "/sip-calculator",
    "/subscription-cost-calculator",
    "/marks-percentage-calculator",
    "/attendance-percentage-calculator",
    "/negative-marking-calculator",
    "/average-calculator",
    "/bodmas-calculator",
    "/age-calculator-online",
    "/birthday-countdown",
    "/age-difference-calculator",
    "/date-difference-calculator",
    "/cost-per-item-calculator",
    "/price-per-kg-calculator",
    "/tip-calculator",
    "/fuel-cost-calculator",
    "/grocery-bill-calculator",
    "/bmi-calculator",
    "/calorie-calculator",
    "/love-calculator",
  ];

  const infoRoutes = [
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
  ];

  const editorialRoutes = [
    "/blog",
    "/news",
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...calculatorRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...editorialRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...infoRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
