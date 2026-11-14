import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://topcalcbox.com";
  const now = new Date();

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
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // 25 Tools
    ...calculatorRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // 5 Pages
    ...infoRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
