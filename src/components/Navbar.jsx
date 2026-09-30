import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import Button from "./ui/Button";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        isDark
          ? "border-white/10 bg-dark-secondary/80"
          : "border-white/20 bg-white/70"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <div className="flex flex-col min-w-0">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Bacii Score Home"
          >
            <h1 className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-blue-200 dark:to-indigo-300 sm:text-2xl md:text-3xl truncate">
              {t("appTitle")}
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Navigation */}
          <ul
            className={`hidden md:flex items-center rounded-md p-1 gap-1 ${
              isDark ? "bg-white/5" : "bg-slate-100"
            }`}
          >
            <li>
              <Link
                to="/"
                className={`block rounded-md px-4 py-1.5 text-sm font-bold transition-all ${
                  isActive("/")
                    ? isDark
                      ? "bg-dark-primary text-blue-100 shadow-sm"
                      : "bg-white text-slate-900 shadow-sm"
                    : isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t("science")}
              </Link>
            </li>
            <li>
              <Link
                to="/social"
                className={`block rounded-md px-4 py-1.5 text-sm font-bold transition-all ${
                  isActive("/social")
                    ? isDark
                      ? "bg-dark-primary text-blue-100 shadow-sm"
                      : "bg-white text-slate-900 shadow-sm"
                    : isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t("social")}
              </Link>
            </li>
          </ul>

          {/* Controls */}
          <div
            className={`flex items-center gap-1 border-l pl-2 md:pl-4 md:gap-2 ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <Button
              onClick={toggleTheme}
              variant="icon"
              size="iconSm"
              title="Toggle Theme"
              className="group rounded-md"
            >
              {isDark ? (
                <FaSun className="h-4 w-4 text-yellow-300 transition-transform group-hover:rotate-90" />
              ) : (
                <FaMoon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              )}
            </Button>

            <Button
              onClick={toggleLanguage}
              variant="secondary"
              size="sm"
              title="Toggle Language"
              className="rounded-md gap-1.5 text-xs font-bold uppercase tracking-wide"
              icon={FaGlobe}
            >
              {language}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="icon"
              size="iconSm"
              title="Toggle Menu"
              className="flex md:hidden rounded-md"
            >
              {isMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden overflow-hidden border-t ${
            isDark ? "border-white/5 bg-dark-secondary" : "border-slate-100 bg-white"
          }`}
        >
          <ul className="flex flex-col p-3 gap-1">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-bold transition-all ${
                  isActive("/")
                    ? isDark
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-slate-100 text-slate-900"
                    : isDark
                      ? "text-slate-400 hover:bg-white/5"
                      : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t("science")}
                {isActive("/") && (
                  <div className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/social"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-bold transition-all ${
                  isActive("/social")
                    ? isDark
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-slate-100 text-slate-900"
                    : isDark
                      ? "text-slate-400 hover:bg-white/5"
                      : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t("social")}
                {isActive("/social") && (
                  <div className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
