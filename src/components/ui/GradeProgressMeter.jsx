import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const THRESHOLDS = [
  { grade: "E", min: 237.5, max: 284.5, variant: "blue" },
  { grade: "D", min: 285, max: 332, variant: "green" },
  { grade: "C", min: 332.5, max: 379.5, variant: "yellow" },
  { grade: "B", min: 380, max: 427, variant: "pink" },
  { grade: "A", min: 427.5, max: 500, variant: "red" },
];

function GradeProgressMeter({ totalScore }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const maxTotal = 500;
  const progressPercent = Math.min(100, Math.max(0, (totalScore / maxTotal) * 100));

  const currentTier = THRESHOLDS.slice().reverse().find(t => totalScore >= t.min);
  const nextTierIndex = currentTier ? THRESHOLDS.findIndex(t => t.grade === currentTier.grade) + 1 : 0;
  const nextTier = THRESHOLDS[nextTierIndex];

  const pointsNeeded = nextTier ? Math.max(0, Math.ceil(nextTier.min - totalScore)) : 0;

  return (
    <Card padding="p-4 sm:p-5" className="relative overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-extrabold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t("gradeMeter")}
            </span>
            {currentTier ? (
              <Badge variant={currentTier.variant} size="sm">
                Grade {currentTier.grade}
              </Badge>
            ) : (
              <Badge variant="slate" size="sm">
                Below Pass (F)
              </Badge>
            )}
          </div>

          <div className="text-right">
            {nextTier ? (
              <span className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {t("neededFor")} <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">Grade {nextTier.grade}</strong>: <span className="font-mono text-sm text-blue-600 dark:text-blue-400">+{pointsNeeded} pts</span>
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {t("maxGradeReached")}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="relative h-3.5 w-full rounded-md bg-slate-200/70 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-slate-800 dark:bg-blue-600 rounded-md transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Tier Milestones */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono font-bold text-slate-400 dark:text-slate-400 pt-0.5">
          <span>0 (F)</span>
          <span className={totalScore >= 237.5 ? "text-blue-600 dark:text-blue-400 font-black" : ""}>237.5 (E)</span>
          <span className={totalScore >= 285 ? "text-emerald-600 dark:text-emerald-400 font-black" : ""}>285 (D)</span>
          <span className={totalScore >= 332.5 ? "text-amber-600 dark:text-amber-400 font-black" : ""}>332.5 (C)</span>
          <span className={totalScore >= 380 ? "text-pink-600 dark:text-pink-400 font-black" : ""}>380 (B)</span>
          <span className={totalScore >= 427.5 ? "text-red-600 dark:text-red-400 font-black" : ""}>427.5 (A)</span>
        </div>
      </div>
    </Card>
  );
}

export default GradeProgressMeter;
