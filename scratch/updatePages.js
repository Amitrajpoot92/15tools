const fs = require('fs');
const path = require('path');

const srcApp = path.join(process.cwd(), 'src/app');

// Tools to update
const dirs = fs.readdirSync(srcApp).filter(d => {
  const stat = fs.statSync(path.join(srcApp, d));
  return stat.isDirectory() && !['about', 'blog', 'contact', 'disclaimer', 'news', 'privacy-policy', 'terms-and-conditions'].includes(d);
});

dirs.forEach(dir => {
  const pagePath = path.join(srcApp, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');

    // Replace the Hero Section with a tighter, more premium layout.
    const regex = /\{\/\* Hero Section \*\/\}\s*<div className="flex flex-col items-center justify-center text-center mb-10 mt-6">\s*<div className="p-4 bg-[A-Za-z0-9\-]+ rounded-full mb-4 border border-[A-Za-z0-9\-]+ shadow-sm">\s*<([A-Za-z0-9]+) className="w-8 h-8 text-[A-Za-z0-9\-]+" \/>\s*<\/div>\s*<h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">\s*(.+)\s*<\/h1>\s*<p className="text-slate-500 max-w-2xl text-lg">\s*([\s\S]+?)\s*<\/p>\s*<\/div>\s*\{\/\* Interactive Tool \*\/\}\s*<div className="max-w-4xl mx-auto mb-16">/g;

    content = content.replace(regex, (match, icon, title, description) => {
      return `{/* Compact Premium Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-slate-900 rounded-[2rem] p-5 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center md:text-left overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-5 w-full">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
            <${icon} className="w-7 h-7 text-orange-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              ${title.trim()}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-medium">
              ${description.trim()}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-10">`;
    });
    
    // Decrease bottom padding
    content = content.replace(/<div className="pb-20">/g, '<div className="pb-8">');

    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Updated ${dir}/page.tsx`);
  }
});
