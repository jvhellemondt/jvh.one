import { useEffect, useState } from 'react';

export enum Themes {
  DARK = 'dark',
  LIGHT = 'light'
}

type useThemeReturn = [
  string,
  () => void
]

const useTheme = (): useThemeReturn => {
  const preferredTheme = localStorage.getItem('theme') as Themes;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const queryTheme = darkQuery.matches ? Themes.DARK : Themes.LIGHT;

  const [theme, setTheme] = useState<Themes>(preferredTheme || queryTheme);

  const handleThemeToggle = () => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return [theme, handleThemeToggle];
};

export default useTheme;
