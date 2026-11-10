import Link from "next/link";
import {
  Sparkles,
  Banknote,
  Calculator,
  CalendarDays,
  ShoppingCart,
  Heart,
} from "lucide-react";

const LINK_CLS =
  "font-bold text-slate-900 hover:text-orange-600 underline decoration-orange-300/80 hover:decoration-orange-500 underline-offset-2 transition-colors";

interface GuideCardConfig {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  cardClass: string;
  iconBoxClass: string;
  badgeClass: string;
  spanFull?: boolean;
  content: React.ReactNode;
}

const GUIDE_CARDS: GuideCardConfig[] = [
  {
    id: "finance",
    title: "Finance & Money Calculators",
    badge: "8 Tools",
    icon: Banknote,
    cardClass:
      "bg-gradient-to-br from-orange-50/60 via-white to-white border-orange-200/80 border-l-4 border-l-[#F97316]",
    iconBoxClass: "bg-orange-100 text-[#EA580C]",
    badgeClass: "bg-orange-100/80 text-orange-800 border-orange-200/70",
    content: (
      <>
        Money decisions are faster when you can check the numbers instantly. The{" "}
        <Link href="/percentage-calculator" className={LINK_CLS}>
          percentage calculator online free
        </Link>{" "}
        finds a percentage of any number, a percentage increase, or a percentage
        decrease, which is useful for marks, price hikes, and savings. During a
        sale, the{" "}
        <Link href="/discount-calculator" className={LINK_CLS}>
          discount calculator for shopping
        </Link>{" "}
        shows the final price and the amount you save, so you can judge whether
        an offer is really worth it. Shopkeepers and buyers can use the{" "}
        <Link href="/gst-calculator" className={LINK_CLS}>
          GST calculator online in India
        </Link>{" "}
        to work out the GST amount and the total bill without manual math. Small
        business owners can rely on the{" "}
        <Link href="/profit-and-loss-calculator" className={LINK_CLS}>
          profit and loss calculator for small business
        </Link>{" "}
        to see whether a sale made a profit or a loss, while the{" "}
        <Link href="/wholesale-price-calculator" className={LINK_CLS}>
          wholesale price calculator for bulk buying
        </Link>{" "}
        helps compare bulk rates and set a fair selling price. Planning a loan?
        The{" "}
        <Link href="/emi-calculator" className={LINK_CLS}>
          EMI calculator for home loan, car loan, and personal loan
        </Link>{" "}
        estimates your{" "}
        <strong className="font-bold text-slate-900">monthly loan EMI</strong>{" "}
        from the loan amount, interest rate, and period. For long-term goals,
        the{" "}
        <Link href="/sip-calculator" className={LINK_CLS}>
          SIP calculator for monthly investment
        </Link>{" "}
        gives an estimate of how regular savings may grow, though returns are
        never guaranteed. Finally, the{" "}
        <Link href="/subscription-cost-calculator" className={LINK_CLS}>
          subscription cost calculator for monthly and yearly expenses
        </Link>{" "}
        turns small recurring payments into a clear yearly total, so you can
        cancel plans you no longer use.
      </>
    ),
  },
  {
    id: "math",
    title: "Math & Education Calculators",
    badge: "5 Tools",
    icon: Calculator,
    cardClass:
      "bg-gradient-to-br from-blue-50/60 via-white to-white border-blue-200/80 border-l-4 border-l-[#3B82F6]",
    iconBoxClass: "bg-blue-100 text-[#2563EB]",
    badgeClass: "bg-blue-100/80 text-blue-800 border-blue-200/70",
    content: (
      <>
        Students need quick and accurate answers, especially in exam season.
        The{" "}
        <Link href="/marks-percentage-calculator" className={LINK_CLS}>
          marks percentage calculator for students
        </Link>{" "}
        helps you{" "}
        <strong className="font-bold text-slate-900">
          calculate exam percentage
        </strong>{" "}
        from your obtained marks and total marks, and the{" "}
        <Link href="/attendance-percentage-calculator" className={LINK_CLS}>
          attendance percentage calculator for college and school
        </Link>{" "}
        shows whether you meet the minimum attendance your institution requires.
        In exams with penalties, the{" "}
        <Link href="/negative-marking-calculator" className={LINK_CLS}>
          negative marking calculator for competitive exams
        </Link>{" "}
        estimates your final score after marks are deducted for wrong answers,
        which is very helpful in mock tests and practice papers. The{" "}
        <Link href="/average-calculator" className={LINK_CLS}>
          average calculator for marks and numbers
        </Link>{" "}
        finds the mean of any list of values, such as test scores or monthly
        expenses. For maths problems, the{" "}
        <Link href="/bodmas-calculator" className={LINK_CLS}>
          BODMAS calculator online for maths expressions
        </Link>{" "}
        solves brackets, division, multiplication, addition, and subtraction in
        the correct order, so you can verify your answers and avoid common
        mistakes. Teachers and parents can use these tools to check results
        quickly, and students can practise by changing the numbers and watching
        how the answer changes. Because each tool does one job clearly, you save
        time during revision and focus on learning instead of manual
        calculation.
      </>
    ),
  },
  {
    id: "date",
    title: "Date & Age Calculators",
    badge: "4 Tools",
    icon: CalendarDays,
    cardClass:
      "bg-gradient-to-br from-cyan-50/60 via-white to-white border-cyan-200/80 border-l-4 border-l-[#00B4D8]",
    iconBoxClass: "bg-cyan-100 text-[#0096C7]",
    badgeClass: "bg-cyan-100/80 text-cyan-800 border-cyan-200/70",
    content: (
      <>
        Dates and ages matter more often than we think, from forms and
        applications to travel and celebrations. The{" "}
        <Link href="/age-calculator-online" className={LINK_CLS}>
          age calculator by date of birth
        </Link>{" "}
        shows your exact age in years, months, and days, which is useful for
        eligibility checks and official forms. The{" "}
        <Link href="/birthday-countdown" className={LINK_CLS}>
          birthday countdown calculator
        </Link>{" "}
        tells you how many days are left until the next birthday, making it easy
        to plan surprises and parties. To compare two people, the{" "}
        <Link href="/age-difference-calculator" className={LINK_CLS}>
          age difference calculator between two people
        </Link>{" "}
        shows the gap between their ages, which is popular among families,
        couples, and friends. The{" "}
        <Link href="/date-difference-calculator" className={LINK_CLS}>
          date difference calculator to find days between two dates
        </Link>{" "}
        helps you track deadlines, trips, project timelines, and important
        events without counting on a calendar. These tools are simple to use:
        enter the dates, and the answer appears instantly. Whether you are a
        student, a job seeker, a parent, or a professional planning your
        schedule, they give clear results without confusion.
      </>
    ),
  },
  {
    id: "shopping",
    title: "Shopping & Daily Life Calculators",
    badge: "6 Tools",
    icon: ShoppingCart,
    cardClass:
      "bg-gradient-to-br from-teal-50/60 via-white to-white border-teal-200/80 border-l-4 border-l-[#0D9488]",
    iconBoxClass: "bg-teal-100 text-[#0F766E]",
    badgeClass: "bg-teal-100/80 text-teal-800 border-teal-200/70",
    content: (
      <>
        Small savings add up when you compare prices carefully. The{" "}
        <Link href="/cost-per-item-calculator" className={LINK_CLS}>
          cost per item calculator to compare prices
        </Link>{" "}
        divides the total price by the number of pieces, so you can see which
        pack gives better value. When products come in different weights, the{" "}
        <Link href="/price-per-kg-calculator" className={LINK_CLS}>
          price per kg calculator to find the best price
        </Link>{" "}
        makes the comparison fair for fruits, vegetables, grains, and packaged
        food. Before you reach the billing counter, the{" "}
        <Link href="/grocery-bill-calculator" className={LINK_CLS}>
          grocery bill calculator online
        </Link>{" "}
        helps you add up your items and keep your{" "}
        <strong className="font-bold text-slate-900">
          monthly grocery budget
        </strong>{" "}
        under control. Eating out with friends? The{" "}
        <Link href="/tip-calculator" className={LINK_CLS}>
          tip calculator to split a restaurant bill
        </Link>{" "}
        works out the tip and each person’s share in seconds. Planning a drive?
        The{" "}
        <Link href="/fuel-cost-calculator" className={LINK_CLS}>
          fuel cost calculator for a road trip
        </Link>{" "}
        estimates your travel expense from the distance, mileage, and fuel
        price, so you can set a trip budget before you start. This category also
        includes the{" "}
        <Link href="/love-calculator" className={LINK_CLS}>
          love calculator for fun
        </Link>
        , which creates a playful compatibility result for entertainment only,
        not as a scientific prediction of any relationship.
      </>
    ),
  },
  {
    id: "health",
    title: "Health & Fitness Calculators",
    badge: "2 Tools",
    icon: Heart,
    cardClass:
      "bg-gradient-to-br from-rose-50/60 via-white to-white border-rose-200/80 border-l-4 border-l-[#F43F5E]",
    iconBoxClass: "bg-rose-100 text-[#E11D48]",
    badgeClass: "bg-rose-100/80 text-rose-800 border-rose-200/70",
    spanFull: true,
    content: (
      <>
        Health tools work best when they are simple and clear. The{" "}
        <Link href="/bmi-calculator" className={LINK_CLS}>
          BMI calculator by height and weight
        </Link>{" "}
        gives a quick body mass index estimate, which shows whether your weight
        falls in a general range for your height. The{" "}
        <Link href="/calorie-calculator" className={LINK_CLS}>
          daily calorie calculator
        </Link>{" "}
        estimates your calorie needs from your personal details and activity
        level, which can help you understand how much energy your body may need
        in a day. Please remember that these results are general estimates, not
        medical advice, and BMI does not measure body fat or overall health. For
        personal guidance, diet plans, or medical concerns, always talk to a
        doctor or a qualified health professional.
      </>
    ),
  },
];

export function HomeGuideSection() {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 md:p-7 border-2 border-[#fed7aa]/70 shadow-md shadow-orange-500/5 relative overflow-hidden">
      {/* Subtle Corner Accent */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-56 h-56 bg-gradient-to-br from-amber-300/15 to-orange-400/10 rounded-full blur-2xl pointer-events-none"
      />

      <div className="relative z-10">
        {/* Header & Intro */}
        <div className="mb-5">
          <div className="inline-flex items-center space-x-1.5 bg-[#fff6ea] text-[#c25e00] px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-2.5 border border-[#fde4c3] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>ALL-IN-ONE GUIDE</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 leading-tight">
            Why <span className="text-[#ff5400]">TopCalcBox</span> Is Your
            Ultimate Hub for Everyday Calculations
          </h2>

          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-4xl font-normal">
            TopCalcBox brings 25{" "}
            <strong className="font-bold text-slate-900">
              free online calculators
            </strong>{" "}
            into one simple website, arranged in five easy categories so you can
            find the right tool in seconds. Every calculator is 100% free, needs
            no login, works on mobile and desktop, and gives instant results.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {GUIDE_CARDS.map((card) => {
            const IconComp = card.icon;
            return (
              <article
                key={card.id}
                className={`rounded-2xl border p-4 sm:p-5 shadow-xs hover:shadow-sm transition-shadow ${card.cardClass} ${
                  card.spanFull ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-200/60">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.iconBoxClass}`}
                    >
                      <IconComp className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug truncate">
                      {card.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 uppercase tracking-wide ${card.badgeClass}`}
                  >
                    {card.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                  {card.content}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

