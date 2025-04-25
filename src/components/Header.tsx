import React from 'react';

type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  return (
    <header className="w-full bg-[var(--header-background)] shadow-sm sticky top-0">
      <div className="mx-auto max-w-[1440px] px-2">
        <div className="flex h-20 items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--text-color)]">Where in the world?</h1>
          <button 
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleTheme}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
