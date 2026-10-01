import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-theme') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);

    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-xl bg-white dark-theme:bg-gray-900
        border border-sand dark-theme:border-gray-800 shadow-sm flex items-center justify-center
        text-gray-600 dark-theme:text-gray-400 hover:bg-cream-dark dark-theme:hover:bg-gray-800 hover:text-gray-800 dark-theme:hover:text-gray-200 transition-all duration-200 cursor-pointer"
    >
      <i className={isDarkTheme ? 'ri-moon-line text-lg' : 'ri-sun-line text-lg'}></i>
    </button>
  );
};

export default ThemeToggle;
