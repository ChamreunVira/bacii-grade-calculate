import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaHistory, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";

const getGrade = (totalScore) => {
  if (totalScore >= 427) return "A";
  if (totalScore >= 380) return "B";
  if (totalScore >= 332) return "C";
  if (totalScore >= 286) return "D";
  if (totalScore >= 237) return "E";
  return "F";
};

const getGradeBadgeVariant = (grade) => {
  switch (grade) {
    case "A": return "red";
    case "B": return "pink";
    case "C": return "red";
    case "D": return "green";
    case "E": return "blue";
    default: return "slate";
  }
};

function ScoreHistoryPanel({ entries, track, language, t, onRemove, onClear, isDark, onEdit, onView }) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredEntries = entries.filter((entry) => entry.track === track);
  const grouped = filteredEntries.reduce((acc, entry) => {
    const monthKey = entry.month || entry.date.slice(0, 7);
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(entry);
    return acc;
  }, {});

  const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const locale = language === "km" ? "km-KH" : "en-US";
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <Card padding="p-0" className="h-fit overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center justify-between p-5 transition-colors ${
          isDark ? "hover:bg-white/5" : "hover:bg-black/5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isDark ? "bg-blue-500/20 text-blue-300" : "bg-accent/10 text-accent"}`}>
            <FaHistory />
          </div>
          <h3 className={`text-base font-bold ${isDark ? "text-blue-100" : "text-slate-700"}`}>
            {t("monthlyHistory")}
          </h3>
          <Badge variant="slate">{filteredEntries.length}</Badge>
        </div>
        <Button
          variant="ghost"
          size="iconSm"
          className={`transition-all ${isOpen ? "rotate-180" : ""}`}
        >
          {isOpen ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
        </Button>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 p-5 pt-0" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="flex justify-end mb-4">
          {monthKeys.length > 0 && (
            <Button
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              variant="danger"
              size="sm"
              icon={FaTrash}
            >
              {t("clearHistory")}
            </Button>
          )}
        </div>

        {monthKeys.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <p className={`text-sm font-medium ${isDark ? "text-blue-200" : "text-slate-600"}`}>{t("noHistory")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {monthKeys.map((monthKey) => (
              <div key={monthKey} className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider opacity-50 px-1 ${isDark ? "text-blue-100" : "text-slate-400"}`}>
                  {monthFormatter.format(new Date(`${monthKey}-01T00:00:00`))}
                </p>
                <div className="space-y-2">
                  {grouped[monthKey].map((entry) => {
                    const grade = getGrade(entry.totalScore);
                    return (
                      <div
                        key={entry.id}
                        className={`group relative flex items-center justify-between gap-3 rounded-2xl border p-4 transition-all hover:shadow-lg ${
                          isDark ? "bg-dark-primary/60 border-white/10" : "bg-white/60 border-slate-100"
                        }`}
                      >
                        <div className="flex flex-col gap-1.5">
                          <span className={`text-[10px] font-bold opacity-60 ${isDark ? "text-blue-200" : "text-slate-500"}`}>
                            {dateFormatter.format(new Date(entry.date))}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                              {entry.totalScore}
                            </span>
                            <span className={`text-[11px] font-bold ${isDark ? "text-blue-300/70" : "text-slate-500"}`}>
                              {t("average")}: {(entry.totalScore / 7).toFixed(1)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                          <Badge
                            variant={getGradeBadgeVariant(grade)}
                            size="lg"
                            className="h-12 w-12 text-xl font-black rounded-2xl"
                          >
                            {grade}
                          </Badge>

                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              onClick={() => onView && onView(entry)}
                              variant="ghost"
                              size="iconSm"
                              icon={FaEye}
                              title={t("view")}
                              className={isDark ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}
                            />
                            <Button
                              onClick={() => onEdit && onEdit(entry)}
                              variant="ghost"
                              size="iconSm"
                              icon={FaEdit}
                              title={t("edit")}
                              className={isDark ? "bg-white/5 text-blue-300 hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
                            />
                            <Button
                              onClick={() => onRemove(entry.id)}
                              variant="ghost"
                              size="iconSm"
                              icon={FaTrash}
                              title={t("remove")}
                              className={isDark ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-red-50 text-red-500 hover:bg-red-100"}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ScoreHistoryPanel;
