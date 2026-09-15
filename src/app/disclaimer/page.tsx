import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Disclaimer | TopCalcBox",
  description: "Disclaimer for TopCalcBox.",
};

export default function Page() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Disclaimer
        </h1>
      </div>
      <SEOContent>
        <h2>General Disclaimer</h2>
        <p>
          The information and calculations provided on TopCalcBox are for general informational and educational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
        </p>
        <p>
          Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
        
        <h2>Not Professional Advice</h2>
        <p>
          The calculators and tools provided on this platform (including but not limited to financial, health, and academic calculators) do not constitute professional advice. You should consult with an appropriate professional for specific advice tailored to your situation.
        </p>
      </SEOContent>
    </div>
  );
}
