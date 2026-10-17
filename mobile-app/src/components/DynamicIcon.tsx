import React from "react";
import {
  Percent,
  Tag,
  Receipt,
  TrendingUp,
  PieChart,
  CreditCard,
  LineChart,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  TrendingDown,
  Sigma,
  CalendarDays,
  Timer,
  Clock,
  CalendarRange,
  ShoppingCart,
  Scale,
  Banknote,
  Fuel,
  Activity,
  Flame,
  Heart,
  ChevronRight,
  Sparkles,
  Search,
  RotateCcw,
  Copy,
  Check,
  ArrowLeft,
  Share2,
} from "lucide-react-native";

interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const ICONS: Record<string, React.ComponentType<any>> = {
  Percent,
  Tag,
  Receipt,
  TrendingUp,
  PieChart,
  CreditCard,
  LineChart,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  TrendingDown,
  Sigma,
  CalendarDays,
  Timer,
  Clock,
  CalendarRange,
  ShoppingCart,
  Scale,
  Banknote,
  Fuel,
  Activity,
  Flame,
  Heart,
  ChevronRight,
  Sparkles,
  Search,
  RotateCcw,
  Copy,
  Check,
  ArrowLeft,
  Share2,
};

export function DynamicIcon({
  name,
  size = 22,
  color = "#ffffff",
  strokeWidth = 2.5,
}: DynamicIconProps) {
  const IconComponent = ICONS[name] || Calculator;
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
}
