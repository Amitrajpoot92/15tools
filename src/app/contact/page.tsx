import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | TopCalcBox",
  description: "Get in touch with the TopCalcBox team.",
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
            Contact Us
          </h1>
        </div>
      </div>
      <SEOContent>

        <h2>We're Here to Help</h2>
        <p>
          At <strong>TopCalcBox</strong>, user satisfaction is our highest priority. Whether you have discovered a bug in one of our mathematical tools, have a suggestion for a brand new calculator, or are interested in a business partnership, we are always eager to hear from you.
        </p>
        <p>
          Your feedback directly shapes the future of our platform. We read every single email and strive to respond to all inquiries within 24 to 48 hours.
        </p>
        <div className="mt-10 max-w-md mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center">
            <div className="p-4 bg-orange-50 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-600"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 !mt-0">Email Us Directly</h2>
            <p className="text-slate-500 mb-6">
              Drop us a line anytime. We usually respond within a business day.
            </p>
            <a href="mailto:help.rka@gmail.com" className="text-lg text-white font-bold bg-slate-900 px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-md w-full">
              help.rka@gmail.com
            </a>
          </div>
        </div>

      </SEOContent>
    </div>
  );
}
