import { useEffect, useState } from 'react';

type useThemeReturn = [
  string,
  () => void
]

const useTheme = (): useThemeReturn => {
  const [theme, setTheme] = useState('dark');

  const handleThemeChange = () => {
    window.__setPreferredTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, [window.__theme]);

  return [theme, handleThemeChange];
};

export default useTheme;
