import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | TopCalcBox",
};

export default function Page() {
  return (
    <div className="pb-0 max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Contact Us</h1>
          <p className="text-orange-200 mt-2 font-medium">We’d Love to Hear From You</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Contact Info */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm text-slate-600 flex flex-col">
          <p className="mb-6 text-sm md:text-base leading-relaxed">Have a question, suggestion, or found something that needs to be fixed on TopCalcBox? Feel free to get in touch with us. Your feedback helps us improve our calculators and make the website more useful and easier to use.</p>
          
          <h2 className="text-lg font-bold text-slate-900 mb-3">GET IN TOUCH</h2>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4 mb-6">
            <div className="bg-white p-3 rounded-full text-orange-500 shadow-sm"><Mail className="w-5 h-5"/></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Us</p>
              <a href="mailto:help.rka@gmail.com" className="text-slate-800 font-bold hover:text-orange-600 transition-colors">help.rka@gmail.com</a>
            </div>
          </div>



          <div className="mt-auto bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h3 className="font-bold text-orange-800 mb-1">WE’RE HERE TO HELP</h3>
            <p className="text-xs text-orange-700">We read every genuine message and will try our best to get back to you as soon as possible. Thank you for using TopCalcBox.</p>
          </div>
        </div>

        {/* Direct Email Prompt */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm text-slate-600 flex flex-col">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6 uppercase tracking-wider">HOW CAN WE HELP?</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Calculator Error</h3>
              <p className="text-sm mt-0.5">Report an incorrect result or calculation</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Suggest a Calculator</h3>
              <p className="text-sm mt-0.5">Recommend a useful new calculator</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Website Feedback</h3>
              <p className="text-sm mt-0.5">Share your ideas or suggestions</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Technical Problem</h3>
              <p className="text-sm mt-0.5">Report a bug or website issue</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Calculator Question</h3>
              <p className="text-sm mt-0.5">Ask us about our calculators</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Business and Partnerships</h3>
              <p className="text-sm mt-0.5 leading-relaxed">Interested in a business partnership, collaboration, or professional opportunity? Tell us about your idea, and let’s explore how we can work together.</p>
            </div>
            <div className="pt-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 bg-orange-50 inline-flex px-3 py-1 rounded-lg border border-orange-100 mb-1.5"><span className="text-base">📢</span> Advertise With Us</h3>
              <p className="text-sm mt-0.5 leading-relaxed">Promote your product, service, app, or brand and connect with our website audience through advertising and promotional opportunities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
