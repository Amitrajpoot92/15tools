import Link from "next/link";
import { Calculator, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Brand & Description (4 cols) */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
                TopCalcBox
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 pr-4">
              Your premium destination for fast, accurate, and easy-to-use online calculators. Designed to save your time and simplify your daily mathematics and finance needs.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 hover:shadow-sm transition-all flex items-center justify-center w-9 h-9">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 hover:shadow-sm transition-all flex items-center justify-center w-9 h-9">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 hover:shadow-sm transition-all flex items-center justify-center w-9 h-9">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 hover:shadow-sm transition-all flex items-center justify-center w-9 h-9">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Links Section (2 cols) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Top Tools</h4>
            <ul className="space-y-4">
              <li><Link href="/percentage-calculator" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Percentage Calc</Link></li>
              <li><Link href="/age-calculator-online" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Age Calculator</Link></li>
              <li><Link href="/discount-calculator" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Discount Calc</Link></li>
              <li><Link href="/gst-calculator" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">GST Calculator</Link></li>
            </ul>
          </div>

          {/* Links Section (2 cols) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Our Blog</Link></li>
              <li><Link href="/news" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">News & Updates</Link></li>
            </ul>
          </div>

          {/* Newsletter Section (4 cols) */}
          <div className="col-span-1 md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-slate-900 font-bold mb-2">Subscribe to our Newsletter</h4>
            <p className="text-sm text-slate-500 mb-4">
              Get the latest updates, tool releases, and productivity tips straight to your inbox.
            </p>
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-50 border border-slate-200 rounded-l-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-r-xl transition-colors flex items-center justify-center border border-orange-500 hover:border-orange-600">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-3">By subscribing, you agree to our Privacy Policy.</p>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">
            © 2026 TopCalcBox. All Rights Reserved. All calculators are for informational and educational purposes only.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 flex-wrap justify-center gap-y-2">
            <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Terms and Conditions</Link>
            <Link href="/disclaimer" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
