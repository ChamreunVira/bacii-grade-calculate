import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  title,
  ...props
}) {
  const { isDark } = useTheme();

  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    iconSm: "p-1.5 text-xs",
    iconMd: "p-2.5 text-sm",
    iconLg: "p-3.5 text-base",
  };

  const variantStyles = {
    primary: isDark
      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-sm focus:ring-blue-400"
      : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus:ring-slate-900",
    secondary: isDark
      ? "bg-white/10 hover:bg-white/20 text-blue-100 border border-white/10"
      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200",
    outline: isDark
      ? "border border-blue-400/40 text-blue-300 hover:bg-blue-500/10"
      : "border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
    dangerSolid: "bg-red-700 text-white shadow-md",
    ghost: isDark
      ? "text-slate-300 hover:bg-white/10"
      : "text-slate-600 hover:bg-slate-100",
    icon: isDark
      ? "text-slate-300 hover:text-white hover:bg-white/10"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    accentIcon: isDark
      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
      : "bg-slate-100 text-slate-800 hover:bg-slate-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="shrink-0" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="shrink-0" />}
    </button>
  );
}

export default Button;
