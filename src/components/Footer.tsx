import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#fcf9f2] border-t border-orange-100 mt-16 pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        
        {/* Logo and Brand */}
        <Link href="/" className="inline-flex flex-col items-center justify-center mb-6 outline-none group">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Strong orange glow behind the logo */}
              <div className="absolute inset-0 bg-orange-500 blur-xl opacity-40 rounded-xl" />
              <img src="/icon.png" alt="TopCalcBox Logo" className="w-10 h-10 rounded-xl relative z-10 shadow-sm" />
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              TopCalcBox
            </span>
          </div>
        </Link>
        
        {/* Description */}
        <p className="text-[15px] text-slate-600 leading-relaxed max-w-xl mx-auto mb-10 font-medium">
          TopCalcBox is a free online calculator platform designed to make everyday calculations simple, quick, and easy. Find useful calculators for finance, math, education, health, dates, and daily-life needs — all in one place.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
          <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors">Terms and Conditions</Link>
          <Link href="/disclaimer" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors">Disclaimer</Link>
        </div>

        {/* Copyright */}
        <p className="text-[13px] text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
          © {new Date().getFullYear()} TopCalcBox. All Rights Reserved. All calculators are for informational and educational purposes only.
        </p>
        
      </div>
    </footer>
  );
}
