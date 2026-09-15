import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "About | TopCalcBox",
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
            About
          </h1>
        </div>
      </div>
      <SEOContent>

        <h2>Our Mission</h2>
        <p>
          Welcome to <strong>TopCalcBox</strong>, your ultimate destination for fast, precise, and completely free online calculators. Our mission is simple: to make everyday mathematics, financial planning, and time calculations effortless for everyone. Whether you are a student solving percentage problems, a professional calculating profit margins, or a shopper figuring out discount rates, we have the perfect tool for you.
        </p>
        <p>
          We realized that most online calculators are cluttered with ads, confusing to use, or require page reloads. We built TopCalcBox to provide a premium, modern, and lightning-fast experience where calculations happen instantly as you type.
        </p>
        <h2>Why Choose TopCalcBox?</h2>
        <ul>
          <li><strong>100% Free & Accessible:</strong> No subscriptions, no hidden fees, and no sign-ups required.</li>
          <li><strong>Real-Time Results:</strong> Our calculators are built on modern web technologies ensuring that your answers appear instantly.</li>
          <li><strong>Privacy First:</strong> Your calculations are performed entirely in your browser. We do not store or send your personal mathematical inputs to our servers.</li>
          <li><strong>Mobile Optimized:</strong> Use our tools on any device, anywhere. Our responsive design ensures a seamless experience on smartphones, tablets, and desktop computers.</li>
        </ul>
        <h2>Who Can Use Our Tools?</h2>
        <p>
          Our platform is designed for a diverse audience. Students can use our Marks Percentage and Attendance calculators to track academic progress. Business owners can rely on our Margin and Profit calculators to make informed financial decisions. Everyday users will find immense value in our Age, Date, and Discount calculators for daily tasks.
        </p>

      </SEOContent>
    </div>
  );
}
