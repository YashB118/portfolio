import { useCallback, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills'   },
  { to: '/contact',  label: 'Contact'  }
];

export default function MobileMenu() {
  const location = useLocation();
  const closeBtnRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const close = useCallback(() => {
    const panel = document.getElementById('menu-panel');
    if (panel) panel.classList.remove('open');
    document.body.classList.remove('menu-open');
  }, []);

  useEffect(() => { close(); }, [location, close]);

  useEffect(() => {
    const panel = document.getElementById('menu-panel');
    if (!panel) return undefined;

    const observer = new MutationObserver(() => {
      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        restoreFocusRef.current = document.activeElement;
        closeBtnRef.current?.focus();
      } else if (restoreFocusRef.current && typeof restoreFocusRef.current.focus === 'function') {
        restoreFocusRef.current.focus();
      }
    });

    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const panel = document.getElementById('menu-panel');
      if (!panel?.classList.contains('open')) return;
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  return (
    <div id="menu-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div id="menu-panel-inner">
        <button id="menu-panel-close" onClick={close} aria-label="Close menu" ref={closeBtnRef}>
          ×
        </button>

        <nav>
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} onClick={close}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="panel-contact">
          <p>Contact</p>
          <a href="mailto:yashbonde21@gmail.com">yashbonde21@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
