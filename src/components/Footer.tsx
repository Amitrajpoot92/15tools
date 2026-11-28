import Link from "next/link";
import { Mail, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { TOOLS, PLAY_STORE_URL } from "@/lib/constants";

const POPULAR_LINKS = [
  { label: "Percentage Calculator", href: "/percentage-calculator" },
  { label: "GST Calculator", href: "/gst-calculator" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Age Calculator Online", href: "/age-calculator-online" },
  { label: "BMI Calculator", href: "/bmi-calculator" },
];

const MORE_TOOLS_LINKS = [
  { label: "Discount Calculator", href: "/discount-calculator" },
  { label: "SIP Calculator", href: "/sip-calculator" },
  { label: "Marks Percentage", href: "/marks-percentage-calculator" },
  { label: "Calorie Calculator", href: "/calorie-calculator" },
  { label: "Date Difference", href: "/date-difference-calculator" },
];

const LEGAL_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  return (
    <footer className="w-full mt-8 md:mt-10 bg-gradient-to-b from-slate-50/90 via-white to-orange-50/40 border-t border-slate-200/80 relative overflow-hidden">
      {/* Top Gradient Accent Bar */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-blue-600"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <Link
                href="/"
                className="inline-flex items-center space-x-3 group outline-none"
              >
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-orange-500 blur-lg opacity-25 rounded-full group-hover:opacity-40 transition-opacity" />
                  <img
                    src="/topcalcbox-logo-96.webp"
                    alt="TopCalcBox Logo"
                    width="44"
                    height="44"
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-full relative z-10 shadow-sm border border-orange-200/70"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
                    TopCalcBox
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Free Online Calculators
                  </span>
                </div>
              </Link>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-md font-medium">
                Your everyday hub for fast, simple, and accurate online
                calculators covering finance, math, education, shopping, dates,
                and health — all completely free with zero sign-up.
              </p>

              {/* Trust Highlights */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  25 Free Tools
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                  100% Browser Private
                </span>
              </div>
            </div>

            {/* Action Row: Support Email & Google Play */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="mailto:help.rka@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm text-xs font-bold text-slate-700 hover:text-orange-600 transition-all group"
              >
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span>help.rka@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 transition-colors" />
              </a>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs hover:shadow-sm text-xs font-bold transition-all group border border-slate-800"
              >
                <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a2.372 2.372 0 0 1-.3-.388c-.198-.337-.31-.73-.31-1.155V3.357c0-.425.112-.818.31-1.155.086-.147.188-.278.3-.388zM15.207 13.414l2.747 2.747-11.83 6.83 9.083-9.577zm0-2.828L6.124.979l11.83 6.85-2.747 2.757zm1.414 1.414l3.197-1.847c.806-.465.806-1.228 0-1.693l-3.197-1.847-1.414 1.414 1.414 1.414 1.414 1.414-1.414 1.414-1.414 1.414 1.414 1.414 3.197-1.847z" />
                </svg>
                <span>Google Play</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Popular Calculators */}
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-orange-500 inline-block" />
                Popular
              </h3>
              <ul className="space-y-2.5">
                {POPULAR_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-orange-600 hover:translate-x-0.5 inline-block transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Tools */}
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-blue-500 inline-block" />
                Daily Tools
              </h3>
              <ul className="space-y-2.5">
                {MORE_TOOLS_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-blue-600 hover:translate-x-0.5 inline-block transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Legal */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
                Company
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* All Calculators Crawl Directory (Ensures Googlebot Smartphone crawls and indexes all 25 tools from every page) */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <p className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1.5 h-3.5 rounded-full bg-orange-500 inline-block" />
            All 25 Free Calculators
          </p>
          <div className="flex flex-wrap gap-x-3.5 gap-y-2 text-xs font-semibold text-slate-600">
            {TOOLS.map((tool, idx) => (
              <span key={tool.slug} className="inline-flex items-center">
                <Link
                  href={`/${tool.slug}`}
                  className="hover:text-orange-600 hover:underline transition-colors"
                >
                  {tool.name}
                </Link>
                {idx < TOOLS.length - 1 && (
                  <span className="ml-3.5 text-slate-300 select-none" aria-hidden="true">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer Bar */}
        <div className="mt-9 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <p className="text-xs font-bold text-slate-700">
            © {new Date().getFullYear()} TopCalcBox. All Rights Reserved.
          </p>
          <p className="text-[11px] sm:text-xs font-medium text-slate-500">
            All calculators are for informational and educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
