import { useTheme } from "../context/ThemeContext";

function AppFooter() {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? "bg-dark-secondary" : "bg-servicesBg"} mt-20 h-[80px] flex justify-center items-center transition-colors duration-300 shadow-lg`}>
      <a href="https://vira-web-dev.vercel.app">
        <p className="text-sm underline md:font-xl font-JetBrainsMono dark:text-white text-white transition-colors duration-300">
          © 2025 Chamreun Vira. All Rights Reserved
        </p>
      </a>
    </footer>
  );
}

export default AppFooter;
