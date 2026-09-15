import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Disclaimer | TopCalcBox",
  description: "Disclaimer for TopCalcBox.",
};

export default function Page() {
  return (
    <div className="pb-8">
      {/* Compact Premium Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-8 mt-2 shadow-xl border border-slate-800 text-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Disclaimer
          </h1>
        </div>
      </div>
      <SEOContent>

        <h2>General Disclaimer</h2>
        <p>
          The information and calculator tools provided by <strong>TopCalcBox</strong> are for general informational, educational, and entertainment purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or mathematical output on the site.
        </p>
        <h2>Financial Disclaimer</h2>
        <p>
          Calculators related to finance (such as Profit, Loss, Margin, Discount, or Tax calculators) are estimates designed to give you a general idea of your financial scenario. They do not constitute professional financial advice. Always consult with a certified financial advisor, accountant, or tax professional before making any significant financial decisions. TopCalcBox is not responsible for any financial losses or damages resulting from the use of our tools.
        </p>
        <h2>Medical/Health Disclaimer</h2>
        <p>
          Any tools related to health, fitness, or biology (such as Age calculators or future health tools) are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read or calculated on this Website.
        </p>
        <h2>Errors and Omissions</h2>
        <p>
          While we have made every attempt to ensure that the mathematical formulas powering our calculators are accurate, TopCalcBox is not responsible for any errors or omissions, or for the results obtained from the use of this information. All results are provided "as is", with no guarantee of completeness or accuracy.
        </p>

      </SEOContent>
    </div>
  );
}
