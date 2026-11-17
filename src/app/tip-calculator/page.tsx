import type { Metadata } from "next";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "Tip Calculator Online – Calculate Tips and Split Bills",
  description: "Free online tip calculator. Easily calculate restaurant tips, split the final bill among friends, and see exact per-person costs.",
  alternates: {
    canonical: "https://topcalcbox.com/tip-calculator",
  },
  openGraph: {
    title: "Tip Calculator Online – Calculate Tips and Split Bills",
    description: "Free online tip calculator. Easily calculate restaurant tips, split the final bill among friends, and see exact per-person costs.",
    url: "https://topcalcbox.com/tip-calculator",
    type: "website",
  },
};

export default function TipCalculatorPage() {
  return (
    <div className="pb-2 sm:pb-4">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tip Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "BusinessApplication",
            "browserRequirements": "Requires JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        <ToolHeaderBanner
          title="Tip Calculator"
          description="Calculate tip, total bill and amount per person."
          color="orange"
          icon={<Banknote className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <TipCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Tip Calculator</h2>
        <p>
          The <strong>Tip Calculator</strong> on TopCalcBox is an elegant dining gratuity and bill-splitting tool designed to compute customary tip amounts, total dining bills, and individual per-person shares effortlessly. Whether you are enjoying a weekend dinner with friends, hosting a corporate business lunch, ordering food delivery, or traveling abroad where tipping conventions are strictly observed, this calculator takes the awkwardness out of post-meal bill splitting.
        </p>
        <p>
          Tipping norms vary dramatically across cultures. In the United States and Canada, gratuity of 15% to 20% is practically mandatory and constitutes the primary livelihood of waitstaff. In India and the UK, restaurants often append an optional &ldquo;Service Charge,&rdquo; while discretionary tips of 5% to 10% are standard for attentive hospitality. Our calculator adapts to any custom percentage, ensuring transparent, fair payments for both diners and service staff.
        </p>

        <h2>How to Use the Tip Calculator</h2>
        <p>
          Splitting a dining check takes just a few clicks:
        </p>
        <ol>
          <li><strong>Select Preferred Currency:</strong> Choose ₹ (Rupees), $ (USD), or other standard currency formats.</li>
          <li><strong>Enter Food Bill Subtotal:</strong> Input the total food and beverage charge shown on your restaurant check.</li>
          <li><strong>Select or Input Tip Percentage:</strong> Choose standard quick buttons (e.g., <code>10%</code>, <code>15%</code>, <code>18%</code>, <code>20%</code>) or enter a custom rate based on service quality.</li>
          <li><strong>Adjust Number of Diners:</strong> Use the <code>+</code> / <code>&minus;</code> counter to set the number of people sharing the expense equally.</li>
          <li><strong>Review Itemized Split:</strong> The calculator immediately provides:
            <ul>
              <li><strong>Total Tip Amount:</strong> Aggregate gratuity for the waitstaff.</li>
              <li><strong>Grand Total Bill:</strong> Combined cost (Subtotal + Gratuity).</li>
              <li><strong>Tip Per Person:</strong> Each diner&rsquo;s individual contribution to the server&rsquo;s tip.</li>
              <li><strong>Total Payable Per Person:</strong> The exact amount each diner transfers or pays.</li>
            </ul>
          </li>
          <li><strong>Copy or Reset:</strong> Click &ldquo;Copy Result&rdquo; to send the exact split amount directly into your group chat.</li>
        </ol>

        <h2>Tip Calculation Formulas &amp; Bill-Splitting Mathematics</h2>
        <p>
          The mathematics behind proportional gratuity and per-person allocations:
        </p>

        <h3>1. Total Tip Amount Formula</h3>
        <p>
          <code>Total Gratuity = Bill Subtotal × (Tip Percentage ÷ 100)</code>
        </p>

        <h3>2. Grand Total Bill Formula</h3>
        <p>
          <code>Grand Total = Bill Subtotal + Total Gratuity</code>
        </p>

        <h3>3. Total Payable Per Person Formula</h3>
        <p>
          <code>Share Per Person = Grand Total ÷ Number of Diners</code>
        </p>

        <h3>4. Tip Contribution Per Person Formula</h3>
        <p>
          <code>Tip Per Person = Total Gratuity ÷ Number of Diners</code>
        </p>

        <h2>Practical Real-World Dining Examples</h2>

        <h3>Example 1: Casual Bistro Dinner Split Among 4 Friends</h3>
        <p>
          <strong>Scenario:</strong> 4 friends dine at an Italian cafe in Mumbai. The food bill comes to ₹3,600. The group agrees on a 10% gratuity for great service.
        </p>
        <ul>
          <li><strong>Total Tip:</strong> ₹3,600 × 0.10 = <strong>₹360.00</strong>.</li>
          <li><strong>Grand Total:</strong> ₹3,600 + ₹360 = <strong>₹3,960.00</strong>.</li>
          <li><strong>Per Person Total Share:</strong> ₹3,960 ÷ 4 = <strong>₹990.00 each</strong>.</li>
          <li><strong>Tip Component Per Person:</strong> ₹360 ÷ 4 = <strong>₹90.00 each</strong>.</li>
        </ul>

        <h3>Example 2: Corporate Executive Team Dinner</h3>
        <p>
          <strong>Scenario:</strong> A team of 6 colleagues celebrates a project launch. The restaurant invoice is ₹16,500. They allocate a 15% tip.
        </p>
        <ul>
          <li><strong>Total Tip:</strong> ₹16,500 × 0.15 = <strong>₹2,475.00</strong>.</li>
          <li><strong>Grand Total:</strong> ₹16,500 + ₹2,475 = <strong>₹18,975.00</strong>.</li>
          <li><strong>Per Person Share:</strong> ₹18,975 ÷ 6 = <strong>₹3,162.50 each</strong>.</li>
        </ul>

        <h3>Example 3: International Travel in New York (US Gratuity)</h3>
        <p>
          <strong>Scenario:</strong> Two tourists order dinner at a Manhattan steakhouse. The subtotal is $120.00. Standard US tipping standard of 18% is applied.
        </p>
        <ul>
          <li><strong>Gratuity:</strong> $120.00 × 0.18 = <strong>$21.60</strong>.</li>
          <li><strong>Total Bill:</strong> $120.00 + $21.60 = <strong>$141.60</strong>.</li>
          <li><strong>Each Diner Pays:</strong> $141.60 ÷ 2 = <strong>$70.80</strong>.</li>
        </ul>

        <h3>Example 4: Food Delivery App Rider Gratuity</h3>
        <p>
          <strong>Scenario:</strong> An individual orders late-night groceries or food during heavy rain for ₹650 and wants to add a generous 12% tip for the rider.
        </p>
        <ul>
          <li><strong>Rider Tip:</strong> ₹650 × 0.12 = <strong>₹78.00</strong>.</li>
          <li><strong>Total Deduction:</strong> ₹650 + ₹78 = <strong>₹728.00</strong>.</li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The Tip Calculator is built for anyone dining out or sharing group hospitality costs:
        </p>
        <ul>
          <li><strong>Restaurant Diners &amp; Foodies:</strong> Quickly verify gratuity math and avoid recalculating in front of waitstaff.</li>
          <li><strong>Friends &amp; College Groups:</strong> Split weekend brunch, party, and cafe bills transparently via UPI or Splitwise.</li>
          <li><strong>International Business Travelers:</strong> Navigate unfamiliar tipping etiquette in North America, Europe, or Asia without overpaying or offending staff.</li>
          <li><strong>Event Hosts &amp; Caterers:</strong> Estimate waitstaff service gratuities for private banquets, wedding receptions, and anniversary parties.</li>
          <li><strong>Delivery App Users:</strong> Calculate fair tips for doorstep delivery couriers based on order size and weather conditions.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>

        <h3>1. Is tipping mandatory in Indian restaurants?</h3>
        <p>
          No. In India, tipping is entirely voluntary. Furthermore, the Central Consumer Protection Authority (CCPA) issued guidelines stating that restaurants cannot automatically levy a mandatory &ldquo;Service Charge&rdquo; on bills without consumer consent. If a service charge is already added, you are not obligated to pay an additional cash tip.
        </p>

        <h3>2. What is the difference between Service Charge, Service Tax, and Tipping?</h3>
        <p>
          A <strong>Service Charge</strong> is an internal fee added by the restaurant (usually 5% to 10%) that goes to management and staff. <strong>GST (Goods and Services Tax)</strong> is a government tax (typically 5% for standalone eateries or 18% for luxury hotel dining). A <strong>Tip / Gratuity</strong> is a voluntary personal gift handed directly to your server in recognition of exceptional service.
        </p>

        <h3>3. Should tip percentage be calculated before or after GST?</h3>
        <p>
          Proper dining etiquette dictates calculating gratuity on the <strong>pre-tax subtotal</strong> (the cost of food and drinks alone). You should not tip on government taxes.
        </p>

        <h3>4. What are standard tipping percentages worldwide?</h3>
        <ul>
          <li><strong>United States &amp; Canada:</strong> 15% (fair), 18% (good), 20%+ (exceptional).</li>
          <li><strong>United Kingdom &amp; Europe:</strong> 10% to 12.5% (often included as discretionary service charge).</li>
          <li><strong>India &amp; Southeast Asia:</strong> 5% to 10% for good service (optional).</li>
          <li><strong>Japan:</strong> Tipping is not customary and can sometimes be considered impolite.</li>
        </ul>

        <h3>5. How do we handle uneven bill splits when someone ordered expensive items?</h3>
        <p>
          If one diner ordered an expensive dish (e.g., wine or seafood), have them pay their exact item cost plus their share of tip and tax. The remaining diners can then use the calculator to split the balanced remainder equally.
        </p>

        <h3>6. Can I split the bill among up to 20 or more people?</h3>
        <p>
          Yes. Use the diner counter to adjust the headcount to any party size for group feasts, birthday dinners, and team outings.
        </p>

        <h2>Related Hospitality &amp; Personal Finance Calculators</h2>
        <p>
          Explore these additional budgeting tools to keep your personal expenses organized:
        </p>
        <ul>
          <li><a href="/fuel-cost-calculator" className="text-orange-600 hover:underline font-medium">Fuel Cost Calculator</a> &ndash; Calculate travel fuel costs and divide road trip carpools.</li>
          <li><a href="/grocery-bill-calculator" className="text-orange-600 hover:underline font-medium">Grocery Bill Calculator</a> &ndash; Tally household food baskets and shopping budgets.</li>
          <li><a href="/cost-per-item-calculator" className="text-orange-600 hover:underline font-medium">Cost Per Item Calculator</a> &ndash; Compare bulk multipack unit prices.</li>
          <li><a href="/discount-calculator" className="text-orange-600 hover:underline font-medium">Discount Calculator</a> &ndash; Calculate restaurant promotional deals and dining app discounts.</li>
          <li><a href="/gst-calculator" className="text-orange-600 hover:underline font-medium">GST Calculator</a> &ndash; Verify 5% or 18% restaurant food GST calculations.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
