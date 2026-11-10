"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SimpleHeroCalculator } from "@/components/SimpleHeroCalculator";
import { TOOLS } from "@/lib/constants";
import { 
  Search, 
  Sparkles, 
  Calculator, 
  Banknote, 
  CalendarDays, 
  ShoppingCart, 
  Heart,
  ChevronRight,
  X
} from "lucide-react";

const CATEGORIES = [
  "DATE & AGE",
  "SHOPPING & DAILY LIFE",
  "FINANCE & MONEY",
  "MATH & EDUCATION",
  "HEALTH & FITNESS",
  "FUN & LIFESTYLE",
] as const;

interface CategoryConfig {
  icon: React.ElementType;
  topBorderClass: string;
  dotColorClass: string;
  iconColor: string;
  badgeClass: string;
  itemBorderHover: string;
  arrowHoverColor: string;
  arrowBgHover: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "DATE & AGE": {
    icon: CalendarDays,
    topBorderClass: "border-t-[#00B4D8]",
    dotColorClass: "bg-[#00B4D8]",
    iconColor: "text-[#00B4D8]",
    badgeClass: "bg-cyan-50 text-cyan-700 border border-cyan-200/70",
    itemBorderHover: "hover:border-[#00B4D8] hover:bg-[#E6F8F9] hover:shadow-md hover:shadow-cyan-500/10",
    arrowHoverColor: "group-hover:text-[#00B4D8]",
    arrowBgHover: "group-hover:bg-cyan-100/70",
  },
  "SHOPPING & DAILY LIFE": {
    icon: ShoppingCart,
    topBorderClass: "border-t-[#0D9488]",
    dotColorClass: "bg-[#0D9488]",
    iconColor: "text-[#0D9488]",
    badgeClass: "bg-teal-50 text-teal-700 border border-teal-200/70",
    itemBorderHover: "hover:border-[#0D9488] hover:bg-[#E6F8F9] hover:shadow-md hover:shadow-teal-500/10",
    arrowHoverColor: "group-hover:text-[#0D9488]",
    arrowBgHover: "group-hover:bg-teal-100/70",
  },
  "FINANCE & MONEY": {
    icon: Banknote,
    topBorderClass: "border-t-[#F97316]",
    dotColorClass: "bg-[#F97316]",
    iconColor: "text-[#F97316]",
    badgeClass: "bg-orange-50 text-orange-700 border border-orange-200/70",
    itemBorderHover: "hover:border-[#F97316] hover:bg-[#FFF7ED] hover:shadow-md hover:shadow-orange-500/10",
    arrowHoverColor: "group-hover:text-[#F97316]",
    arrowBgHover: "group-hover:bg-orange-100/70",
  },
  "MATH & EDUCATION": {
    icon: Calculator,
    topBorderClass: "border-t-[#3B82F6]",
    dotColorClass: "bg-[#3B82F6]",
    iconColor: "text-[#3B82F6]",
    badgeClass: "bg-blue-50 text-blue-700 border border-blue-200/70",
    itemBorderHover: "hover:border-[#3B82F6] hover:bg-[#EFF6FF] hover:shadow-md hover:shadow-blue-500/10",
    arrowHoverColor: "group-hover:text-[#3B82F6]",
    arrowBgHover: "group-hover:bg-blue-100/70",
  },
  "HEALTH & FITNESS": {
    icon: Heart,
    topBorderClass: "border-t-[#F43F5E]",
    dotColorClass: "bg-[#F43F5E]",
    iconColor: "text-[#F43F5E]",
    badgeClass: "bg-rose-50 text-rose-700 border border-rose-200/70",
    itemBorderHover: "hover:border-[#F43F5E] hover:bg-[#FFF1F2] hover:shadow-md hover:shadow-rose-500/10",
    arrowHoverColor: "group-hover:text-[#F43F5E]",
    arrowBgHover: "group-hover:bg-rose-100/70",
  },
  "FUN & LIFESTYLE": {
    icon: Sparkles,
    topBorderClass: "border-t-[#F59E0B]",
    dotColorClass: "bg-[#F59E0B]",
    iconColor: "text-[#F59E0B]",
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-200/70",
    itemBorderHover: "hover:border-[#F59E0B] hover:bg-[#FFFBEB] hover:shadow-md hover:shadow-amber-500/10",
    arrowHoverColor: "group-hover:text-[#F59E0B]",
    arrowBgHover: "group-hover:bg-amber-100/70",
  },
};

export function HomeCalculatorSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return TOOLS;
    const q = searchQuery.toLowerCase().trim();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Hero Interactive Simple Calculator */}
      <section className="relative mt-2 mb-6">
        <SimpleHeroCalculator />

        {/* High-Visibility Compact Colored Banner Right Under Calculator */}
        <div className="mt-4 mb-3 max-w-[390px] sm:max-w-md mx-auto rounded-2xl p-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500 shadow-md shadow-orange-500/15">
          <div className="bg-white rounded-[14px] px-4 py-2.5 text-center flex flex-col items-center justify-center">
            <h2 className="text-[15px] sm:text-base font-black text-slate-900 tracking-tight leading-snug">
              25 Free Online Calculators for Daily Use
            </h2>
            <div className="inline-flex items-center justify-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3 h-3 text-white" />
              <span>100% Free, No Login Required</span>
            </div>
          </div>
        </div>

        {/* Clean Search Bar */}
        <div className="relative w-full max-w-[390px] sm:max-w-md mx-auto mt-4 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search 25 calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search for a calculator"
            className="w-full bg-white border-2 border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl py-3 pl-11 pr-9 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm sm:text-base shadow-xs hover:border-slate-300"
          />
          {isSearching && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Categories & Tools Section */}
      <section aria-label="Available Calculators" className="mt-6">
        {isSearching ? (
          /* Search Results Card */
          <div className="bg-white rounded-2xl sm:rounded-3xl border-x border-b border-slate-200/80 border-t-4 border-t-orange-500 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2.5">
                <Search className="w-5 h-5 text-orange-500" strokeWidth={2.5} />
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-wide uppercase">
                  Search Results
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                {filteredTools.length} found
              </span>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="group flex items-center justify-between px-4 py-3.5 bg-white hover:bg-orange-50/70 border-2 border-slate-200/90 hover:border-orange-400 rounded-xl text-slate-800 font-bold text-sm sm:text-[15px] transition-all shadow-xs hover:shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5 truncate mr-2">
                      <div className="w-1.5 h-4 bg-orange-500 rounded-full opacity-60 group-hover:opacity-100 transition-all shrink-0" />
                      <span className="truncate group-hover:text-slate-950">{tool.name}</span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-orange-100/80 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" strokeWidth={2.5} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 font-medium text-sm">
                  No calculators found matching &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Client Card Design: Responsive Grid of Category Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CATEGORIES.map((category) => {
              const categoryTools = TOOLS.filter((t) => t.category === category);
              if (categoryTools.length === 0) return null;

              const cConfig =
                CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS["DATE & AGE"];
              const IconComp = cConfig.icon;

              return (
                <div
                  key={category}
                  className={`bg-white rounded-2xl sm:rounded-3xl border-x border-b border-slate-200/80 border-t-4 ${cConfig.topBorderClass} p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between`}
                >
                  <div>
                    {/* Category Card Header */}
                    <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-100 mb-4">
                      <div className="flex items-center space-x-2.5">
                        <IconComp
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${cConfig.iconColor}`}
                          strokeWidth={2.5}
                        />
                        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-wide uppercase">
                          {category}
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cConfig.badgeClass}`}
                      >
                        {categoryTools.length}
                      </span>
                    </div>

                    {/* Interactive Button Items List */}
                    <div className="space-y-2.5">
                      {categoryTools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/${tool.slug}`}
                          className={`group flex items-center justify-between w-full px-4 py-3 sm:py-3.5 bg-white border-2 border-slate-200/90 rounded-xl text-slate-800 font-bold text-sm sm:text-[15px] transition-all duration-150 shadow-xs active:scale-[0.99] cursor-pointer ${cConfig.itemBorderHover}`}
                        >
                          {/* Left Accent & Title */}
                          <div className="flex items-center space-x-3 truncate mr-2">
                            <div className={`w-1.5 h-4 sm:h-5 rounded-full ${cConfig.dotColorClass} opacity-60 group-hover:opacity-100 group-hover:scale-y-110 transition-all shrink-0`} />
                            <span className="truncate group-hover:text-slate-950 transition-colors">
                              {tool.name}
                            </span>
                          </div>

                          {/* Right Navigation Arrow Button */}
                          <div className={`flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100/90 ${cConfig.arrowBgHover} shrink-0 transition-colors duration-150`}>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 ${cConfig.arrowHoverColor} group-hover:translate-x-0.5 transition-all`}
                              strokeWidth={2.5}
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
