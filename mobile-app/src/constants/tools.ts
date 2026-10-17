export type Category =
  | "FINANCE & MONEY"
  | "MATH & EDUCATION"
  | "DATE & AGE"
  | "SHOPPING & DAILY LIFE"
  | "HEALTH & FITNESS"
  | "FUN & LIFESTYLE";

export interface MobileTool {
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  bgColor: string;
  category: Category;
  popular?: boolean;
}

export const CATEGORIES: Category[] = [
  "FINANCE & MONEY",
  "MATH & EDUCATION",
  "DATE & AGE",
  "SHOPPING & DAILY LIFE",
  "HEALTH & FITNESS",
  "FUN & LIFESTYLE",
];

export const CATEGORY_STYLES: Record<
  Category,
  {
    bg: string;
    border: string;
    iconBg: string;
    badgeBg: string;
    text: string;
  }
> = {
  "FINANCE & MONEY": {
    bg: "#FFF7ED",
    border: "#FFEDD5",
    iconBg: "#F97316",
    badgeBg: "#EA580C",
    text: "#9A3412",
  },
  "MATH & EDUCATION": {
    bg: "#EFF6FF",
    border: "#DBEAFE",
    iconBg: "#3B82F6",
    badgeBg: "#2563EB",
    text: "#1E40AF",
  },
  "DATE & AGE": {
    bg: "#FAF5FF",
    border: "#F3E8FF",
    iconBg: "#A855F7",
    badgeBg: "#9333EA",
    text: "#6B21A8",
  },
  "SHOPPING & DAILY LIFE": {
    bg: "#ECFDF5",
    border: "#D1FAE5",
    iconBg: "#10B981",
    badgeBg: "#059669",
    text: "#065F46",
  },
  "HEALTH & FITNESS": {
    bg: "#FFF1F2",
    border: "#FFE4E6",
    iconBg: "#F43F5E",
    badgeBg: "#E11D48",
    text: "#9F1239",
  },
  "FUN & LIFESTYLE": {
    bg: "#FFFBEB",
    border: "#FEF3C7",
    iconBg: "#F59E0B",
    badgeBg: "#D97706",
    text: "#92400E",
  },
};

export const MOBILE_TOOLS: MobileTool[] = [
  // FINANCE & MONEY
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Quickly find percentages, discounts, or ratio values.",
    iconName: "Percent",
    color: "#F97316",
    bgColor: "#FFF7ED",
    category: "FINANCE & MONEY",
    popular: true,
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate sales discounts and final price instantly.",
    iconName: "Tag",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    category: "FINANCE & MONEY",
  },
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove GST with CGST/SGST/IGST tax breakup.",
    iconName: "Receipt",
    color: "#F43F5E",
    bgColor: "#FFF1F2",
    category: "FINANCE & MONEY",
    popular: true,
  },
  {
    name: "Profit and Loss Calculator",
    slug: "profit-and-loss-calculator",
    description: "Calculate profit margins, gross profit, and total loss.",
    iconName: "TrendingUp",
    color: "#F97316",
    bgColor: "#FFF7ED",
    category: "FINANCE & MONEY",
  },
  {
    name: "Wholesale Price Calculator",
    slug: "wholesale-price-calculator",
    description: "Find selling price, profit margin, and bulk earnings.",
    iconName: "PieChart",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    category: "FINANCE & MONEY",
  },
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    description: "Plan loans by calculating monthly EMI & total interest.",
    iconName: "CreditCard",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    category: "FINANCE & MONEY",
    popular: true,
  },
  {
    name: "SIP Calculator",
    slug: "sip-calculator",
    description: "Calculate wealth growth and expected returns for Mutual Funds.",
    iconName: "LineChart",
    color: "#F43F5E",
    bgColor: "#FFF1F2",
    category: "FINANCE & MONEY",
    popular: true,
  },
  {
    name: "Subscription Cost Calculator",
    slug: "subscription-cost-calculator",
    description: "Track monthly subscriptions and total annual costs.",
    iconName: "Calculator",
    color: "#F43F5E",
    bgColor: "#FFF1F2",
    category: "FINANCE & MONEY",
  },

  // MATH & EDUCATION
  {
    name: "Marks Percentage Calculator",
    slug: "marks-percentage-calculator",
    description: "Convert exam marks into accurate percentage & grade.",
    iconName: "GraduationCap",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    category: "MATH & EDUCATION",
  },
  {
    name: "Attendance Percentage Calculator",
    slug: "attendance-percentage-calculator",
    description: "Calculate attendance and see how many classes you can skip.",
    iconName: "ClipboardCheck",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    category: "MATH & EDUCATION",
    popular: true,
  },
  {
    name: "Negative Marking Calculator",
    slug: "negative-marking-calculator",
    description: "Calculate final score with exam negative marking penalties.",
    iconName: "TrendingDown",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    category: "MATH & EDUCATION",
  },
  {
    name: "Average Calculator",
    slug: "average-calculator",
    description: "Find mean, median, mode, and range for numbers.",
    iconName: "Sigma",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    category: "MATH & EDUCATION",
  },
  {
    name: "BODMAS Calculator",
    slug: "bodmas-calculator",
    description: "Evaluate complex expressions using exact BODMAS rules.",
    iconName: "Calculator",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    category: "MATH & EDUCATION",
  },

  // DATE & AGE
  {
    name: "Age Calculator Online",
    slug: "age-calculator-online",
    description: "Calculate exact age in years, months, days, and hours.",
    iconName: "CalendarDays",
    color: "#A855F7",
    bgColor: "#FAF5FF",
    category: "DATE & AGE",
    popular: true,
  },
  {
    name: "Birthday Countdown",
    slug: "birthday-countdown",
    description: "See exact days, hours, and minutes left for next birthday.",
    iconName: "Timer",
    color: "#9333EA",
    bgColor: "#FAF5FF",
    category: "DATE & AGE",
  },
  {
    name: "Age Difference Calculator",
    slug: "age-difference-calculator",
    description: "Find the exact difference in age between two people.",
    iconName: "Clock",
    color: "#7E22CE",
    bgColor: "#FAF5FF",
    category: "DATE & AGE",
  },
  {
    name: "Date Difference Calculator",
    slug: "date-difference-calculator",
    description: "Calculate days, weeks, and months between two dates.",
    iconName: "CalendarRange",
    color: "#A855F7",
    bgColor: "#FAF5FF",
    category: "DATE & AGE",
  },

  // SHOPPING & DAILY LIFE
  {
    name: "Cost Per Item Calculator",
    slug: "cost-per-item-calculator",
    description: "Determine exact price per unit when buying in bulk.",
    iconName: "ShoppingCart",
    color: "#10B981",
    bgColor: "#ECFDF5",
    category: "SHOPPING & DAILY LIFE",
  },
  {
    name: "Price per Kg Calculator",
    slug: "price-per-kg-calculator",
    description: "Compare grocery costs by finding price per kilogram.",
    iconName: "Scale",
    color: "#059669",
    bgColor: "#ECFDF5",
    category: "SHOPPING & DAILY LIFE",
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    description: "Calculate tip amount and split restaurant bills easily.",
    iconName: "Banknote",
    color: "#10B981",
    bgColor: "#ECFDF5",
    category: "SHOPPING & DAILY LIFE",
  },
  {
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    description: "Estimate road trip fuel costs from mileage and distance.",
    iconName: "Fuel",
    color: "#047857",
    bgColor: "#ECFDF5",
    category: "SHOPPING & DAILY LIFE",
  },
  {
    name: "Grocery Bill Calculator",
    slug: "grocery-bill-calculator",
    description: "Sum up cart items to estimate total bill before checkout.",
    iconName: "ShoppingCart",
    color: "#10B981",
    bgColor: "#ECFDF5",
    category: "SHOPPING & DAILY LIFE",
  },

  // HEALTH & FITNESS
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Check Body Mass Index and healthy weight target range.",
    iconName: "Activity",
    color: "#F43F5E",
    bgColor: "#FFF1F2",
    category: "HEALTH & FITNESS",
    popular: true,
  },
  {
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    description: "Determine daily BMR & TDEE calories for weight goals.",
    iconName: "Flame",
    color: "#E11D48",
    bgColor: "#FFF1F2",
    category: "HEALTH & FITNESS",
  },

  // FUN & LIFESTYLE
  {
    name: "Love Calculator",
    slug: "love-calculator",
    description: "Calculate playful compatibility score between two names.",
    iconName: "Heart",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    category: "FUN & LIFESTYLE",
  },
];
