import { HomeCalculatorSection } from "@/components/HomeCalculatorSection";
import { 
  Sparkles, 
  ShieldCheck, 
  MousePointer2, 
  Zap, 
  Smartphone, 
  CheckCircle2, 
  Calculator, 
  HelpCircle, 
  ChevronDown 
} from "lucide-react";

export default function Home() {
  const heroHeader = (
    <>
      <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-orange-200 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span>FREE CALCULATOR TOOLS</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 md:mb-4">
        Calculate Anything. <br />{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
          Instantly.
        </span>
      </h1>
      
      <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl font-medium px-2">
        Free Online Calculators for Finance, Math, Education, Health, Age, Dates & Daily Life
      </p>
    </>
  );

  const featureBadges = (
    <div className="flex flex-col items-center gap-2 md:gap-2.5 mt-4 mb-6 md:mt-5 md:mb-8 max-w-4xl mx-auto px-2">
      {[
        [
          { icon: ShieldCheck, text: "100% Free to Use" },
          { icon: MousePointer2, text: "No Sign-Up Required" }
        ],
        [
          { icon: Zap, text: "Lightning Fast" },
          { icon: Smartphone, text: "Mobile-Friendly" }
        ],
        [
          { icon: CheckCircle2, text: "Easy to Understand" }
        ]
      ].map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center items-center gap-2 md:gap-2.5">
          {row.map((feature, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider md:tracking-widest shadow-sm hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 hover:shadow-md transition-all cursor-default"
            >
              <feature.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500 shrink-0" strokeWidth={2.5} />
              <span className="whitespace-nowrap">{feature.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const faqItems = [
    { q: "Are all TopCalcBox calculators free to use?", a: "Yes. All calculators available on TopCalcBox are free to use. No subscription or payment is required to use the available calculation tools." },
    { q: "Do I need to create an account to use the calculators?", a: "No. You can use the calculators without creating an account or signing in. Simply choose a calculator, enter your values, and get your result." },
    { q: "Can I use TopCalcBox on my mobile phone?", a: "Yes. TopCalcBox is designed to work smoothly on smartphones, tablets, and desktop devices." },
    { q: "How do I choose the right calculator?", a: "Choose a calculator from the relevant category, or use the search option to quickly find the tool you need." },
    { q: "Is my information safe when I use a calculator?", a: "Yes. TopCalcBox is designed with user privacy in mind. Calculator inputs are processed directly in your browser and are not sent to our servers or stored by us. No account or personal information is required to use our calculators." },
    { q: "Can I install TopCalcBox on my device?", a: "Yes. If your device and browser support installation, you can use the “App” button in the header to install TopCalcBox on your device for quick access from your home screen." }
  ];

  const faqColors = [
    { numBg: "bg-blue-500 shadow-blue-500/30", arrowBg: "bg-blue-50 text-blue-500", openRing: "open:ring-blue-100 open:border-blue-200" },
    { numBg: "bg-orange-500 shadow-orange-500/30", arrowBg: "bg-orange-50 text-orange-500", openRing: "open:ring-orange-100 open:border-orange-200" },
    { numBg: "bg-emerald-500 shadow-emerald-500/30", arrowBg: "bg-emerald-50 text-emerald-500", openRing: "open:ring-emerald-100 open:border-emerald-200" },
    { numBg: "bg-purple-500 shadow-purple-500/30", arrowBg: "bg-purple-50 text-purple-500", openRing: "open:ring-purple-100 open:border-purple-200" },
    { numBg: "bg-rose-500 shadow-rose-500/30", arrowBg: "bg-rose-50 text-rose-500", openRing: "open:ring-rose-100 open:border-rose-200" },
    { numBg: "bg-sky-500 shadow-sky-500/30", arrowBg: "bg-sky-50 text-sky-500", openRing: "open:ring-sky-100 open:border-sky-200" }
  ];

  return (
    <div className="space-y-10 pb-0">
      {/* Interactive Hero Search & Tool Grid */}
      <HomeCalculatorSection 
        heroHeader={heroHeader} 
        featureBadges={featureBadges} 
      />

      {/* Home Page SEO & Info Section */}
      <div className="mt-10 md:mt-12 space-y-6 md:space-y-8">
        
        {/* Why Use TopCalcBox */}
        <section className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 border-2 border-[#fed7aa]/60 shadow-lg shadow-orange-500/5 relative overflow-hidden">
          <div 
            aria-hidden="true"
            className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-amber-300/20 to-orange-400/15 rounded-full blur-2xl pointer-events-none" 
          />
          <div 
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 w-52 h-52 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" 
          />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-[#fff6ea] text-[#c25e00] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-[#fde4c3] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>WHY CHOOSE US</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Why Use <span className="text-[#ff5400]">TopCalcBox</span>
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              TopCalcBox is designed to make everyday calculations simple and convenient. With free calculators for finance, math, education, health, dates, and daily-life needs, you can find the right tool in one place. From percentages, GST, discounts, EMI and SIP to age, BMI and everyday calculations, TopCalcBox helps you get clear results quickly without complicated formulas. Our simple, mobile-friendly tools are easy to use whenever you need them.
            </p>
          </div>
        </section>

        {/* How It Works & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* How Our Calculators Work */}
          <section className="bg-[#f0f7ff] rounded-[2rem] p-6 sm:p-8 md:p-9 border-2 border-[#dbeafe] shadow-lg shadow-blue-500/5 relative overflow-hidden flex flex-col justify-between">
            <div 
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" 
            />
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-[#e0f0fe] text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-[#bae6fd] shadow-sm">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>SIMPLE PROCESS</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2 leading-tight">
                How Our <span className="text-[#0066ff]">Calculators Work</span>
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base font-normal mb-6">
                Calculate your results in just three simple steps.
              </p>
              
              <div className="space-y-3.5 sm:space-y-4">
                {[
                  { 
                    num: "1", 
                    title: "Choose Your Calculator", 
                    desc: "Select the calculator that matches what you need to calculate.", 
                    cardBg: "bg-gradient-to-r from-[#edf5ff] to-[#f7faff] border-[#cbe1ff]", 
                    numBg: "bg-gradient-to-b from-[#38bdf8] to-[#2563eb] shadow-blue-500/25" 
                  },
                  { 
                    num: "2", 
                    title: "Enter Your Values", 
                    desc: "Enter your numbers and details in the clearly labeled fields.", 
                    cardBg: "bg-gradient-to-r from-[#fff9f0] to-[#fffdf9] border-[#fed7aa]", 
                    numBg: "bg-gradient-to-b from-[#fbbf24] to-[#f97316] shadow-orange-500/25" 
                  },
                  { 
                    num: "3", 
                    title: "Get Your Result", 
                    desc: "Your result is calculated instantly and displayed in an easy-to-understand format.", 
                    cardBg: "bg-gradient-to-r from-[#f0fdf4] to-[#f8fef9] border-[#bbf7d0]", 
                    numBg: "bg-gradient-to-b from-[#4ade80] to-[#16a34a] shadow-emerald-500/25" 
                  }
                ].map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-4 sm:gap-5 rounded-2xl p-4 sm:p-5 border shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-transform hover:scale-[1.01] ${step.cardBg}`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 ${step.numBg} rounded-full flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-md`}>
                      {step.num}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight mb-1">{step.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-snug font-normal">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions (Native Accessible Accordions with Zero JS Overhead) */}
          <section className="bg-white rounded-[1.75rem] p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div 
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" 
            />
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-rose-50 text-orange-600 px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-orange-100/80 shadow-sm">
                <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
                <span>FAQ</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight mb-5">
                <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              
              <div className="space-y-2.5 sm:space-y-3">
                {faqItems.map((faq, idx) => {
                  const c = faqColors[idx % faqColors.length];

                  return (
                    <details 
                      key={idx} 
                      open={idx === 0}
                      className={`group rounded-2xl bg-white border border-slate-100/90 shadow-sm transition-all duration-300 overflow-hidden hover:border-slate-200 hover:shadow open:shadow-md open:ring-1 ${c.openRing}`}
                    >
                      <summary 
                        className="w-full text-left p-3 sm:p-3.5 flex items-center justify-between gap-3 select-none transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${c.numBg} text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm`}>
                            {idx + 1}
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {faq.q}
                          </h3>
                        </div>
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${c.arrowBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-open:rotate-180`}>
                          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                        </div>
                      </summary>

                      <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 pt-0">
                        <div className="bg-slate-50/90 rounded-xl p-3 sm:p-3.5 border border-slate-100/80">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
