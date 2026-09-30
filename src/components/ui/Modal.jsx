import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import { useTheme } from "../../context/ThemeContext";

function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-lg",
  showCloseButton = true,
}) {
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full ${maxWidth} rounded-md border p-6 shadow-2xl transition-all duration-300 animate-scaleIn ${
          isDark
            ? "border-white/10 bg-dark-secondary text-white"
            : "border-slate-200 bg-white text-slate-800"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 border-slate-200 dark:border-white/10">
          {title && (
            <h3 className="text-xl font-extrabold tracking-tight">
              {title}
            </h3>
          )}
          {showCloseButton && (
            <Button
              onClick={onClose}
              variant="icon"
              size="iconSm"
              title="Close modal"
              className="rounded-md"
            >
              <FaTimes size={18} />
            </Button>
          )}
        </div>

        {/* Body */}
        <div className="py-2 max-h-[75vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t pt-4 mt-4 border-slate-200 dark:border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
