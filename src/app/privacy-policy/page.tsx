import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TopCalcBox",
  alternates: {
    canonical: "https://topcalcbox.com/privacy-policy",
  },
};

export default function Page() {
  return (
    <div className="pb-0 max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 mt-2 text-sm">Last Updated: November 29, 2026</p>
        </div>
      </div>
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm text-slate-600 space-y-6 text-sm md:text-base leading-relaxed mb-4">
        <p>At TopCalcBox, we respect your privacy. We have created our calculators to be simple and easy to use, without asking you to create an account.</p>
        <p>This Privacy Policy explains what information may be collected when you visit TopCalcBox and how that information may be used.</p>
        
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">1. INFORMATION WE COLLECT</h2>
          <p>You can use most of the features on TopCalcBox without giving us your name, phone number, or other personal details. If you contact us, we may receive the information you choose to provide, such as your name, email address, and message. We may also receive basic technical information about your device and browser when you visit our website.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">2. HOW OUR CALCULATORS HANDLE YOUR INPUTS</h2>
          <p>Our calculators may ask you to enter numbers, dates, prices, or other values. Where a calculator works directly in your browser, the calculation is performed on your device rather than being sent to our server. For your own privacy, please do not enter passwords, bank details, or other sensitive information into any calculator.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">3. COOKIES AND ANALYTICS</h2>
          <p>TopCalcBox may use cookies and analytics tools to understand how visitors use the website and to improve our calculators and website experience. These tools may collect basic information such as the pages you visit, your device type, browser, and general website activity. The exact information collected depends on the services enabled on the website.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">4. ADVERTISEMENTS AND THIRD-PARTY SERVICES</h2>
          <p>TopCalcBox may show advertisements or use services provided by other companies. These companies may use cookies or similar technologies to display, measure, or improve advertisements and services. Third-party services have their own privacy policies, and their handling of information is governed by their respective policies.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">5. PROTECTING YOUR INFORMATION</h2>
          <p>We take reasonable steps to protect the information that we receive through our website. However, no website or online service can guarantee complete security of information.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">6. CHILDREN'S PRIVACY</h2>
          <p>TopCalcBox is a general-purpose website and is not specifically directed at children. We do not knowingly collect personal information from children. If you believe that a child has provided personal information to us, please contact us.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">7. CHANGES TO THIS POLICY</h2>
          <p>We may update this Privacy Policy when our website, features, or services change. Whenever we make an important change, we will update the date shown at the top of this page.</p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">8. TOPCALCBOX ANDROID APP</h2>
          <p className="mb-2">
            The TopCalcBox app for Android does not need an account. Your calculations, history, favorites, profile name and photo stay on your phone and are never sent to us.
          </p>
          <p className="mb-2">
            The free app shows ads from Google AdMob (Google LLC). To show ads, limit how often you see them and prevent fraud, Google&apos;s ads SDK collects your device&apos;s advertising ID, device and app information (such as model, Android version, language and app version), your IP address (which gives an approximate location), how you interact with the ads, and crash and diagnostic data. This information is collected and used by Google under its own policy:{" "}
            <a 
              href="https://policies.google.com/technologies/partner-sites" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-600 hover:underline font-semibold"
            >
              https://policies.google.com/technologies/partner-sites
            </a>
          </p>
          <p className="mb-2">
            You can reset or delete your advertising ID, or turn off personalised ads, in your phone&apos;s Settings (Google &rsaquo; Ads). In the European Economic Area, the UK and Switzerland the app first asks for your consent, and you can change it in the app under Account &rsaquo; Ad privacy choices.
          </p>
          <p>
            The app does not use your microphone, precise location, contacts or camera.
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-1">9. CONTACT US</h2>
          <p>If you have any questions about this Privacy Policy or the way TopCalcBox handles information, you can contact us at:</p>
          <p className="mt-1 font-bold text-orange-600">Email: help.rka@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
