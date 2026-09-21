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
  PieChart,
  Activity,
  CreditCard,
  LineChart,
  Zap,
  Flame,
  Scale,
  Sigma,
  ShoppingCart,
  Heart
} from "lucide-react";

export type Category = 
  | "FINANCE & MONEY"
  | "MATH & EDUCATION"
  | "DATE & AGE"
  | "SHOPPING & DAILY LIFE"
  | "HEALTH & FITNESS"
  | "FUN & LIFESTYLE";

export type Tool = {
  name: string;
  slug: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: Category;
};

// Premium Orange/Warm Palette:
// - Orange (Vibrant, Energetic)
// - Amber (Warm, Golden)
// - Rose (Premium, Striking)
export const TOOLS: Tool[] = [
  // FINANCE & MONEY
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Quickly find the percentage of any number, calculate discounts, or figure out ratio percentages.",
    icon: Percent,
    color: "text-orange-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate how much you'll save during a sale and find the final price instantly.",
    icon: Tag,
    color: "text-amber-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove Goods and Services Tax (GST) from your amounts with ease.",
    icon: Receipt,
    color: "text-rose-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "Profit and Loss Calculator",
    slug: "profit-and-loss-calculator",
    description: "Determine your profit margins, gross profit, and total loss for your business.",
    icon: TrendingUp,
    color: "text-orange-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "Wholesale Calculator",
    slug: "wholesale-calculator",
    description: "Find out the selling price, cost, and profit margin for your retail products.",
    icon: PieChart,
    color: "text-amber-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    description: "Plan your loans by calculating Equated Monthly Installments and interest.",
    icon: CreditCard,
    color: "text-amber-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "SIP Calculator",
    slug: "sip-calculator",
    description: "Calculate your wealth growth and expected returns for Mutual Fund SIPs.",
    icon: LineChart,
    color: "text-rose-500",
    category: "FINANCE & MONEY"
  },
  {
    name: "Subscription Cost Calculator",
    slug: "subscription-cost-calculator",
    description: "Add up all your monthly subscriptions to see your true annual costs.",
    icon: Calculator,
    color: "text-rose-500",
    category: "FINANCE & MONEY"
  },

  // MATH & EDUCATION
  {
    name: "Marks Percentage Calculator",
    slug: "marks-percentage-calculator",
    description: "Convert your exam scores and marks into an exact percentage instantly.",
    icon: GraduationCap,
    color: "text-rose-500",
    category: "MATH & EDUCATION"
  },
  {
    name: "Attendance Percentage Calculator",
    slug: "attendance-percentage-calculator",
    description: "Calculate your current attendance percentage and see how many classes you can skip.",
    icon: ClipboardCheck,
    color: "text-orange-500",
    category: "MATH & EDUCATION"
  },
  {
    name: "Negative Marking Calculator",
    slug: "negative-marking-calculator",
    description: "Calculate your final score in competitive exams with negative marking rules.",
    icon: TrendingDown,
    color: "text-amber-500",
    category: "MATH & EDUCATION"
  },
  {
    name: "Average Calculator",
    slug: "average-calculator",
    description: "Find the mean, median, mode, and range for any set of numbers.",
    icon: Sigma,
    color: "text-orange-500",
    category: "MATH & EDUCATION"
  },
  {
    name: "BODMAS Calculator",
    slug: "bodmas-calculator",
    description: "Solve complex math expressions automatically using exact BODMAS rules.",
    icon: Calculator,
    color: "text-amber-500",
    category: "MATH & EDUCATION"
  },

  // DATE & AGE
  {
    name: "Age Calculator Online",
    slug: "age-calculator-online",
    description: "Calculate your exact age in years, months, days, and even seconds.",
    icon: CalendarDays,
    color: "text-rose-500",
    category: "DATE & AGE"
  },
  {
    name: "Birthday Countdown",
    slug: "birthday-countdown",
    description: "Find out exactly how many days, hours, and minutes are left until your next birthday.",
    icon: Timer,
    color: "text-orange-500",
    category: "DATE & AGE"
  },
  {
    name: "Age Difference Calculator",
    slug: "age-difference-calculator",
    description: "Compare two dates of birth to find the exact age difference between two people.",
    icon: Clock,
    color: "text-amber-500",
    category: "DATE & AGE"
  },
  {
    name: "Date Difference Calculator",
    slug: "date-difference-calculator",
    description: "Calculate the exact number of days, weeks, and months between two calendar dates.",
    icon: CalendarRange,
    color: "text-rose-500",
    category: "DATE & AGE"
  },

  // SHOPPING & DAILY LIFE
  {
    name: "Cost Per Item Calculator",
    slug: "cost-per-item-calculator",
    description: "Quickly determine the exact price of a single unit when buying in bulk.",
    icon: ShoppingCart,
    color: "text-rose-500",
    category: "SHOPPING & DAILY LIFE"
  },
  {
    name: "Price per Kg Calculator",
    slug: "price-per-kg-calculator",
    description: "Find the exact cost per kilogram to easily compare grocery prices.",
    icon: Scale,
    color: "text-amber-500",
    category: "SHOPPING & DAILY LIFE"
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    description: "Easily calculate the tip amount and split the total bill among friends.",
    icon: Banknote,
    color: "text-orange-500",
    category: "SHOPPING & DAILY LIFE"
  },
  {
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    description: "Estimate the fuel cost for your upcoming road trip based on distance and mileage.",
    icon: Fuel,
    color: "text-amber-500",
    category: "SHOPPING & DAILY LIFE"
  },
  {
    name: "Electricity Bill Calculator",
    slug: "electricity-bill-calculator",
    description: "Estimate your monthly power consumption cost based on your appliances.",
    icon: Zap,
    color: "text-orange-500",
    category: "SHOPPING & DAILY LIFE"
  },

  // HEALTH & FITNESS
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Calculate your Body Mass Index (BMI) to check your health and fitness level.",
    icon: Activity,
    color: "text-orange-500",
    category: "HEALTH & FITNESS"
  },
  {
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    description: "Determine your daily calorie needs for weight loss, gain, or maintenance.",
    icon: Flame,
    color: "text-amber-500",
    category: "HEALTH & FITNESS"
  },

  // FUN & LIFESTYLE
  {
    name: "Love Calculator",
    slug: "love-calculator",
    description: "Calculate the percentage match between you and your crush playfully.",
    icon: Heart,
    color: "text-rose-500",
    category: "FUN & LIFESTYLE"
  }
];
