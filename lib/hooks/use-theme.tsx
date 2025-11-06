'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ColorMode } from '../constants/colors';

interface ThemeContextType {
  theme: ColorMode;
  toggleTheme: () => void;
  setTheme: (theme: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ColorMode;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ColorMode>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('webcave-theme') as ColorMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update document class and localStorage
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('webcave-theme', theme);

    // Update CSS variables for theme colors
    updateCSSVariables(theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: ColorMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

/**
 * Update CSS custom properties based on theme
 */
function updateCSSVariables(theme: ColorMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // This will be populated from our colors constant
  // For now, we'll let Tailwind handle most of it
  root.style.setProperty('--theme', theme);
}
