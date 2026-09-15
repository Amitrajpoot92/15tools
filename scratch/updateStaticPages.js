const fs = require('fs');
const path = require('path');

const srcApp = path.join(process.cwd(), 'src/app');

const staticDirs = ['about', 'blog', 'contact', 'disclaimer', 'news', 'privacy-policy', 'terms-and-conditions'];

staticDirs.forEach(dir => {
  const pagePath = path.join(srcApp, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');

    // Pattern to match the basic header
    // e.g. <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">\s*<h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">\s*(.+)\s*<\/h1>\s*<\/div>
    const regex = /<div className="flex flex-col items-center justify-center text-center mb-10 mt-6">\s*<h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">\s*(.+)\s*<\/h1>\s*<\/div>/g;

    content = content.replace(regex, (match, title) => {
      return `{/* Compact Premium Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-8 mt-2 shadow-xl border border-slate-800 text-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            ${title.trim()}
          </h1>
        </div>
      </div>`;
    });

    // We should also replace ToolZen with TopCalcBox while we're at it, since privacy-policy had it in the metadata.
    content = content.replace(/ToolZen/g, 'TopCalcBox');

    // Decrease bottom padding
    content = content.replace(/<div className="pb-20">/g, '<div className="pb-8">');

    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Updated ${dir}/page.tsx`);
  }
});
