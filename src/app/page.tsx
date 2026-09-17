"use client";

import { useState } from "react";
import { TOOLS } from "@/lib/constants";
import { ToolCard } from "@/components/ToolCard";
import { Search, Sparkles, CheckCircle2, Zap, Smartphone, MousePointer2, ShieldCheck, HelpCircle, FileQuestion, Calculator } from "lucide-react";
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
            Free Online Calculators for Finance, Math, Health, Time & Everyday Calculations
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
              
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 pl-2">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">{category}</h3>
                    <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                      {categoryTools.length}
                    </span>
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
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl mb-8">
              TopCalcBox is designed to make everyday calculations simple and convenient. With free calculators for finance, math, education, health, dates, and daily-life needs, you can find the right tool in one place. From percentages, GST, discounts, EMI and SIP to age, BMI and everyday calculations, TopCalcBox helps you get clear results quickly without complicated formulas. Our simple, mobile-friendly tools are easy to use whenever you need them.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "100% Free to Use", desc: "No hidden fees, no subscriptions, and free access to all available calculators." },
                { icon: Zap, title: "Lightning Fast", desc: "Get calculation results instantly as you enter your values." },
                { icon: Smartphone, title: "Mobile-Friendly", desc: "Use TopCalcBox smoothly on smartphones, tablets, and desktop devices." },
                { icon: CheckCircle2, title: "Easy to Understand", desc: "Simple, clean interfaces make every calculator easy to use." },
                { icon: MousePointer2, title: "No Sign-Up Required", desc: "Start calculating instantly without creating an account or logging in." },
              ].map((feature, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 text-orange-500">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
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
                  { q: "5. Are the calculator results accurate?", a: "TopCalcBox uses standard mathematical formulas and calculation methods for its calculators. The result depends on the values and information entered by the user." },
                  { q: "6. What types of calculators are available on TopCalcBox?", a: "TopCalcBox offers calculators for finance, math, education, date and age, health, and everyday calculations." },
                  { q: "7. Is my information safe when I use a calculator?", a: "Yes. TopCalcBox is designed with user privacy in mind. Calculator inputs are processed directly in your browser and are not sent to our servers or stored by us. No account or personal information is required to use our calculators." },
                  { q: "8. Can I install TopCalcBox on my device?", a: "Yes. If your device and browser support installation, you can use the “App” button in the header to install TopCalcBox on your device for quick access from your home screen." }
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
