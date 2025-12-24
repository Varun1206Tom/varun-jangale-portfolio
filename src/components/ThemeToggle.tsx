import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="hoverable relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      style={{
        backgroundColor: isDark ? '#334155' : '#F1F5F9',
        boxShadow: isDark 
          ? '0 0 10px rgba(99, 102, 241, 0.3)' 
          : '0 0 10px rgba(79, 70, 229, 0.3)',
      }}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
          isDark ? 'left-1 bg-indigo-500' : 'left-7 bg-yellow-400'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-800" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;