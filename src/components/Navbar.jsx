/* UI UPGRADE: Enhanced Navbar with Dark/Light Theme Toggle and Active Section Spy */
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    // UI UPGRADE: Initialize theme respecting localStorage and system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // UI UPGRADE: Synchronize data-theme on html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // UI UPGRADE: Scroll spy to highlight active nav link
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'skills', 'education', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => setIsOpen(false);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo" aria-label="Home">
          Keiphil<span>.</span>
        </a>

        <div className="navbar__actions-group">
          <div id="nav-menu" className={`navbar__links${isOpen ? ' open' : ''}`}>
            {NAV_LINKS.map(({ label, href }) => {
              const targetId = href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <a
                  key={href}
                  href={href}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  onClick={handleLinkClick}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* UI UPGRADE: Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              /* Sun Icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon Icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className={`navbar__toggle${isOpen ? ' open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
