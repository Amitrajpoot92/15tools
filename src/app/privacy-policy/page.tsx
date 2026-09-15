import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Privacy Policy | TopCalcBox",
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
            Privacy Policy
          </h1>
        </div>
      </div>
      <SEOContent>

        <h2>Introduction</h2>
        <p>
          At <strong>TopCalcBox</strong>, the privacy of our visitors is of extreme importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by TopCalcBox and how it is used. By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
        <h2>Data Collection and Usage</h2>
        <p>
          <strong>No Data Storage of Calculations:</strong> We want to assure you that any numbers, dates, or financial figures you enter into our calculators are processed locally in your web browser using JavaScript. We <em>do not</em> store, transmit, or record any of the personal inputs you type into our calculators on our servers.
        </p>
        <h2>Log Files</h2>
        <p>
          Like many other web sites, TopCalcBox makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
        </p>
        <h2>Cookies and Web Beacons</h2>
        <p>
          TopCalcBox may use cookies to store information about visitors' preferences, record user-specific information on which pages the user access or visit, and customize web page content based on visitors' browser type or other information that the visitor sends via their browser.
        </p>
        <h2>Third-Party Advertising</h2>
        <p>
          We may use third-party advertising companies to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>
        <h2>Consent</h2>
        <p>
          By using our website, you hereby consent to our privacy policy and agree to its terms. If you require any more information or have any questions about our privacy policy, please feel free to contact us.
        </p>

      </SEOContent>
    </div>
  );
}
