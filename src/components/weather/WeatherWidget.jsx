import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getCurrentWeatherByCoords } from '../../services/weatherApi';
import ForecastDisplay from './ForecastDisplay';

const weatherEmoji = (main) => ({ Clear:'☀️',Clouds:'☁️',Rain:'🌧️',Drizzle:'🌦️',Thunderstorm:'⛈️',Snow:'❄️',Mist:'🌫️',Fog:'🌫️',Haze:'🌫️' }[main] || '🌤️');

export default function WeatherWidget() {
  const [city, setCity]         = useState('Manila');
  const [input, setInput]       = useState('');
  const [weather, setWeather]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [locating, setLocating] = useState(false);

  const fetchWeather = (cityName) => {
    setLoading(true); setError('');
    getCurrentWeather(cityName)
      .then((res) => { setWeather(res.data); setCity(cityName); })
      .catch(() => setError('City not found.'))
      .finally(() => setLoading(false));
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getCurrentWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          .then((res) => { setWeather(res.data); setCity(res.data.name); setError(''); })
          .catch(() => setError('Could not fetch location.'))
          .finally(() => setLocating(false));
      },
      () => { setError('Location denied.'); setLocating(false); }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) { fetchWeather(input.trim()); setInput(''); }
  };

  useEffect(() => { fetchWeather('Manila'); }, []);

  return (
    <>
      <style>{`
        .weather-wrap { font-family: 'DM Sans', sans-serif; }
        .weather-search {
          display: flex; gap: 8px; margin-bottom: 12px;
        }
        .weather-input {
          flex: 1; padding: 10px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #f5e6c8;
          font-size: 13px; outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .weather-input::placeholder { color: rgba(255,255,255,0.25); }
        .weather-input:focus { border-color: rgba(212,175,55,0.5); }
        .weather-search-btn {
          padding: 10px 14px;
          background: #d4af37; color: #0a0f1e;
          border: none; border-radius: 10px;
          font-size: 12px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.5px;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s;
        }
        .weather-search-btn:hover { opacity: 0.85; }
        .weather-geo-btn {
          padding: 10px 12px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; cursor: pointer;
          font-size: 16px; transition: background 0.2s;
        }
        .weather-geo-btn:hover { background: rgba(255,255,255,0.12); }
        .weather-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5; padding: 10px 14px;
          border-radius: 10px; font-size: 13px;
          margin-bottom: 10px;
        }
        .weather-card {
          background: linear-gradient(135deg, #1a2540 0%, #0f1729 100%);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 16px; padding: 22px;
          margin-bottom: 12px;
        }
        .weather-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 18px;
        }
        .weather-temp {
          font-family: 'Playfair Display', serif;
          font-size: 52px; color: #f5e6c8;
          line-height: 1; font-weight: 700;
        }
        .weather-condition {
          font-size: 15px; color: rgba(255,255,255,0.7);
          margin: 6px 0 4px; text-transform: capitalize;
        }
        .weather-city { font-size: 12px; color: #d4af37; letter-spacing: 0.5px; }
        .weather-emoji { font-size: 60px; line-height: 1; }
        .weather-details {
          display: flex; gap: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 16px;
          font-size: 12px; color: rgba(255,255,255,0.5);
        }
        .weather-detail { display: flex; align-items: center; gap: 5px; }
        .weather-skeleton {
          height: 140px; background: rgba(255,255,255,0.03);
          border-radius: 16px; margin-bottom: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
      <div className="weather-wrap">
        <form onSubmit={handleSearch} className="weather-search">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search city..." className="weather-input" />
          <button type="submit" className="weather-search-btn">Search</button>
          <button type="button" onClick={handleGeolocate} className="weather-geo-btn" disabled={locating}>📍</button>
        </form>
        {error && <div className="weather-error">{error}</div>}
        {loading ? <div className="weather-skeleton" /> : weather ? (
          <div className="weather-card">
            <div className="weather-top">
              <div>
                <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
                <p className="weather-condition">{weather.weather[0].description}</p>
                <p className="weather-city">{weather.name}, {weather.sys.country}</p>
              </div>
              <span className="weather-emoji">{weatherEmoji(weather.weather[0].main)}</span>
            </div>
            <div className="weather-details">
              <span className="weather-detail">💧 {weather.main.humidity}%</span>
              <span className="weather-detail">💨 {weather.wind.speed} m/s</span>
              <span className="weather-detail">🌡️ Feels {Math.round(weather.main.feels_like)}°C</span>
            </div>
          </div>
        ) : null}
        <ForecastDisplay city={city} />
      </div>
    </>
  );
}
