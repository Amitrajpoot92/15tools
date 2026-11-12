import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TopCalcBox",
  alternates: {
    canonical: "https://topcalcbox.com/about",
  },
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
        <p>From managing money and checking percentages to calculating age, dates, marks, shopping costs, fuel expenses, grocery bills, and fitness-related numbers, TopCalcBox brings useful calculators together in one place.</p>
        
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">What We Offer</h2>
        <p>TopCalcBox currently provides 25 practical calculators across different categories:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Finance & Money:</strong> Percentage, Discount, GST, Profit & Loss, Wholesale Price, EMI, SIP, and Subscription Cost Calculators</li>
          <li><strong>Math & Education:</strong> Marks Percentage, Attendance Percentage, Negative Marking, Average, and BODMAS Calculators</li>
          <li><strong>Date & Age:</strong> Age, Birthday Countdown, Age Difference, and Date Difference Calculators</li>
          <li><strong>Shopping & Daily Life:</strong> Cost Per Item, Price per Kg, Tip, Fuel Cost, and Grocery Bill Calculators</li>
          <li><strong>Health & Fitness:</strong> BMI and Calorie Calculators</li>
          <li><strong>Fun & Lifestyle:</strong> Love Calculator</li>
        </ul>
        <p>Our goal is to keep every calculator simple, fast, clear, and easy to use, whether you're using a phone, tablet, or computer.</p>
        
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Why TopCalcBox Is Your Ultimate Hub for Everyday Calculations</h2>
        <p>Ever wondered how much you will save during a sale, how much GST you need to pay, or whether your business is making a profit? Everyday calculations can take time when you work them out manually. TopCalcBox makes these tasks easier with its Percentage Calculator, Discount Calculator, GST Calculator, Profit and Loss Calculator, and Wholesale Price Calculator. You can also use the EMI Calculator to estimate loan payments, the SIP Calculator to explore potential investment growth, and the Subscription Cost Calculator to understand your monthly and yearly subscription expenses.</p>
        <p>Shopping and daily budgeting become simpler when you know exactly what you are spending. The Cost Per Item Calculator helps you compare individual item prices, while the Price per Kg Calculator makes comparing products by weight easier. The Grocery Bill Calculator helps total your shopping expenses, the Tip Calculator helps calculate tips and split bills, and the Fuel Cost Calculator estimates the cost of your journey. These tools are useful when you want to compare prices, plan expenses, or make smarter everyday spending decisions.</p>
        <p>Students can save time with the Marks Percentage Calculator, Attendance Percentage Calculator, Negative Marking Calculator, Average Calculator, and BODMAS Calculator. Whether you are checking exam results, tracking attendance, estimating a score after negative marking, finding an average, or solving a maths expression, these tools make calculations easier. For personal planning, the Age Calculator Online calculates your age, the Birthday Countdown counts the days until your birthday, the Age Difference Calculator compares two ages, and the Date Difference Calculator finds the time between two dates.</p>
        <p>TopCalcBox also offers tools for health estimates and entertainment. The BMI Calculator estimates body mass index using height and weight, while the Calorie Calculator estimates daily calorie needs based on personal details and activity level. These results are general estimates, not medical advice. The Love Calculator adds a little fun by generating a playful compatibility result, not a scientific prediction of a relationship. With all 25 free online calculators in one place, TopCalcBox helps students, shoppers, families, and business owners solve common calculation problems without complicated formulas. Simply choose a tool, enter your values, and get a result to help with your next decision.</p>
        
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Our Goal</h2>
        <p>Our goal is to build a reliable collection of useful online calculators that people can use whenever they need a quick calculation.</p>
        <p>We are continuously working to improve TopCalcBox and add more helpful tools based on everyday needs.</p>
        <p>Thank you for visiting TopCalcBox. We hope our calculators make your daily calculations a little easier.</p>
      </div>
    </div>
  );
}
