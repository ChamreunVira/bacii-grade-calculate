import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Badge({ children, variant = "slate", size = "md", className = "" }) {
  const { isDark } = useTheme();

  const variantStyles = {
    slate: isDark ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-700",
    emerald: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-800",
    blue: isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-800",
    red: isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-800",
    pink: isDark ? "bg-pink-500/20 text-pink-400" : "bg-pink-100 text-pink-800",
    yellow: isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-800",
    green: isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-extrabold rounded-md ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
