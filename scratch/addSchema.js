const fs = require('fs');
const path = require('path');

const srcApp = path.join(process.cwd(), 'src/app');

// Get all directories in src/app
const dirs = fs.readdirSync(srcApp).filter(f => fs.statSync(path.join(srcApp, f)).isDirectory());

for (const dir of dirs) {
  // Skip internal/static pages for SoftwareApplication schema
  const excludeDirs = ['fonts', 'about', 'contact', 'privacy-policy', 'terms-and-conditions', 'disclaimer', 'blog', 'news'];
  if (excludeDirs.includes(dir)) continue;

  const pagePath = path.join(srcApp, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');

    // Make sure we haven't already added it
    if (content.includes('application/ld+json')) {
      continue;
    }

    // Extract the title from metadata to use in the schema
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const title = titleMatch ? titleMatch[1].split(' - ')[0] : 'TopCalcBox Tool';

    const schemaStr = `
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "${title}",
            "operatingSystem": "Any",
            "applicationCategory": "BusinessApplication",
            "browserRequirements": "Requires JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    `;

    // Find the first <div className="pb-8"> or similar wrapper and inject right after it
    // Most files have `return ( <div className="pb-8">`
    const replaceTarget = /return\s*\(\s*<div className="pb-8">/;
    
    if (replaceTarget.test(content)) {
      content = content.replace(replaceTarget, `return (\n    <div className="pb-8">\n${schemaStr}`);
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Added Schema to ${dir}/page.tsx`);
    } else {
      console.log(`Failed to find injection point in ${dir}/page.tsx`);
    }
  }
}
