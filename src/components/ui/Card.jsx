import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Card({ children, className = "", padding = "p-5", variant = "glass", ...props }) {
  const { isDark } = useTheme();

  const variantStyles = {
    glass: isDark
      ? "bg-dark-secondary/80 border-white/10 text-white shadow-lg backdrop-blur-md"
      : "bg-white/80 border-slate-200/80 text-slate-800 shadow-md backdrop-blur-md",
    solid: isDark
      ? "bg-dark-secondary border-white/10 text-white shadow-md"
      : "bg-white border-slate-200 text-slate-800 shadow-md",
    bordered: isDark
      ? "bg-transparent border-white/15 text-white"
      : "bg-transparent border-slate-300 text-slate-800",
  };

  return (
    <div
      className={`rounded-md border transition-all duration-200 ${variantStyles[variant]} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
