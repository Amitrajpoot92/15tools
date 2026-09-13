"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden md:flex flex-col fixed left-0 top-0 z-50">
      <div className="h-16 flex items-center px-6 border-b border-slate-100/50">
        <div className="p-1.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg mr-3 shadow-md shadow-orange-500/20">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-extrabold text-orange-600">
          ToolZen
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
        <Link
          href="/"
          className={cn(
            "flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
            pathname === "/"
              ? "bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-700 shadow-sm shadow-blue-900/5 border border-blue-100/50"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          Dashboard
        </Link>
        <div className="pt-5 pb-2">
          <p className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            Calculators
          </p>
        </div>
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = pathname === `/${tool.slug}`;
          const baseColor = tool.color.split('-')[1] || "blue"; // Will be blue, violet, or emerald
          
          const activeStyle = isActive ? {
            backgroundColor: `var(--color-${baseColor}-500)`,
            color: '#ffffff',
            boxShadow: `0 4px 14px 0 var(--color-${baseColor}-500, rgba(0,0,0,0.2))`
          } : {};

          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              style={activeStyle}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group border",
                isActive
                  ? "font-bold border-transparent"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <div 
                className={cn(
                "p-1.5 rounded-lg mr-3 transition-all duration-300",
                isActive 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
              )}>
                <Icon className={cn("w-4 h-4", isActive ? `text-${baseColor}-600` : "")} />
              </div>
              <span className="truncate">{tool.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
