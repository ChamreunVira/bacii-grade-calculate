import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { useTheme } from "../../context/ThemeContext";

function FeedbackDialog({ open, title, message, actionLabel, onClose }) {
  const { isDark } = useTheme();

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-md"
      showCloseButton={false}
      footer={
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
          >
            {actionLabel}
          </Button>
        </div>
      }
    >
      <div className="p-6">
        <h3 className={`text-lg font-bold ${isDark ? "text-blue-100" : "text-slate-800"}`}>
          {title}
        </h3>
        <p className={`mt-2 text-sm ${isDark ? "text-blue-200/70" : "text-slate-500"}`}>
          {message}
        </p>
      </div>
    </Modal>
  );
}

export default FeedbackDialog;
