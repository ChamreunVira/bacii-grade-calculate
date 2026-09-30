import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ScoreProvider } from "./context/ScoreContext";
import Navbar from "./components/Navbar";
import ScienceGradeCalculator from "./components/ScienceGradeCalculator";
import SocialGradeCalculator from "./components/SocialGradeCalculator";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScoreProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" index element={<ScienceGradeCalculator />} />
              <Route path="/social" element={<SocialGradeCalculator />} />
            </Routes>
            <AppFooter />
          </BrowserRouter>
        </ScoreProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
