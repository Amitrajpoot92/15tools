import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/icon.png" alt="TopCalcBox Logo" className="w-10 h-10 rounded-[10px] shadow-sm" />
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
                TopCalcBox
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              TopCalcBox is a free online calculator platform designed to make everyday calculations simple, quick, and easy. Find useful calculators for finance, math, education, health, dates, and daily-life needs — all in one place.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-0">
          <p className="text-sm text-slate-500 font-medium text-center md:text-left">
            © 2026 TopCalcBox. All Rights Reserved. All calculators are for informational and educational purposes only.
          </p>
          <div className="flex space-x-4 md:space-x-6 flex-wrap justify-center md:justify-end gap-y-2">
            <Link href="/about" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Terms and Conditions</Link>
            <Link href="/disclaimer" className="text-sm text-slate-500 hover:text-orange-600 font-medium transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
