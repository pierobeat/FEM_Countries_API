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
      <div className="mx-auto max-w-[1440px] px-2">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
