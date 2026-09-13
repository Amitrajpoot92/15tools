"use client";

import { TOOLS } from "@/lib/constants";
import { ToolCard } from "@/components/ToolCard";
import { Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2 md:hidden">
            <Calculator className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-orange-600">
              ToolZen
            </h1>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Premium Calculators
          </h1>
          <p className="text-slate-500 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
            A beautiful collection of highly interactive and accurate calculators for your daily needs. Select any tool below to get started.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool, idx) => (
          <ToolCard key={tool.slug} tool={tool} index={idx} />
        ))}
      </div>
    </div>
  );
}
