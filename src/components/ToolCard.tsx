"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tool } from "@/lib/constants";

// Premium Glassmorphism Cards with Hard Color Gradients & Shadows
const colorMaps: Record<string, { accentBg: string, accentText: string, hoverText: string, glow: string }> = {
  orange: { 
    accentBg: "bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_8px_16px_-6px_rgba(249,115,22,0.6)]", 
    accentText: "text-orange-500", 
    hoverText: "group-hover:text-orange-600",
    glow: "from-orange-100/60"
  },
  amber: { 
    accentBg: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_8px_16px_-6px_rgba(245,158,11,0.6)]", 
    accentText: "text-amber-500", 
    hoverText: "group-hover:text-amber-600",
    glow: "from-amber-100/60"
  },
  rose: { 
    accentBg: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_8px_16px_-6px_rgba(225,29,72,0.6)]", 
    accentText: "text-rose-500", 
    hoverText: "group-hover:text-rose-600",
    glow: "from-rose-100/60"
  },
};

export function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const baseColor = tool.color.split('-')[1];
  const styles = colorMaps[baseColor] || colorMaps.orange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <Link href={`/${tool.slug}`} className="block h-full outline-none">
        <div 
          className="group relative flex items-center h-full rounded-2xl bg-white/60 backdrop-blur-xl p-4 transition-all duration-400 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-1 border border-white overflow-hidden ring-1 ring-slate-200/50"
        >
          {/* Subtle colored glow hover effect in the background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

          <div className="relative z-10 flex items-center w-full space-x-4">
            {/* App Icon Container */}
            <div className={`p-3.5 rounded-[1rem] transition-transform duration-300 group-hover:scale-110 group-active:scale-95 ${styles.accentBg} text-white shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={`text-[15px] font-bold text-slate-800 leading-snug transition-colors duration-300 ${styles.hoverText} truncate`}>
                {tool.name}
              </h3>
              <p className="text-[13px] text-slate-500 line-clamp-1 mt-0.5">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
