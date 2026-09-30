import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = "",
  id,
  min,
  max,
  step,
  autoSelect = true,
  ...props
}) {
  const { isDark } = useTheme();

  const handleFocus = (e) => {
    if (autoSelect && (type === "number" || type === "text")) {
      e.target.select();
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-xs font-bold ${
            error
              ? "text-red-500"
              : isDark
              ? "text-blue-100/80"
              : "text-slate-600"
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`w-full rounded-md border px-3 py-2 text-sm font-semibold transition-all duration-200 outline-none ${
          error
            ? "border-red-500 bg-red-500/10 text-red-500 placeholder-red-300 focus:ring-2 focus:ring-red-500/30"
            : isDark
            ? "border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            : "border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        {...props}
      />
      {error && <span className="text-[11px] font-bold text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}

export default Input;
