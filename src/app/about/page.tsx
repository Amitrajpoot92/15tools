import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TopCalcBox",
};

export default function Page() {
  return (
    <div className="pb-0 max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">About Us</h1>
        </div>
      </div>
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm text-slate-600 space-y-5 text-sm md:text-base leading-relaxed mb-4">
        <p>Welcome to <strong>TopCalcBox</strong>, a simple and easy-to-use online calculator website designed to make everyday calculations quick and hassle-free.</p>
        <p>From managing money and checking percentages to calculating age, dates, marks, shopping costs, fuel expenses, electricity bills, and fitness-related numbers, TopCalcBox brings useful calculators together in one place.</p>
        
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">What We Offer</h2>
        <p>TopCalcBox currently provides 25 practical calculators across different categories:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Finance & Money:</strong> Percentage, Discount, GST, Profit & Loss, Margin, EMI, SIP, and Subscription Cost Calculators</li>
          <li><strong>Math & Education:</strong> Marks Percentage, Attendance Percentage, Negative Marking, Average, and BODMAS Calculators</li>
          <li><strong>Date & Age:</strong> Age, Birthday Countdown, Age Difference, and Date Difference Calculators</li>
          <li><strong>Shopping & Daily Life:</strong> Cost Per Item, Price per Kg, Tip, Fuel Cost, and Electricity Bill Calculators</li>
          <li><strong>Health & Fitness:</strong> BMI and Calorie Calculators</li>
          <li><strong>Fun & Lifestyle:</strong> Love Calculator</li>
        </ul>
        <p>Our goal is to keep every calculator simple, fast, clear, and easy to use, whether you're using a phone, tablet, or computer.</p>
        
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Why TopCalcBox ?</h2>
        <p>We believe that everyday calculations shouldn't require complicated formulas or lengthy steps. That's why our calculators are designed with a straightforward interface where you can enter your details and get the result quickly.</p>
        <p>Whether you're a student checking marks or attendance, someone calculating a discount or GST, planning an EMI or SIP, comparing shopping prices, or simply checking your age or birthday countdown, TopCalcBox is built for everyday use.</p>
        
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Our Goal</h2>
        <p>Our goal is to build a reliable collection of useful online calculators that people can use whenever they need a quick calculation.</p>
        <p>We are continuously working to improve TopCalcBox and add more helpful tools based on everyday needs.</p>
        <p>Thank you for visiting TopCalcBox. We hope our calculators make your daily calculations a little easier.</p>
      </div>
    </div>
  );
}
