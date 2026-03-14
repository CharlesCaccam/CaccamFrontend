import React from 'react';
import { logout } from '../../services/api';

export default function Navbar({ setToken }) {
  const handleLogout = async () => {
    try { await logout(); } catch (_) {}
    localStorage.removeItem('token');
    setToken(null);
  };

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
          text-decoration: none;
        }
        .navbar-icon { font-size: 24px; }
        .navbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #f5e6c8;
          letter-spacing: -0.3px;
        }
        .navbar-title span { color: #d4af37; }
        .navbar-right { display: flex; align-items: center; gap: 16px; }
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
        }
        .logout-btn:hover {
          background: rgba(212,175,55,0.1);
          border-color: #d4af37;
        }
      `}</style>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-icon">🎓</span>
          <span className="navbar-title">Xavier University <span>- Ateneo de Cagayan</span></span>
        </div>
        <div className="navbar-right">
          <span className="navbar-badge">Academic Portal</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>
    </>
  );
}
