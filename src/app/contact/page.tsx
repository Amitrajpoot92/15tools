import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | TopCalcBox",
  description: "Get in touch with the TopCalcBox team.",
};

export default function Page() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Contact Us
        </h1>
      </div>
      <SEOContent>
        <h2>We'd love to hear from you</h2>
        <p>If you have any questions, feedback, or suggestions for new calculators, please don't hesitate to reach out.</p>
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
            <div className="p-4 bg-orange-50 rounded-full mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Email Us</h2>
            <p className="text-slate-500 mb-4">
              Send us an email directly and we'll get back to you within 24 hours.
            </p>
            <a href="mailto:help.rka@gmail.com" className="text-orange-600 font-bold hover:underline">
              help.rka@gmail.com
            </a>
          </div>
        </div>
      </SEOContent>
    </div>
  );
}
