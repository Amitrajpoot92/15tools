import React from "react";

export type ToolThemeColor =
  | "indigo"
  | "orange"
  | "fuchsia"
  | "emerald"
  | "amber"
  | "rose"
  | "purple";

const THEME_CLASSES: Record<
  ToolThemeColor,
  { wrapper: string; iconBox: string }
> = {
  indigo: {
    wrapper:
      "bg-gradient-to-r from-indigo-50 via-indigo-50/70 to-white border-indigo-200",
    iconBox: "bg-indigo-600 text-white shadow-indigo-500/25",
  },
  orange: {
    wrapper:
      "bg-gradient-to-r from-orange-50 via-orange-50/70 to-white border-orange-200",
    iconBox: "bg-orange-500 text-white shadow-orange-500/25",
  },
  fuchsia: {
    wrapper:
      "bg-gradient-to-r from-fuchsia-50 via-fuchsia-50/70 to-white border-fuchsia-200",
    iconBox: "bg-fuchsia-600 text-white shadow-fuchsia-500/25",
  },
  emerald: {
    wrapper:
      "bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-white border-emerald-200",
    iconBox: "bg-emerald-600 text-white shadow-emerald-500/25",
  },
  amber: {
    wrapper:
      "bg-gradient-to-r from-amber-50 via-amber-50/70 to-white border-amber-200",
    iconBox: "bg-amber-500 text-white shadow-amber-500/25",
  },
  rose: {
    wrapper:
      "bg-gradient-to-r from-rose-50 via-rose-50/70 to-white border-rose-200",
    iconBox: "bg-rose-600 text-white shadow-rose-500/25",
  },
  purple: {
    wrapper:
      "bg-gradient-to-r from-purple-50 via-purple-50/70 to-white border-purple-200",
    iconBox: "bg-purple-600 text-white shadow-purple-500/25",
  },
};

interface ToolHeaderBannerProps {
  title: string;
  description: string;
  color: ToolThemeColor;
  icon: React.ReactNode;
}

export function ToolHeaderBanner({
  title,
  description,
  color,
  icon,
}: ToolHeaderBannerProps) {
  const styles = THEME_CLASSES[color];

  return (
    <div
      className={`flex items-center gap-3 sm:gap-3.5 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 mb-3.5 sm:mb-4 border-2 shadow-xs ${styles.wrapper}`}
    >
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md ${styles.iconBox}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-slate-700 text-xs sm:text-[13px] font-semibold leading-snug mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}

