import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { FaSlidersH, FaCheck } from "react-icons/fa";

const TARGET_GRADES = [
  { grade: "A", minTotal: 427.5, description: "Excellent (90%+)", color: "red" },
  { grade: "B", minTotal: 380, description: "Very Good (80%+)", color: "pink" },
  { grade: "C", minTotal: 332.5, description: "Good (70%+)", color: "yellow" },
  { grade: "D", minTotal: 285, description: "Fair (60%+)", color: "green" },
  { grade: "E", minTotal: 237.5, description: "Pass (50%+)", color: "blue" },
];

function GradeSimulator({ subjects, onApplySimulatedScores }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedGrade, setSelectedGrade] = useState("A");

  const targetObj = TARGET_GRADES.find(g => g.grade === selectedGrade) || TARGET_GRADES[0];

  const maxPossibleSum = subjects.reduce((sum, s) => sum + s.max, 0);
  const targetRatio = targetObj.minTotal / maxPossibleSum;

  const simulatedScores = subjects.map((sub) => {
    const rawTarget = Math.round(sub.max * targetRatio);
    return Math.min(sub.max, Math.max(0, rawTarget));
  });

  return (
    <Card padding="p-5" className="h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-md ${isDark ? "bg-blue-500/20 text-blue-300" : "bg-slate-100 text-slate-800"}`}>
              <FaSlidersH />
            </div>
            <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              {t("targetSimulator")}
            </h3>
          </div>
          <Badge variant={targetObj.color}>
            Target: Grade {selectedGrade}
          </Badge>
        </div>

        {/* Grade Selection Buttons */}
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-md bg-slate-100 dark:bg-white/5">
          {TARGET_GRADES.map((item) => {
            const isSelected = item.grade === selectedGrade;
            return (
              <button
                key={item.grade}
                onClick={() => setSelectedGrade(item.grade)}
                className={`py-2 text-xs font-black rounded-md transition-all ${
                  isSelected
                    ? (isDark ? "bg-blue-600 text-white shadow-sm" : "bg-slate-900 text-white shadow-sm")
                    : (isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900")
                }`}
              >
                Grade {item.grade}
              </button>
            );
          })}
        </div>

        {/* Simulated Score Preview */}
        <div className="space-y-2 py-1">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            Required Scores for ~{targetObj.minTotal} pts:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded-md border ${
                  isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
                }`}
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate pr-1">
                  {sub.title}
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {simulatedScores[idx]} <span className="text-[10px] opacity-60">/ {sub.max}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => onApplySimulatedScores(simulatedScores)}
          variant="primary"
          size="md"
          icon={FaCheck}
          fullWidth
        >
          Apply Grade {selectedGrade} Scores
        </Button>
      </div>
    </Card>
  );
}

export default GradeSimulator;
