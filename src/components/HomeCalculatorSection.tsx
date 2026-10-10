"use client";

import { useState, useMemo } from "react";
import { TOOLS } from "@/lib/constants";
import { ToolCard } from "@/components/ToolCard";
import { 
  Search, 
  Sparkles, 
  Calculator, 
  Banknote, 
  CalendarDays, 
  ShoppingCart, 
  Heart 
} from "lucide-react";

const CATEGORIES = [
  "FINANCE & MONEY",
  "MATH & EDUCATION",
  "DATE & AGE",
  "SHOPPING & DAILY LIFE",
  "HEALTH & FITNESS",
  "FUN & LIFESTYLE"
] as const;

const CATEGORY_THEMES: Record<string, { lightBg: string, border: string, iconBg: string, badgeBg: string, titleColor: string, icon: any }> = {
  "FINANCE & MONEY": { lightBg: "bg-orange-50/70", border: "border-orange-100", iconBg: "bg-gradient-to-br from-amber-400 to-orange-500", badgeBg: "bg-gradient-to-br from-orange-400 to-orange-600", titleColor: "text-slate-900", icon: Banknote },
  "MATH & EDUCATION": { lightBg: "bg-blue-50/70", border: "border-blue-100", iconBg: "bg-gradient-to-br from-blue-400 to-blue-600", badgeBg: "bg-gradient-to-br from-blue-400 to-blue-600", titleColor: "text-blue-900", icon: Calculator },
  "DATE & AGE": { lightBg: "bg-purple-50/70", border: "border-purple-100", iconBg: "bg-gradient-to-br from-purple-400 to-purple-600", badgeBg: "bg-gradient-to-br from-purple-400 to-purple-600", titleColor: "text-slate-900", icon: CalendarDays },
  "SHOPPING & DAILY LIFE": { lightBg: "bg-emerald-50/70", border: "border-emerald-100", iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600", badgeBg: "bg-gradient-to-br from-emerald-400 to-emerald-600", titleColor: "text-emerald-900", icon: ShoppingCart },
  "HEALTH & FITNESS": { lightBg: "bg-rose-50/70", border: "border-rose-100", iconBg: "bg-gradient-to-br from-rose-400 to-rose-600", badgeBg: "bg-gradient-to-br from-rose-400 to-rose-600", titleColor: "text-rose-900", icon: Heart },
  "FUN & LIFESTYLE": { lightBg: "bg-amber-50/70", border: "border-amber-100", iconBg: "bg-gradient-to-br from-amber-400 to-amber-600", badgeBg: "bg-gradient-to-br from-amber-400 to-amber-600", titleColor: "text-amber-900", icon: Sparkles }
};

interface HomeCalculatorSectionProps {
  heroHeader: React.ReactNode;
  featureBadges: React.ReactNode;
}

export function HomeCalculatorSection({
  heroHeader,
  featureBadges,
}: HomeCalculatorSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return TOOLS;
    const q = searchQuery.toLowerCase().trim();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Hero Section Container */}
      <section className="relative rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 overflow-hidden px-5 py-8 md:px-6 md:py-12 text-center shadow-2xl mt-2 border border-slate-800">
        {/* Background Ambient Glows */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-orange-500/15 rounded-full blur-[90px]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-rose-500/15 rounded-full blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Static SSR Hero Text (Instant LCP) */}
          {heroHeader}

          {/* Search Bar */}
          <div className="relative w-full max-w-lg group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for a calculator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for a calculator"
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 rounded-xl md:rounded-2xl py-3 md:py-4 pl-11 md:pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-base md:text-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Feature Badges (Server Rendered) */}
      {featureBadges}

      {/* Calculators Grid Section */}
      <section aria-label="Available Calculators">
        {/* Main Header Banner */}
        <div className="relative overflow-hidden rounded-[1.25rem] border border-orange-100 bg-orange-50/70 p-2 md:p-3 flex items-center justify-between shadow-sm mb-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-orange-500 text-white shrink-0 ml-1 md:ml-2">
              <Calculator className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">
                {isSearching ? (
                  "Search Results"
                ) : (
                  <>
                    All{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                      Calculators
                    </span>
                  </>
                )}
              </h2>
              {!isSearching && (
                <p className="text-[11px] md:text-sm font-bold text-slate-600 mt-1 md:mt-1.5">
                  Explore all tools in one place
                </p>
              )}
            </div>
          </div>

          <div className="mr-1 md:mr-2 flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl shadow-sm bg-gradient-to-br from-orange-400 to-orange-600 text-white shrink-0 border-2 md:border-[3px] border-white">
            <div className="hidden sm:block">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 fill-white/20" />
            </div>
            <span className="text-lg md:text-2xl font-black leading-none">
              {filteredTools.length}
            </span>
            <span className="text-[9px] md:text-sm font-bold mt-0.5">Tools</span>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="space-y-12">
            {CATEGORIES.map((category, catIndex) => {
              const categoryTools = filteredTools.filter(
                (t) => t.category === category
              );
              if (categoryTools.length === 0) return null;

              const cTheme =
                CATEGORY_THEMES[category] || CATEGORY_THEMES["FINANCE & MONEY"];

              // Apply content-visibility: auto for below-the-fold categories when not searching
              const isBelowTheFold = !isSearching && catIndex >= 2;

              return (
                <div 
                  key={category} 
                  className="space-y-6"
                  style={isBelowTheFold ? { contentVisibility: "auto", containIntrinsicSize: "1px 360px" } : undefined}
                >
                  {/* Category Header Banner */}
                  <div
                    className={`relative overflow-hidden rounded-[1.25rem] border ${cTheme.border} ${cTheme.lightBg} p-1.5 md:p-2 flex items-center justify-between shadow-sm`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-md ${cTheme.iconBg} text-white shrink-0 ml-1 md:ml-2`}
                      >
                        <cTheme.icon
                          className="w-6 h-6 md:w-7 md:h-7"
                          strokeWidth={2.5}
                        />
                      </div>

                      <h3
                        className={`text-lg md:text-xl font-black ${cTheme.titleColor} uppercase tracking-tight`}
                      >
                        {category}
                      </h3>
                    </div>

                    <div
                      className={`mr-1.5 md:mr-2 flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-sm ${cTheme.badgeBg} text-white shrink-0 border-2 md:border-[3px] border-white`}
                    >
                      <span className="text-xl md:text-2xl font-black leading-none">
                        {categoryTools.length}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider mt-0.5">
                        Tools
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categoryTools.map((tool, idx) => (
                      <ToolCard key={tool.slug} tool={tool} index={idx} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Other categories fallback */}
            {(() => {
              const otherTools = filteredTools.filter(
                (t) => !(CATEGORIES as readonly string[]).includes(t.category)
              );
              if (otherTools.length === 0) return null;

              return (
                <div key="other" className="space-y-6">
                  <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 pl-2">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                      OTHER CALCULATORS
                    </h3>
                    <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                      {otherTools.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {otherTools.map((tool, idx) => (
                      <ToolCard key={tool.slug} tool={tool} index={idx} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No calculators found</h3>
            <p className="text-slate-500 mt-2">
              Try searching for something else, like &quot;Percentage&quot; or &quot;Age&quot;.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
