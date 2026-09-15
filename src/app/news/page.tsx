import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "News | TopCalcBox",
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
            News
          </h1>
        </div>
      </div>
      <SEOContent>

        <h2>Latest Updates and Tool Releases</h2>
        <p>
          Stay up to date with everything happening at <strong>TopCalcBox</strong>. Our News page is where we announce brand new calculator releases, major platform updates, and new features designed to improve your experience.
        </p>
        <p>
          Our development team is constantly working behind the scenes to optimize calculation speeds, introduce new mathematical formulas, and ensure that our platform remains completely free and accessible to users across the globe.
        </p>
        <h2>Recent Announcements</h2>
        <div className="space-y-4 mt-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900 m-0">Platform Redesign Launched</h3>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">New</span>
            </div>
            <p className="text-slate-600 text-sm">We've completely overhauled the TopCalcBox UI! Experience a faster, sleeker, and more premium dark-mode interface across all 15 of our core calculators.</p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900 m-0">Mobile App Installation Added</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Feature</span>
            </div>
            <p className="text-slate-600 text-sm">You can now install TopCalcBox directly to your smartphone's home screen as a Progressive Web App (PWA) for instant access to all tools offline.</p>
          </div>
        </div>

      </SEOContent>
    </div>
  );
}
