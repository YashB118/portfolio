import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeSwitcher({ isWhite = false }) {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        type="button"
        className={`theme-switcher-trigger${isWhite ? ' white' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="theme-switcher-menu"
        aria-label="Change site theme"
      >
        Theme
      </button>

      {open ? (
        <div className="theme-switcher-menu" role="menu" aria-label="Theme options" id="theme-switcher-menu">
          {themes.map((option) => (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={option.id === theme}
              key={option.id}
              className={`theme-option${option.id === theme ? ' active' : ''}`}
              onClick={() => {
                setTheme(option.id);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
