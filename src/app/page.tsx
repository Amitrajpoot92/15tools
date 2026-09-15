"use client";

import { useState } from "react";
import { TOOLS } from "@/lib/constants";
import { ToolCard } from "@/components/ToolCard";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 overflow-hidden px-5 py-8 md:px-6 md:py-12 text-center shadow-2xl mt-2 border border-slate-800">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-500/20 rounded-full blur-[100px]" />
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-orange-200 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>TopCalcBox Premium</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 md:mb-4"
          >
            Calculate Anything. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Instantly.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl font-medium px-2"
          >
            Your all-in-one suite for everyday math, finance, and time calculations.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative w-full max-w-lg group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for a calculator..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 rounded-xl md:rounded-2xl py-3 md:py-4 pl-11 md:pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-base md:text-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Grid Section */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold text-slate-800">
            {searchQuery ? "Search Results" : "All Calculators"}
          </h2>
          <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {filteredTools.length} Tools
          </span>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool, idx) => (
              <ToolCard key={tool.slug} tool={tool} index={idx} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No calculators found</h3>
            <p className="text-slate-500 mt-2">Try searching for something else, like "Percentage" or "Age".</p>
          </motion.div>
        )}
      </div>

    </div>
  );
}
