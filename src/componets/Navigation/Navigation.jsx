import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
  { to: '/team', label: 'Team', icon: '👥' },
  { to: '/liked-users', label: 'Favorites', icon: '❤️' },
  { to: '/users', label: 'Users', icon: '🧑‍💻' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link" aria-label="InstaBoard Home">
          <span className="brand-icon">📊</span> InstaBoard
        </Link>
      </div>

      <div className="nav-links">
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`nav-link ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;