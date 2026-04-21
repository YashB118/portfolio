import { useEffect, useState } from 'react';

function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue('--color-accent').trim() || '#6366f1',
    muted: styles.getPropertyValue('--color-green-muted').trim() || '#a5b4fc',
    text: styles.getPropertyValue('--color-text-primary').trim() || '#1e1b4b'
  };
}

export default function useThemePalette() {
  const [palette, setPalette] = useState(() => readPalette());

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setPalette(readPalette());
    update();

    const observer = new MutationObserver((mutations) => {
      const changed = mutations.some((mutation) => mutation.attributeName === 'data-theme');
      if (changed) update();
    });

    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return palette;
}
