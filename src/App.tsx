import "./App.css";
import Header from "./components/Header";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/route";
import { useState, useEffect } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    const isDark = storedMode === "dark";
    setIsDarkMode(isDark);
    document.body.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div
      className={`w-full h-full min-h-[100vh] relative ${isDarkMode ? "dark" : "light"}`}
    >
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main className="mx-auto px-2 max-w-[480px] sm:max-w-[1024px] lg:max-w-[1280px] 2xl:max-w-[1530px]">
        <RouterProvider router={router} />
      </main>
      <footer className="w-full py-6 text-center text-sm text-[var(--text-color)] bg-[var(--header-background)] absolute bottom-0 left-0">
        © 2026&nbsp;
        <a
          className="font-semibold underline-offset-4 hover:underline"
          href="https://github.com/pierobeat"
          target="_blank"
          rel="noreferrer"
        >
          pierobeat
        </a>
      </footer>
    </div>
  );
}

export default App;
