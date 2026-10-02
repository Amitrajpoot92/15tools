"use client";

import { useState } from "react";
import { TOOLS } from "@/lib/constants";
import { ToolCard } from "@/components/ToolCard";
import { Search, Sparkles, CheckCircle2, Zap, Smartphone, MousePointer2, ShieldCheck, HelpCircle, FileQuestion, Calculator, Banknote, CalendarDays, ShoppingCart, Heart } from "lucide-react";
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
            <span>FREE CALCULATOR TOOLS</span>
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
            Free Online Calculators for Finance, Math, Education, Health, Age, Dates & Daily Life
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative w-full max-w-lg group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
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

      {/* Features Badges */}
      <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mt-6 mb-10 max-w-4xl mx-auto px-2">
        {[
          { icon: ShieldCheck, text: "100% Free to Use" },
          { icon: MousePointer2, text: "No Sign-Up Required" },
          { icon: Zap, text: "Lightning Fast" },
          { icon: Smartphone, text: "Mobile-Friendly" },
          { icon: CheckCircle2, text: "Easy to Understand" }
        ].map((feature, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-sm hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 hover:shadow-md transition-all cursor-default"
          >
            <feature.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500" strokeWidth={2.5} />
            <span className="whitespace-nowrap">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Grid Section */}
      <div>
        {/* Main Header Banner */}
        <div className="relative overflow-hidden rounded-[1.25rem] border border-orange-100 bg-orange-50/70 p-2 md:p-3 flex items-center justify-between shadow-sm mb-10">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Left Icon Block */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-orange-500 text-white shrink-0 ml-1 md:ml-2">
              <Calculator className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            
            {/* Title */}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">
                {searchQuery ? "Search Results" : (
                  <>All <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Calculators</span></>
                )}
              </h2>
              {!searchQuery && (
                <p className="text-[11px] md:text-sm font-bold text-slate-600 mt-1 md:mt-1.5">
                  Explore all tools in one place
                </p>
              )}
            </div>
          </div>
          
          {/* Right Tools Badge */}
          <div className="mr-1 md:mr-2 flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl shadow-sm bg-gradient-to-br from-orange-400 to-orange-600 text-white shrink-0 border-2 md:border-[3px] border-white">
            <div className="hidden sm:block"><Sparkles className="w-4 h-4 md:w-5 md:h-5 fill-white/20" /></div>
            <span className="text-lg md:text-2xl font-black leading-none">{filteredTools.length}</span>
            <span className="text-[9px] md:text-sm font-bold mt-0.5">Tools</span>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="space-y-12">
            {[
              "FINANCE & MONEY",
              "MATH & EDUCATION",
              "DATE & AGE",
              "SHOPPING & DAILY LIFE",
              "HEALTH & FITNESS",
              "FUN & LIFESTYLE"
            ].map((category) => {
              const categoryTools = filteredTools.filter(t => t.category === category);
              if (categoryTools.length === 0) return null;
              
              const categoryThemes: Record<string, { lightBg: string, border: string, iconBg: string, badgeBg: string, titleColor: string, icon: any }> = {
                "FINANCE & MONEY": { lightBg: "bg-orange-50/70", border: "border-orange-100", iconBg: "bg-gradient-to-br from-amber-400 to-orange-500", badgeBg: "bg-gradient-to-br from-orange-400 to-orange-600", titleColor: "text-slate-900", icon: Banknote },
                "MATH & EDUCATION": { lightBg: "bg-blue-50/70", border: "border-blue-100", iconBg: "bg-gradient-to-br from-blue-400 to-blue-600", badgeBg: "bg-gradient-to-br from-blue-400 to-blue-600", titleColor: "text-blue-900", icon: Calculator },
                "DATE & AGE": { lightBg: "bg-purple-50/70", border: "border-purple-100", iconBg: "bg-gradient-to-br from-purple-400 to-purple-600", badgeBg: "bg-gradient-to-br from-purple-400 to-purple-600", titleColor: "text-slate-900", icon: CalendarDays },
                "SHOPPING & DAILY LIFE": { lightBg: "bg-emerald-50/70", border: "border-emerald-100", iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600", badgeBg: "bg-gradient-to-br from-emerald-400 to-emerald-600", titleColor: "text-emerald-900", icon: ShoppingCart },
                "HEALTH & FITNESS": { lightBg: "bg-rose-50/70", border: "border-rose-100", iconBg: "bg-gradient-to-br from-rose-400 to-rose-600", badgeBg: "bg-gradient-to-br from-rose-400 to-rose-600", titleColor: "text-rose-900", icon: Heart },
                "FUN & LIFESTYLE": { lightBg: "bg-amber-50/70", border: "border-amber-100", iconBg: "bg-gradient-to-br from-amber-400 to-amber-600", badgeBg: "bg-gradient-to-br from-amber-400 to-amber-600", titleColor: "text-amber-900", icon: Sparkles }
              };
              
              const cTheme = categoryThemes[category] || categoryThemes["FINANCE & MONEY"];

              return (
                <div key={category} className="space-y-6">
                  {/* Category Header Banner */}
                  <div className={`relative overflow-hidden rounded-[1.25rem] border ${cTheme.border} ${cTheme.lightBg} p-1.5 md:p-2 flex items-center justify-between shadow-sm`}>
                    <div className="flex items-center gap-3">
                      {/* Left Icon Block */}
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-md ${cTheme.iconBg} text-white shrink-0 ml-1 md:ml-2`}>
                        <cTheme.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-lg md:text-xl font-black ${cTheme.titleColor} uppercase tracking-tight`}>
                        {category}
                      </h3>
                    </div>
                    
                    {/* Right Tools Badge */}
                    <div className={`mr-1.5 md:mr-2 flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-sm ${cTheme.badgeBg} text-white shrink-0 border-2 md:border-[3px] border-white`}>
                      <span className="text-xl md:text-2xl font-black leading-none">{categoryTools.length}</span>
                      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider mt-0.5">Tools</span>
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
              const otherTools = filteredTools.filter(t => ![
                "FINANCE & MONEY",
                "MATH & EDUCATION",
                "DATE & AGE",
                "SHOPPING & DAILY LIFE",
                "HEALTH & FITNESS",
                "FUN & LIFESTYLE"
              ].includes(t.category));
              if (otherTools.length === 0) return null;
              
              return (
                <div key="other" className="space-y-6">
                  <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 pl-2">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">OTHER CALCULATORS</h3>
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
      {/* Home Page SEO & Info Section */}
      <div className="mt-16 space-y-8 md:space-y-12">
        
        {/* Why Use TopCalcBox */}
        <section className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 border border-orange-100">
              <Sparkles className="w-4 h-4" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Why Use TopCalcBox
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl mb-0">
              TopCalcBox is designed to make everyday calculations simple and convenient. With free calculators for finance, math, education, health, dates, and daily-life needs, you can find the right tool in one place. From percentages, GST, discounts, EMI and SIP to age, BMI and everyday calculations, TopCalcBox helps you get clear results quickly without complicated formulas. Our simple, mobile-friendly tools are easy to use whenever you need them.
            </p>
          </div>
        </section>

        {/* How It Works & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* How Our Calculators Work */}
          <section className="bg-slate-900 rounded-[2rem] p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-blue-300 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
                <Calculator className="w-4 h-4" />
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
                How Our Calculators Work
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-8 font-medium">
                Calculate your results in just three simple steps.
              </p>
              
              <div className="space-y-6">
                {[
                  { num: "1", title: "Choose Your Calculator", desc: "Select the calculator that matches what you need to calculate." },
                  { num: "2", title: "Enter Your Values", desc: "Enter your numbers and details in the clearly labeled fields." },
                  { num: "3", title: "Get Your Result", desc: "Your result is calculated instantly and displayed in an easy-to-understand format." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-400/30 rounded-full flex items-center justify-center text-blue-300 font-extrabold">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-slate-400 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 border border-slate-200">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  { q: "1. Are all TopCalcBox calculators free to use?", a: "Yes. All calculators available on TopCalcBox are free to use. No subscription or payment is required to use the available calculation tools." },
                  { q: "2. Do I need to create an account to use the calculators?", a: "No. You can use the calculators without creating an account or signing in. Simply choose a calculator, enter your values, and get your result." },
                  { q: "3. Can I use TopCalcBox on my mobile phone?", a: "Yes. TopCalcBox is designed to work smoothly on smartphones, tablets, and desktop devices." },
                  { q: "4. How do I choose the right calculator?", a: "Choose a calculator from the relevant category, or use the search option to quickly find the tool you need." },
                  { q: "5. Is my information safe when I use a calculator?", a: "Yes. TopCalcBox is designed with user privacy in mind. Calculator inputs are processed directly in your browser and are not sent to our servers or stored by us. No account or personal information is required to use our calculators." },
                  { q: "6. Can I install TopCalcBox on my device?", a: "Yes. If your device and browser support installation, you can use the “App” button in the header to install TopCalcBox on your device for quick access from your home screen." }
                ].map((faq, idx) => (
                  <div key={idx} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <h3 className="text-base font-bold text-slate-800 mb-2 flex items-start gap-2">
                      <FileQuestion className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      {faq.q}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed pl-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
