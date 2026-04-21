import { useEffect, useState, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.jsx';

const LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills'   },
  { to: '/contact',  label: 'Contact'  }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero]     = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setOnHero(window.scrollY < window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOnHero(isHome);
  }, [isHome]);

  const openMenu = useCallback(() => {
    const panel = document.getElementById('menu-panel');
    if (panel) panel.classList.add('open');
    document.body.classList.add('menu-open');
  }, []);

  const isWhite = isHome && onHero && !scrolled;

  return (
    <nav id="nav">
      <Link id="logo" to="/" className={isWhite ? 'white-logo' : ''}>
        BONDE YASH
      </Link>

      <div id="nav-right">
        <ThemeSwitcher isWhite={isWhite} />
        <ul id="nav-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  [isWhite ? 'white-nav' : '', isActive ? 'active' : ''].join(' ').trim()
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          id="burger"
          aria-label="Open menu"
          className={isWhite ? 'white-burger' : ''}
          onClick={openMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="nav-bg" className={scrolled ? 'active' : ''} />
    </nav>
  );
}
