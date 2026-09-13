"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tool } from "@/lib/constants";

// Clean, Premium White Cards with Hard Color Accents (Orange, Amber, Rose)
const colorMaps: Record<string, { accentBg: string, accentText: string, border: string, hoverText: string }> = {
  orange: { accentBg: "bg-orange-500", accentText: "text-orange-500", border: "border-l-orange-500", hoverText: "group-hover:text-orange-600" },
  amber: { accentBg: "bg-amber-500", accentText: "text-amber-500", border: "border-l-amber-500", hoverText: "group-hover:text-amber-600" },
  rose: { accentBg: "bg-rose-500", accentText: "text-rose-500", border: "border-l-rose-500", hoverText: "group-hover:text-rose-600" },
};

export function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const baseColor = tool.color.split('-')[1];
  const styles = colorMaps[baseColor] || colorMaps.orange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/${tool.slug}`} className="block h-full outline-none">
        <div 
          className={`group relative h-full rounded-2xl bg-white p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-200 border-l-[6px] ${styles.border} overflow-hidden`}
        >
          {/* Subtle gradient hover effect in the background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10">
            {/* Hard Color Icon Container */}
            <div className={`p-3 w-fit rounded-xl mb-5 shadow-sm transition-transform duration-300 group-hover:scale-105 ${styles.accentBg} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <h3 className={`text-xl font-bold text-slate-800 mb-2 transition-colors duration-300 ${styles.hoverText}`}>
              {tool.name}
            </h3>
            
            <p className="text-sm leading-relaxed text-slate-500">
              {tool.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
