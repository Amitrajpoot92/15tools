export default function HomeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://topcalcbox.com/#organization",
        "name": "TopCalcBox",
        "url": "https://topcalcbox.com/",
        "description": "Free Online Calculators for Everyday Needs",
        "logo": {
          "@type": "ImageObject",
          "url": "https://topcalcbox.com/topcalcbox-logo.png",
          "width": 512,
          "height": 512
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://topcalcbox.com/#website",
        "url": "https://topcalcbox.com/",
        "name": "TopCalcBox",
        "alternateName": "TopCalcBox",
        "publisher": {
          "@id": "https://topcalcbox.com/#organization"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "WebPage",
        "@id": "https://topcalcbox.com/#webpage",
        "url": "https://topcalcbox.com/",
        "name": "TopCalcBox – Free Online Calculators for Daily Use",
        "description":
          "Use free online calculators for finance, math, education, age, dates, health, shopping, and everyday calculations. Get fast and accurate results.",
        "isPartOf": {
          "@id": "https://topcalcbox.com/#website"
        },
        "about": {
          "@id": "https://topcalcbox.com/#organization"
        },
        "inLanguage": "en-IN"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}
