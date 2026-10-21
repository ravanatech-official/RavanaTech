import React, { useState } from 'react';

export type ScreenId = 'home' | 'about' | 'systems' | 'projects' | 'contact' | 'ai-lab';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, screen: ScreenId) => {
    e.preventDefault();
    onNavigate(screen);
    setMenuOpen(false);
  };

  const navItems: { id: ScreenId; label: string; isLab?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'systems', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'ai-lab', label: 'AI LAB', isLab: true }
  ];

  return (
    <header className="l-header" id="header" role="banner">
      <nav className="nav bd-grid" aria-label="Main Navigation">
        <div className="nav__brand">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className="nav__logo"
            aria-label="Ravana Tech Homepage"
          >
            RAVANA<span className="nav__logo-slash">//</span>TECH
          </a>
        </div>

        <div className={`nav__menu ${menuOpen ? 'show' : ''}`} id="nav-menu">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <a
                  href={`/${item.id === 'home' ? '' : item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`nav__link ${currentScreen === item.id ? 'active-link' : ''} ${
                    item.isLab ? 'nav__link-lab' : ''
                  }`}
                  style={item.isLab ? { border: '1px solid rgba(0, 191, 255, 0.4)', padding: '0.25rem 0.65rem', borderRadius: '4px' } : {}}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="nav__toggle"
          id="nav-toggle"
          aria-label="Toggle Navigation Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`} aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
};
