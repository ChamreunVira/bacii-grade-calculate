import React, { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import ScoreInputCard from "./ui/ScoreInputCard";
import FeedbackDialog from "./ui/FeedbackDialog";
import ScoreHistoryPanel from "./ui/ScoreHistoryPanel";
import GradeResultModal from "./ui/GradeResultModal";
import GradeProgressMeter from "./ui/GradeProgressMeter";
import GradeSimulator from "./ui/GradeSimulator";
import SubjectAnalytics from "./ui/SubjectAnalytics";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import SEO from "./SEO";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useScore } from "../context/ScoreContext";
import { FaCalculator, FaRedo, FaSave, FaHistory, FaMagic, FaStar, FaCheckCircle, FaTrash } from "react-icons/fa";

import p7 from "../assets/khmer-book.jpg";
import p1 from "../assets/enlish.jpg";
import p2 from "../assets/earth.jpg";
import p3 from "../assets/sersthorpulroth.jpg";
import p4 from "../assets/marth.jpg";
import p5 from "../assets/phom.jpg";
import p6 from "../assets/history.jpg";

function SocialGradeCalculator() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const {
    scoresByTrack,
    updateScores,
    resetScores,
    history,
    addHistoryEntry,
    removeHistoryEntry,
    clearHistory,
  } = useScore();

  const track = "social";
  const defaultScores = [0, 0, 0, 0, 0, 0, 0];
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [saveMessage, setSaveMessage] = useState("");

  const data = [
    { title: t("khmerLang"), img: p7, max: 125 },
    { title: t("math"), img: p4, max: 75 },
    { title: t("earthScience"), img: p2, max: 50 },
    { title: t("history"), img: p6, max: 75 },
    { title: t("geography"), img: p5, max: 75 },
    { title: t("civics"), img: p3, max: 75 },
    { title: t("foreignLang"), img: p1, max: 50 },
  ];

  const scores = scoresByTrack?.social || defaultScores;

  const totalScore = useMemo(() => {
    const baseSum = scores.slice(0, 6).reduce((sum, s) => sum + s, 0);
    const foreignBonus = Math.max(0, (scores[6] || 0) - 25);
    return baseSum + foreignBonus;
  }, [scores]);

  const handleScoreChange = (index, value) => {
    const max = data[index].max;

    if (value === "") {
      const updatedScores = [...scores];
      updatedScores[index] = 0;
      updateScores(track, updatedScores);
      setValidationErrors(prev => ({ ...prev, [index]: null }));
      return;
    }

    let numValue = Number(value);
    if (isNaN(numValue)) numValue = 0;

    if (numValue < 0) return;

    if (numValue > max) {
      setValidationErrors(prev => ({ ...prev, [index]: `Max ${max}` }));
    } else {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }

    const updatedScores = [...scores];
    updatedScores[index] = numValue;
    updateScores(track, updatedScores);
  };

  const handlePresetFill = (percentage) => {
    const filled = data.map(item => Math.round(item.max * percentage));
    updateScores(track, filled);
    setValidationErrors({});
  };

  const handleOpen = () => {
    const hasEmpty = scores.some((value, idx) => idx < 6 && value === 0);
    const hasErrors = Object.keys(validationErrors).some(k => validationErrors[k]);

    if (hasEmpty || hasErrors) {
      setShowDialog(true);
      return;
    }

    if (gradeDetails.grade !== "F") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#274c77", "#00e187", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]
      });
    }

    setOpen(true);
  };

  const handleSaveMonth = () => {
    const hasEmpty = scores.some((value, idx) => idx < 6 && value === 0);
    if (hasEmpty) {
      setShowDialog(true);
      return;
    }
    addHistoryEntry({
      track,
      scores,
      totalScore,
      month,
    });
    setSaveMessage(t("saved"));
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const getBackgroundColor = (index, score) => {
    const max = data[index].max;
    const percentage = (score / max) * 100;

    if (percentage <= 50) return isDark ? "bg-red-800" : "bg-red-400";
    if (percentage <= 70) return isDark ? "bg-yellow-700" : "bg-yellow-400";
    return isDark ? "bg-green-800" : "bg-green-500";
  };

  const getPercentage = (score, index) => {
    return (score * 100) / data[index].max;
  };

  const getGradeDetails = (total) => {
    if (total >= 427.5) return { grade: "A", color: "text-red-500", bg: "bg-red-500" };
    if (total >= 380) return { grade: "B", color: "text-pink-500", bg: "bg-pink-500" };
    if (total >= 332.5) return { grade: "C", color: "text-red-700", bg: "bg-red-700" };
    if (total >= 285) return { grade: "D", color: "text-green-600", bg: "bg-green-600" };
    if (total >= 237.5) return { grade: "E", color: "text-blue-500", bg: "bg-blue-500" };
    return { grade: "F", color: isDark ? "text-gray-400" : "text-slate-600", bg: "bg-slate-500" };
  };

  const gradeDetails = getGradeDetails(totalScore);

  return (
    <>
      <SEO pageTitle={t("social")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Month & Summary Card */}
          <Card padding="p-3 sm:p-5 md:p-8">
            <div className="flex flex-col-reverse justify-between gap-4 md:gap-6 md:flex-row md:items-center">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-blue-200/60">
                    {t("currentTotal")}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2 sm:gap-3">
                    <span className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-mono sm:text-4xl md:text-5xl">
                      {totalScore}
                    </span>
                    <Badge variant="emerald" size="sm" className="sm:px-3 sm:py-1 sm:text-xs md:text-sm">
                      {t("average")}: {(totalScore / 7).toFixed(2)}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => document.getElementById("history-section")?.scrollIntoView({ behavior: "smooth" })}
                  variant="accentIcon"
                  size="iconSm"
                  icon={FaHistory}
                  title={t("monthlyHistory")}
                  className="flex md:hidden"
                />
              </div>

              <div className="flex justify-between items-center gap-3 rounded-2xl ring-1 bg-slate-200/50 p-1 md:p-1.5 dark:bg-white/5 sm:p-2">
                <div className="px-3">
                  <Input
                    label={t("month")}
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSaveMonth}
                  variant={saveMessage ? "dangerSolid" : "secondary"}
                  size="iconMd"
                  icon={FaSave}
                  title={t("saveMonth")}
                  className={saveMessage ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                />
                <Button
                  onClick={() => document.getElementById("history-section")?.scrollIntoView({ behavior: "smooth" })}
                  variant="accentIcon"
                  size="iconMd"
                  icon={FaHistory}
                  title={t("monthlyHistory")}
                  className="hidden md:flex"
                />
              </div>
            </div>
          </Card>

          {/* Grade Progress Meter */}
          <GradeProgressMeter totalScore={totalScore} />

          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/60 dark:bg-dark-secondary/60 border border-white/40 dark:border-white/10 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-blue-200/70">
              <FaMagic className="text-amber-500" />
              <span>{t("presets")}:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => handlePresetFill(0.92)}
                variant="ghost"
                size="sm"
                icon={FaStar}
                className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
              >
                {t("topStudent")}
              </Button>
              <Button
                onClick={() => handlePresetFill(0.72)}
                variant="ghost"
                size="sm"
                icon={FaCheckCircle}
                className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
              >
                {t("averagePass")}
              </Button>
              <Button
                onClick={() => handlePresetFill(0.52)}
                variant="ghost"
                size="sm"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
              >
                {t("minimumPass")}
              </Button>
              <Button
                onClick={() => { resetScores("social"); setValidationErrors({}); }}
                variant="ghost"
                size="sm"
                icon={FaTrash}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                {t("reset")}
              </Button>
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <div key={index} className="animate-scaleIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <ScoreInputCard
                  {...item}
                  index={index}
                  score={scores[index]}
                  max={item.max}
                  error={validationErrors[index]}
                  onScoreChange={handleScoreChange}
                  percentage={getPercentage(scores[index], index)}
                  color={getBackgroundColor(index, scores[index])}
                />
              </div>
            ))}
          </div>

          {/* Main Action Area */}
          <div className="flex flex-col sm:flex-row gap-4 py-2">
            <Button
              onClick={handleOpen}
              variant="primary"
              size="lg"
              fullWidth
              icon={FaCalculator}
              className="text-lg py-4 shadow-xl"
            >
              {t("calculate")}
            </Button>
            <Button
              onClick={() => { resetScores("social"); setValidationErrors({}); }}
              variant="danger"
              size="lg"
              icon={FaRedo}
              className="sm:w-48 py-4"
            >
              {t("reset")}
            </Button>
          </div>

          {/* Interactive Tools: Target Simulator & Analytics */}
          <div className="grid gap-6 lg:grid-cols-2">
            <GradeSimulator
              subjects={data}
              onApplySimulatedScores={(simulated) => {
                updateScores(track, simulated);
                setValidationErrors({});
              }}
            />
            <SubjectAnalytics
              subjects={data}
              scores={scores}
            />
          </div>

          {/* Monthly History Section */}
          <div className="animate-slideUp pt-4" id="history-section">
            <ScoreHistoryPanel
              entries={history}
              track={track}
              language={language}
              t={t}
              onRemove={removeHistoryEntry}
              onClear={clearHistory}
              isDark={isDark}
              onEdit={(entry) => {
                updateScores(track, entry.scores);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onView={(entry) => {
                updateScores(track, entry.scores);
                setTimeout(() => setOpen(true), 50);
              }}
            />
          </div>
        </div>
      </div>

      <GradeResultModal
        open={open}
        onClose={() => setOpen(false)}
        totalScore={totalScore}
        gradeDetails={gradeDetails}
        subjects={data}
        scores={scores}
        t={t}
      />

      <FeedbackDialog
        open={showDialog}
        title={t("enterScores")}
        message={t("enterScores")}
        actionLabel={t("close")}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}

export default SocialGradeCalculator;
