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

          <h2 className="text-lg font-bold text-slate-900 mb-3">WHAT CAN YOU CONTACT US ABOUT?</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm mb-6">
            <li>Report a calculator error</li>
            <li>Suggest a new calculator</li>
            <li>Share feedback about the website</li>
            <li>Report a technical problem</li>
            <li>Ask a question about our calculators</li>
            <li>Business or partnership enquiries</li>
          </ul>

          <div className="mt-auto bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h3 className="font-bold text-orange-800 mb-1">WE’RE HERE TO HELP</h3>
            <p className="text-xs text-orange-700">We read every genuine message and will try our best to get back to you as soon as possible. Thank you for using TopCalcBox.</p>
          </div>
        </div>

        {/* Direct Email Prompt */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="bg-orange-50 p-5 rounded-full mb-5 border border-orange-100 shadow-inner">
            <MessageSquare className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
            Send Us a Message
          </h2>
          <p className="text-slate-600 mb-8 text-sm md:text-base leading-relaxed max-w-xs">
            Choose how you would like to send us an email. We typically respond within 24 hours.
          </p>
          
          <div className="w-full">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=help.rka@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-orange-600 transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              Open in Gmail
            </a>
          </div>
          
          <div className="mt-8 text-xs font-medium text-slate-400 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
            Or email us manually at: <br/>
            <span className="text-slate-700 font-bold">help.rka@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
