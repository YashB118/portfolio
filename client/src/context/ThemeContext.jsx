import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme';

export const THEMES = [
  { id: 'indigo', label: 'Indigo Night' },
  { id: 'emerald', label: 'Emerald Aura' },
  { id: 'sunset', label: 'Sunset Glow' },
  { id: 'mono', label: 'Mono Slate' }
];

const ThemeContext = createContext({
  theme: THEMES[0].id,
  setTheme: () => {},
  themes: THEMES
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES.some((t) => t.id === saved) ? saved : THEMES[0].id;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
