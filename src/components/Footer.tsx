import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          
          {/* Brand & Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/icon.png" alt="TopCalcBox Logo" className="w-10 h-10 rounded-[10px] shadow-sm" />
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
                TopCalcBox
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 pr-4">
              Your premium destination for fast, accurate, and easy-to-use online calculators. Designed to save your time and simplify your daily mathematics and finance needs.
            </p>

          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Top Tools</h4>
            <ul className="space-y-4">
              <li><Link href="/percentage-calculator" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Percentage Calc</Link></li>
              <li><Link href="/age-calculator-online" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Age Calculator</Link></li>
              <li><Link href="/discount-calculator" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Discount Calc</Link></li>
              <li><Link href="/gst-calculator" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">GST Calculator</Link></li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Our Blog</Link></li>
              <li><Link href="/news" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">News & Updates</Link></li>
            </ul>
          </div>



        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-0">
          <p className="text-sm text-slate-500 font-medium text-center md:text-left">
            © 2026 TopCalcBox. All Rights Reserved. All calculators are for informational and educational purposes only.
          </p>
          <div className="flex space-x-4 md:space-x-6 flex-wrap justify-center md:justify-end gap-y-2">
            <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Terms and Conditions</Link>
            <Link href="/disclaimer" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
