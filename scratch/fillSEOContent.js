const fs = require('fs');
const path = require('path');

const srcApp = path.join(process.cwd(), 'src/app');

function replaceContent(dir, newContent) {
  const pagePath = path.join(srcApp, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Replace everything inside <SEOContent>...</SEOContent>
    // Note: [\s\S]* matches across multiple lines.
    const regex = /<SEOContent>([\s\S]*?)<\/SEOContent>/;
    
    if (regex.test(content)) {
      content = content.replace(regex, `<SEOContent>\n${newContent}\n      </SEOContent>`);
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Updated ${dir}/page.tsx`);
    } else {
      console.log(`Failed to find <SEOContent> in ${dir}/page.tsx`);
    }
  }
}

// 1. About Us
replaceContent('about', `
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
`);

// 2. Privacy Policy
replaceContent('privacy-policy', `
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
`);

// 3. Terms and Conditions
replaceContent('terms-and-conditions', `
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using <strong>TopCalcBox</strong> (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>
        <h2>2. Informational Purposes Only</h2>
        <p>
          All calculations, tools, and content provided on TopCalcBox are strictly for informational and educational purposes. While we strive for accuracy, the results generated by our calculators should not be considered professional financial, legal, or medical advice. We do not guarantee the absolute accuracy or applicability of the results to your specific situation.
        </p>
        <h2>3. User Responsibilities</h2>
        <p>
          You agree to use TopCalcBox for lawful purposes only. You must not use our platform in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
        </p>
        <h2>4. Intellectual Property Rights</h2>
        <p>
          Unless otherwise stated, TopCalcBox and/or its licensors own the intellectual property rights for all material on the Website. All intellectual property rights are reserved. You may view and/or print pages from the Website for your own personal use subject to restrictions set in these terms and conditions.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall TopCalcBox, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website. We shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of our calculators.
        </p>
`);

// 4. Disclaimer
replaceContent('disclaimer', `
        <h2>General Disclaimer</h2>
        <p>
          The information and calculator tools provided by <strong>TopCalcBox</strong> are for general informational, educational, and entertainment purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or mathematical output on the site.
        </p>
        <h2>Financial Disclaimer</h2>
        <p>
          Calculators related to finance (such as Profit, Loss, Margin, Discount, or Tax calculators) are estimates designed to give you a general idea of your financial scenario. They do not constitute professional financial advice. Always consult with a certified financial advisor, accountant, or tax professional before making any significant financial decisions. TopCalcBox is not responsible for any financial losses or damages resulting from the use of our tools.
        </p>
        <h2>Medical/Health Disclaimer</h2>
        <p>
          Any tools related to health, fitness, or biology (such as Age calculators or future health tools) are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read or calculated on this Website.
        </p>
        <h2>Errors and Omissions</h2>
        <p>
          While we have made every attempt to ensure that the mathematical formulas powering our calculators are accurate, TopCalcBox is not responsible for any errors or omissions, or for the results obtained from the use of this information. All results are provided "as is", with no guarantee of completeness or accuracy.
        </p>
`);

// 5. Blog
replaceContent('blog', `
        <h2>Welcome to the TopCalcBox Blog</h2>
        <p>
          Welcome to the official blog of <strong>TopCalcBox</strong>! This space is dedicated to providing you with in-depth articles, tutorials, and mathematical tips to help you make the most out of your daily life and our calculator tools.
        </p>
        <p>
          Whether you are looking to understand the complex formulas behind profit margins, want to learn how to quickly calculate discounts in your head while shopping, or simply want to read about the history of mathematics and timekeeping, our blog is your go-to resource.
        </p>
        <h2>What to Expect</h2>
        <ul>
          <li><strong>Tutorials:</strong> Step-by-step guides on how to use our advanced calculators for complex scenarios.</li>
          <li><strong>Financial Tips:</strong> Articles designed to help you understand interest, margins, and taxes.</li>
          <li><strong>Educational Content:</strong> Helpful resources for students and teachers covering syllabus-based mathematical concepts.</li>
        </ul>
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center">
          <p className="text-slate-600 font-medium mb-0">Our editorial team is currently drafting high-quality articles. Check back soon for our first official post!</p>
        </div>
`);

// 6. News
replaceContent('news', `
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
`);

// Contact is already okay, but we'll add a bit of intro SEO.
replaceContent('contact', `
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
`);
