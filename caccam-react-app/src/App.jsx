import './App.css'

function App() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">
          <span className="login-avatar-icon">👤</span>
        </div>

        <form className="login-form">
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔐</span>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-password">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
