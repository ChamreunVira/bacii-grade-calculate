import React from "react";
import Card from "./Card";
import Input from "./Input";
import Badge from "./Badge";
import { useTheme } from "../../context/ThemeContext";

function ScoreInputCard({
  title,
  img,
  score,
  max,
  index,
  error,
  onScoreChange,
  percentage,
  color,
}) {
  const { isDark } = useTheme();

  return (
    <Card padding="p-4 sm:p-5" className="relative group transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-white/10 shadow-sm">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className={`text-sm font-extrabold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
            {title}
          </h3>
          <span className="text-[11px] font-bold text-slate-400 dark:text-blue-200/60 font-mono">
            Max: {max} pts
          </span>
        </div>
        {percentage > 0 && (
          <Badge
            variant={percentage >= 80 ? "emerald" : percentage >= 60 ? "blue" : percentage >= 50 ? "yellow" : "red"}
            size="sm"
          >
            {Math.round(percentage)}%
          </Badge>
        )}
      </div>

      <Input
        type="number"
        value={score === 0 ? "" : score}
        onChange={(e) => onScoreChange(index, e.target.value)}
        placeholder={`0 - ${max}`}
        max={max}
        min={0}
        error={error}
        autoSelect={true}
      />

      {/* Mini Progress Bar */}
      <div className="mt-3 h-1.5 w-full rounded-md bg-slate-100 dark:bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-md transition-all duration-300 ${color}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </Card>
  );
}

export default ScoreInputCard;
