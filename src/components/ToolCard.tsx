import Link from "next/link";
import { Tool } from "@/lib/constants";
import { ChevronRight, Flame } from "lucide-react";

const colorMaps: Record<string, { accentBg: string, accentText: string, hoverText: string, glow: string, darkText: string }> = {
  orange: { 
    accentBg: "bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_8px_16px_-6px_rgba(249,115,22,0.6)]", 
    accentText: "text-orange-500", 
    hoverText: "group-hover:text-orange-600",
    glow: "from-orange-100/60",
    darkText: "text-orange-900"
  },
  amber: { 
    accentBg: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_8px_16px_-6px_rgba(245,158,11,0.6)]", 
    accentText: "text-amber-500", 
    hoverText: "group-hover:text-amber-600",
    glow: "from-amber-100/60",
    darkText: "text-amber-900"
  },
  rose: { 
    accentBg: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_8px_16px_-6px_rgba(225,29,72,0.6)]", 
    accentText: "text-rose-500", 
    hoverText: "group-hover:text-rose-600",
    glow: "from-rose-100/60",
    darkText: "text-rose-900"
  },
};

export function ToolCard({ tool }: { tool: Tool; index?: number }) {
  const Icon = tool.icon;
  const baseColor = tool.color.split('-')[1];
  const styles = colorMaps[baseColor] || colorMaps.orange;

  return (
    <Link 
      href={`/${tool.slug}`} 
      className="group relative flex items-center h-full rounded-[1.25rem] bg-white p-3 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-1 border border-slate-100 overflow-hidden ring-1 ring-slate-200/50 outline-none"
    >
      {/* Subtle colored glow hover effect */}
      <div 
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-r ${styles.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} 
      />

      <div className="relative z-10 flex items-center w-full gap-3 md:gap-4">
        {/* App Icon Container */}
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${styles.accentBg} text-white shrink-0 shadow-md`}>
          <Icon className="w-5.5 h-5.5 md:w-6 md:h-6" strokeWidth={2.5} />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug transition-colors duration-300 ${styles.hoverText}`}>
              {tool.name}
            </h3>
            {tool.popular && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-orange-100/80 text-orange-600 px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase border border-orange-200 shadow-sm shrink-0">
                <Flame className="w-2.5 h-2.5 fill-orange-500" />
                Popular
              </span>
            )}
          </div>
          
          <div className="mt-1 md:mt-1.5">
            <span className="inline-flex items-center gap-1 bg-blue-700 text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-sm shadow-blue-700/20 group-hover:bg-blue-800 transition-colors">
              Open Calculator <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Arrow Button */}
        <div 
          aria-hidden="true"
          className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-50 text-blue-800 items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-100 group-hover:text-blue-900 transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
}
