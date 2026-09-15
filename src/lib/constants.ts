import { 
  Calculator, 
  Percent, 
  Tag, 
  Receipt, 
  TrendingUp, 
  TrendingDown, 
  CalendarDays, 
  Timer, 
  Clock, 
  CalendarRange, 
  Banknote, 
  Fuel, 
  GraduationCap, 
  ClipboardCheck, 
  PieChart 
} from "lucide-react";

export type Tool = {
  name: string;
  slug: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

// Premium Orange/Warm Palette:
// - Orange (Vibrant, Energetic)
// - Amber (Warm, Golden)
// - Rose (Premium, Striking)
export const TOOLS: Tool[] = [
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Quickly find the percentage of any number, calculate discounts, or figure out ratio percentages.",
    icon: Percent,
    color: "text-orange-500",
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate how much you'll save during a sale and find the final price instantly.",
    icon: Tag,
    color: "text-amber-500",
  },
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove Goods and Services Tax (GST) from your amounts with ease.",
    icon: Receipt,
    color: "text-rose-500",
  },
  {
    name: "Profit and Loss",
    slug: "profit-and-loss-calculator",
    description: "Determine your profit margins, gross profit, and total loss for your business.",
    icon: TrendingUp,
    color: "text-orange-500",
  },
  {
    name: "Margin Calculator",
    slug: "margin-calculator",
    description: "Find out the selling price, cost, and profit margin for your retail products.",
    icon: PieChart,
    color: "text-amber-500",
  },
  {
    name: "Age Calculator",
    slug: "age-calculator-online",
    description: "Calculate your exact age in years, months, days, and even seconds.",
    icon: CalendarDays,
    color: "text-rose-500",
  },
  {
    name: "Birthday Countdown",
    slug: "birthday-countdown",
    description: "Find out exactly how many days, hours, and minutes are left until your next birthday.",
    icon: Timer,
    color: "text-orange-500",
  },
  {
    name: "Age Difference",
    slug: "age-difference-calculator",
    description: "Compare two dates of birth to find the exact age difference between two people.",
    icon: Clock,
    color: "text-amber-500",
  },
  {
    name: "Date Difference",
    slug: "date-difference-calculator",
    description: "Calculate the exact number of days, weeks, and months between two calendar dates.",
    icon: CalendarRange,
    color: "text-rose-500",
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    description: "Easily calculate the tip amount and split the total bill among friends.",
    icon: Banknote,
    color: "text-orange-500",
  },
  {
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    description: "Estimate the fuel cost for your upcoming road trip based on distance and mileage.",
    icon: Fuel,
    color: "text-amber-500",
  },
  {
    name: "Marks Percentage",
    slug: "marks-percentage-calculator",
    description: "Convert your exam scores and marks into an exact percentage instantly.",
    icon: GraduationCap,
    color: "text-rose-500",
  },
  {
    name: "Attendance Percentage",
    slug: "attendance-percentage-calculator",
    description: "Calculate your current attendance percentage and see how many classes you can skip.",
    icon: ClipboardCheck,
    color: "text-orange-500",
  },
  {
    name: "Negative Marking",
    slug: "negative-marking-calculator",
    description: "Calculate your final score in competitive exams with negative marking rules.",
    icon: TrendingDown,
    color: "text-amber-500",
  },
  {
    name: "Subscription Cost",
    slug: "subscription-cost-calculator",
    description: "Add up all your monthly subscriptions to see your true annual costs.",
    icon: Calculator,
    color: "text-rose-500",
  },
];
