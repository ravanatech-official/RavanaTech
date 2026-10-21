import React, { useState } from 'react';

interface HeaderNavProps {
  currentScreenId: string;
  onNavigate: (screenId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ currentScreenId, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'systems', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(targetId);
  };

  return (
    <header className="l-header" id="header" role="banner">
      <nav className="nav bd-grid" aria-label="Main Navigation">
        <div className="nav__brand">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="nav__logo"
            aria-label="Ravana Tech Homepage"
          >
            RAVANA<span className="nav__logo-slash">//</span>TECH
          </a>
        </div>

        <div className={`nav__menu ${mobileMenuOpen ? 'show' : ''}`} id="nav-menu">
          <ul className="nav__list">
            {navItems.map((item) => {
              const isActive = currentScreenId === item.id;
              return (
                <li key={item.id} className="nav__item">
                  <a
                    href={`/${item.id === 'home' ? '' : item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`nav__link ${isActive ? 'active-link' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          className="nav__toggle"
          id="nav-toggle"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
};
