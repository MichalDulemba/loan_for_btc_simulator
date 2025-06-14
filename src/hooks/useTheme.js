import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Sprawdź zapisany motyw w localStorage lub użyj domyślnego
    const savedTheme = localStorage.getItem('btc-calculator-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Zastosuj motyw do body
    const body = document.body;
    
    // Ustaw atrybut data-theme
    body.setAttribute('data-theme', theme);
    
    // Zapisz motyw w localStorage
    localStorage.setItem('btc-calculator-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const setDarkTheme = () => {
    setTheme('dark');
  };

  const setLightTheme = () => {
    setTheme('light');
  };

  return {
    theme,
    toggleTheme,
    setDarkTheme,
    setLightTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
}; 