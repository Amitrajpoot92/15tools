import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | TopCalcBox",
};

export default function Page() {
  return (
    <div className="pb-0 max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Terms & Conditions</h1>
          <p className="text-slate-400 mt-2 text-sm">Last Updated: September 17, 2026</p>
        </div>
      </div>
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm text-slate-600 space-y-6 text-sm md:text-base leading-relaxed mb-4">
        <p>Welcome to TopCalcBox. By using our website and calculators, you agree to the terms mentioned below. Please read them carefully before using the website.</p>
        
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">1. USING TOPCALCBOX</h2>
          <p>TopCalcBox provides free online calculators and other useful tools for everyday calculations. You can use the website for personal and general informational purposes. Please use the calculators responsibly and do not use the website for any illegal or unauthorised activity.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">2. CALCULATOR RESULTS</h2>
          <p>We try to make our calculators as accurate as possible. However, calculator results may sometimes vary because of the values entered, rounding methods, formulas, or other technical reasons. The results provided by TopCalcBox should be used as general information and should not be treated as professional financial, medical, legal, tax, or other expert advice. For important decisions, please verify the result with a qualified professional or an appropriate official source.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">3. USER INPUTS</h2>
          <p>You are responsible for the information and numbers you enter into our calculators. Please check your inputs before relying on any result. Do not enter passwords, bank details, or other highly sensitive personal information into the calculators.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">4. WEBSITE AVAILABILITY</h2>
          <p>We try to keep TopCalcBox available and working properly, but we cannot guarantee that the website or any particular calculator will always be available. The website may occasionally be unavailable because of maintenance, technical problems, updates, hosting issues, or other reasons.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">5. CHANGES TO THE WEBSITE</h2>
          <p>We may add, remove, update, or change calculators, features, content, or other parts of TopCalcBox at any time. We may also make changes to improve the website and user experience.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">6. THIRD-PARTY SERVICES AND ADVERTISEMENTS</h2>
          <p>TopCalcBox may use third-party services, including analytics tools, advertising services, or other external services. These third-party services may have their own terms and privacy policies. We are not responsible for the policies or practices of third-party websites and services.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">7. INTELLECTUAL PROPERTY</h2>
          <p>The content, design, branding, text, graphics, and original materials available on TopCalcBox belong to TopCalcBox or are used with permission. You may use the calculators for their intended purpose, but you should not copy, reproduce, modify, republish, or distribute our website content or design without permission.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">8. LIMITATION OF LIABILITY</h2>
          <p>TopCalcBox is provided on an "as is" and "as available" basis. We are not responsible for any loss, damage, or problem that may result from using or relying on information, calculator results, or other content available on the website. You are responsible for checking important calculations and information before using them for financial, business, medical, tax, or other important decisions.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">9. CHANGES TO THESE TERMS</h2>
          <p>We may update these Terms & Conditions from time to time when our website, features, or services change. Any changes will be posted on this page along with an updated date.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">10. CONTACT US</h2>
          <p>If you have any questions about these Terms & Conditions, you can contact us at:</p>
          <p className="mt-1 font-bold text-orange-600">Email: help.rka@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
