import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../services/api';

export default function Navbar({ setToken }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try { await logout(); } catch (_) {}
    localStorage.removeItem('token');
    setToken(null);
  };

  const navLinks = [
    { label: 'Dashboard',         path: '/' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500&display=swap');
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 32px;
          height: 64px;
          background: #0a0f1e;
          border-bottom: 1px solid rgba(212,175,55,0.15);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .navbar-icon { font-size: 24px; }
        .navbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #f5e6c8;
          letter-spacing: -0.3px;
          white-space: nowrap;
        }
        .navbar-title span { color: #d4af37; }
        .navbar-center {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #f1f5f9; background: rgba(255,255,255,0.06); }
        .nav-link.active { color: #d4af37; background: rgba(212,175,55,0.08); }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .navbar-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .logout-btn {
          padding: 8px 20px;
          background: transparent;
          color: #d4af37;
          border: 1px solid rgba(212,175,55,0.4);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .logout-btn:hover { background: rgba(212,175,55,0.1); border-color: #d4af37; }

        @media (max-width: 768px) {
          .navbar { padding: 0 16px; height: 56px; }
          .navbar-title { display: none; }
          .navbar-badge { display: none; }
          .navbar-icon { font-size: 22px; }
          .nav-link { font-size: 12px; padding: 5px 10px; }
          .logout-btn { font-size: 12px; padding: 6px 14px; }
        }
        @media (max-width: 400px) {
          .nav-link { font-size: 11px; padding: 4px 7px; }
          .logout-btn { font-size: 11px; padding: 5px 10px; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="navbar-icon">🎓</span>
          <span className="navbar-title">Xavier University <span>- Ateneo de Cagayan</span></span>
        </div>

        <div className="navbar-center">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="navbar-right">
          <span className="navbar-badge">Academic Portal</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>
    </>
  );
}
