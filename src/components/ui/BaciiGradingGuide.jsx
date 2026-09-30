import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { FaBookOpen, FaInfoCircle, FaStar, FaAward } from "react-icons/fa";

function BaciiGradingGuide() {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const isKm = language === "km";

  const thresholds = [
    { grade: "A", range: "427.5 - 500", percent: "≥ 85.5%", descKm: "ល្អប្រសើរ (Very Good)", descEn: "Excellent", variant: "red" },
    { grade: "B", range: "380.0 - 427.0", percent: "≥ 76.0%", descKm: "ល្អណាស់ (Good)", descEn: "Very Good", variant: "pink" },
    { grade: "C", range: "332.5 - 379.5", percent: "≥ 66.5%", descKm: "ល្អ (Fairly Good)", descEn: "Good", variant: "yellow" },
    { grade: "D", range: "285.0 - 332.0", percent: "≥ 57.0%", descKm: "បង្គួរ (Medium)", descEn: "Fair", variant: "green" },
    { grade: "E", range: "237.5 - 284.5", percent: "≥ 47.5%", descKm: "មធ្យម / ជាប់ (Pass)", descEn: "Pass", variant: "blue" },
    { grade: "F", range: "< 237.5", percent: "< 47.5%", descKm: "ធ្លាក់ (Fail)", descEn: "Fail", variant: "slate" },
  ];

  return (
    <Card padding="p-5" className="h-full">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2 border-b pb-3 dark:border-white/10">
          <div className={`p-2 rounded-md ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-slate-100 text-slate-800"}`}>
            <FaBookOpen />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
              {isKm ? "ព័ត៌មានយោងពីការកំណត់និទ្ទេសបាក់ឌុប" : "Official BacII Grading Reference"}
            </h3>
            <p className="text-xs text-slate-400 dark:text-blue-200/60">
              {isKm ? "ផ្អែកលើបទដ្ឋានក្រសួងអប់រំ យុវជន និងកីឡា" : "Based on MoEYS High School Diploma Examination Standards"}
            </p>
          </div>
        </div>

        {/* Grade Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                <th className="py-2 px-1 font-bold">{isKm ? "និទ្ទេស" : "Grade"}</th>
                <th className="py-2 px-1 font-bold">{isKm ? "ពិន្ទុសរុប" : "Total Score"}</th>
                <th className="py-2 px-1 font-bold">{isKm ? "ភាគរយ" : "%"}</th>
                <th className="py-2 px-1 font-bold">{isKm ? "កម្រិត" : "Description"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {thresholds.map((row) => (
                <tr key={row.grade} className={isDark ? "hover:bg-white/5" : "hover:bg-slate-50"}>
                  <td className="py-2 px-1">
                    <Badge variant={row.variant} size="sm">
                      Grade {row.grade}
                    </Badge>
                  </td>
                  <td className="py-2 px-1 font-bold text-slate-800 dark:text-blue-100">{row.range}</td>
                  <td className="py-2 px-1 text-slate-500 dark:text-blue-200/70">{row.percent}</td>
                  <td className="py-2 px-1 font-sans font-semibold text-slate-700 dark:text-slate-300">
                    {isKm ? row.descKm : row.descEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rule note */}
        <div className={`p-3 rounded-md border text-xs flex gap-2.5 items-start ${
          isDark ? "bg-blue-500/10 border-blue-500/20 text-blue-200" : "bg-slate-50 border-slate-200 text-slate-700"
        }`}>
          <FaInfoCircle className="mt-0.5 shrink-0 text-blue-500" size={15} />
          <div>
            <strong className="font-extrabold block mb-0.5">
              {isKm ? "វិធានពិន្ទុបន្ថែមភាសាបរទេស (Foreign Language Rule):" : "Foreign Language Bonus Rule:"}
            </strong>
            <p className="opacity-90 leading-relaxed">
              {isKm
                ? "ពិន្ទុភាសាបរទេសត្រូវបានគិតជាពិន្ទុបន្ថែម។ ករណីទទួលបានលើសពី 25 ពិន្ទុ ពិន្ទុដែលលើសនឹងត្រូវបូកបន្ថែមចូលក្នុងពិន្ទុសរុប។ (ឧទាហរណ៍៖ ទទួលបាន 30 ពិន្ទុ = បូកបន្ថែម 5 ពិន្ទុ)"
                : "Foreign language is treated as a bonus subject. Points scored above 25/50 add bonus points directly to your total score (e.g., scoring 30 adds +5 bonus pts)."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BaciiGradingGuide;
