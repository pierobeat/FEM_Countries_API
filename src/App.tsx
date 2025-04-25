import './App.css';
import Header from './components/Header';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/route';
import { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);  

  useEffect(() => {
    const storedMode = localStorage.getItem('theme');
    const isDark = storedMode === 'dark';
    setIsDarkMode(isDark);
    document.body.classList.toggle('dark', isDark);
  }, []);
  
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <div className={`w-full h-full relative ${isDarkMode ? 'dark' : 'light'}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="mx-auto px-2 max-w-[480px] sm:max-w-[1024px] lg:max-w-[1280px]">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
