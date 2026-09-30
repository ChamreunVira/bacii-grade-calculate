import React from "react";
import Card from "./Card";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { FaChartBar, FaArrowUp, FaExclamationTriangle } from "react-icons/fa";

function SubjectAnalytics({ subjects, scores }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const analyticsData = subjects.map((sub, idx) => {
    const score = scores[idx] || 0;
    const percentage = Math.round((score / sub.max) * 100);
    return {
      title: sub.title,
      score,
      max: sub.max,
      percentage,
    };
  });

  const sorted = [...analyticsData].sort((a, b) => b.percentage - a.percentage);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return (
    <Card padding="p-5" className="h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-md ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-100 text-slate-800"}`}>
              <FaChartBar />
            </div>
            <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              {t("analytics")}
            </h3>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-md border ${isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <FaArrowUp size={12} />
              <span>{t("strongestSubject")}</span>
            </div>
            <p className="mt-1 text-sm font-extrabold text-slate-800 dark:text-white truncate">
              {strongest?.title || "-"}
            </p>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {strongest?.percentage || 0}% ({strongest?.score}/{strongest?.max})
            </span>
          </div>

          <div className={`p-3 rounded-md border ${isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-100"}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              <FaExclamationTriangle size={12} />
              <span>{t("weakestSubject")}</span>
            </div>
            <p className="mt-1 text-sm font-extrabold text-slate-800 dark:text-white truncate">
              {weakest?.title || "-"}
            </p>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
              {weakest?.percentage || 0}% ({weakest?.score}/{weakest?.max})
            </span>
          </div>
        </div>

        {/* Subject Percentage Distribution */}
        <div className="space-y-2 pt-1">
          {analyticsData.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                <span className="truncate pr-2">{item.title}</span>
                <span className="font-mono">{item.percentage}%</span>
              </div>
              <div className="h-2 w-full rounded-md bg-slate-100 dark:bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-md transition-all duration-500 ${
                    item.percentage >= 80
                      ? "bg-emerald-600 dark:bg-emerald-500"
                      : item.percentage >= 60
                      ? "bg-blue-600 dark:bg-blue-500"
                      : item.percentage >= 50
                      ? "bg-amber-600 dark:bg-amber-500"
                      : "bg-red-600 dark:bg-red-500"
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default SubjectAnalytics;
