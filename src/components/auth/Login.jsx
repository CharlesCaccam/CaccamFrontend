import React, { useState } from 'react';
import { login } from '../../services/api';

export default function Login({ setToken }) {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Min 6 characters.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .login-page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #0a0f1e;
          overflow: hidden;
        }
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px;
          position: relative;
          background: linear-gradient(135deg, #0d1528 0%, #0a0f1e 100%);
        }
        .login-left::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .login-brand {
          text-align: center;
          animation: fadeUp 0.8s ease both;
        }
        .login-brand-icon {
          font-size: 56px;
          display: block;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.4));
        }
        .login-brand h1 {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          color: #f5e6c8;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .login-brand p {
          color: #d4af37;
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
        }
        .login-tagline {
          margin-top: 48px;
          text-align: center;
          color: rgba(255,255,255,0.3);
          font-size: 13px;
          line-height: 1.8;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .login-right {
          width: 480px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 48px;
          animation: slideIn 0.6s ease both;
        }
        .login-right h2 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #0a0f1e;
          margin-bottom: 6px;
        }
        .login-right .subtitle {
          color: #888;
          font-size: 14px;
          margin-bottom: 36px;
        }
        .field { margin-bottom: 20px; }
        .field label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .field input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e5e5e5;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          color: #111;
        }
        .field input:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }
        .field input.error { border-color: #e74c3c; }
        .field-error { font-size: 12px; color: #e74c3c; margin-top: 5px; }
        .api-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 20px;
        }
        .login-btn {
          width: 100%;
          padding: 14px;
          background: #0a0f1e;
          color: #d4af37;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: background 0.2s, transform 0.1s;
          margin-top: 8px;
        }
        .login-btn:hover { background: #1a2540; }
        .login-btn:active { transform: scale(0.98); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { width: 100%; padding: 40px 24px; }
        }
      `}</style>

      <div className="login-page">
        <div className="login-left">
          <div className="login-brand">
            <span className="login-brand-icon">🎓</span>
            <h1>Xavier University</h1>
            <p>Admin Portal</p>
          </div>
          <p className="login-tagline">
            Your complete school analytics platform.<br />
            Monitor enrollment, attendance, and more.
          </p>
        </div>

        <div className="login-right">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to access your dashboard</p>

          {apiError && <div className="api-error">{apiError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label>Email Address</label>
              <input
                name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="admin@school.edu"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label>Password</label>
              <input
                name="password" type="password" value={form.password}
                onChange={handleChange} placeholder="••••••••"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
