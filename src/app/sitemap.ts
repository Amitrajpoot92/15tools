import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://topcalcbox.com";
  // Stable lastmod timestamps: Google requires reliable lastmod dates.
  // Constantly returning new Date() on every request causes Googlebot to distrust lastmod.
  const lastUpdated = new Date("2026-11-20T00:00:00.000Z");

  // 25 Calculator Tools
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

  // 5 Essential Info Pages
  const infoRoutes = [
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
  ];

  return [
    // 1 Homepage
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // 25 Tools
    ...calculatorRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: lastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // 5 Pages
    ...infoRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
