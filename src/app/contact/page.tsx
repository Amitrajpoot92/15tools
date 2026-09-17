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

        {/* Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            SEND US A MESSAGE
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</label>
              <input type="text" placeholder="Enter your name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
              <input type="email" placeholder="Enter your email address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Subject</label>
              <input type="text" placeholder="Enter your subject" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Message</label>
              <textarea placeholder="Write your message here" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"></textarea>
            </div>
            <button type="button" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-md mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
