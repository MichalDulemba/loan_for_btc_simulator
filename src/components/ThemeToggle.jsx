import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title={`Przełącz na ${isDark ? 'jasny' : 'ciemny'} motyw`}
      >
        {isDark ? (
          <Sun size={20} className="text-yellow-300" />
        ) : (
          <Moon size={20} className="text-blue-100" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle; 