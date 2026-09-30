import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import Badge from "./Badge";
import { useTheme } from "../../context/ThemeContext";

function GradeResultModal({
  open,
  onClose,
  totalScore,
  gradeDetails,
  subjects,
  scores,
  t,
}) {
  const { isDark } = useTheme();

  if (!open) return null;

  const isPassed = gradeDetails.grade !== "F";

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg" showCloseButton={true}>
      <div className="p-8 text-center bg-pattern">
        <p className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-blue-200/60" : "text-slate-400"}`}>
          {t("score")}
        </p>
        <div className={`mt-2 text-8xl font-black tracking-tighter ${gradeDetails.color} drop-shadow-sm`}>
          <span className="font-mono">{totalScore}</span>
        </div>
      </div>

      <div className={`px-8 pb-8 pt-4 rounded-t-[2.5rem] -mt-6 relative z-10 border-t ${isDark ? "bg-dark-primary border-white/5" : "bg-slate-50 border-white"}`}>
        <div className="flex flex-col items-center -mt-16 mb-6">
          <div className={`flex h-24 w-24 items-center justify-center rounded-3xl text-6xl font-black text-white shadow-xl ${gradeDetails.bg}`}>
            {gradeDetails.grade}
          </div>
          <div className="mt-3 flex flex-col items-center">
            <p className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-700"}`}>
              {t("grade")}
            </p>
            <Badge variant={isPassed ? "green" : "red"} className="mt-1">
              {isPassed ? "Passed" : "Failed"}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {subjects.map((item, idx) => {
            const score = scores[idx] || 0;
            const percentage = (score / item.max) * 100;
            let grade = "F";
            let color = "text-slate-400";

            if (percentage >= 90) { grade = "A"; color = "text-red-500"; }
            else if (percentage >= 80) { grade = "B"; color = "text-pink-500"; }
            else if (percentage >= 70) { grade = "C"; color = "text-red-700"; }
            else if (percentage >= 60) { grade = "D"; color = "text-green-600"; }
            else if (percentage >= 50) { grade = "E"; color = "text-blue-500"; }

            return (
              <div key={idx} className={`flex items-center justify-between rounded-xl px-4 py-3 ${isDark ? "bg-white/5" : "bg-white shadow-sm"}`}>
                <span className={`font-semibold ${isDark ? "text-blue-100" : "text-slate-700"}`}>{item.title}</span>
                <div className="flex items-center gap-4">
                  <span className={`font-mono font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{score}</span>
                  <span className={`font-mono w-6 text-center font-bold ${color}`}>{grade}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          onClick={onClose}
          fullWidth
          size="lg"
          variant="primary"
          className={`mt-8 ${gradeDetails.bg}`}
        >
          {t("close")}
        </Button>
      </div>
    </Modal>
  );
}

export default GradeResultModal;
