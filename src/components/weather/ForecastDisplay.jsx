import React, { useEffect, useState } from 'react';
import { getForecast } from '../../services/weatherApi';

const weatherEmoji = (main) => ({ Clear:'☀️',Clouds:'☁️',Rain:'🌧️',Drizzle:'🌦️',Thunderstorm:'⛈️',Snow:'❄️',Mist:'🌫️',Fog:'🌫️',Haze:'🌫️' }[main] || '🌤️');
const getDayName = (dateStr) => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(dateStr).getDay()];

export default function ForecastDisplay({ city }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    getForecast(city)
      .then((res) => {
        const daily = {};
        res.data.list.forEach((item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!daily[date] || item.dt_txt.includes('12:00:00')) daily[date] = item;
        });
        setForecast(Object.values(daily).slice(0, 5));
      })
      .catch(() => setForecast([]))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <div style={{ height: 100, background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)' }} />;
  if (!forecast.length) return null;

  return (
    <>
      <style>{`
        .forecast-card {
          background: #0f1729;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px; padding: 18px;
        }
        .forecast-title {
          font-size: 12px; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 1.5px;
          margin: 0 0 14px; font-weight: 500;
        }
        .forecast-row {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }
        .forecast-day {
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; padding: 12px 4px;
          transition: background 0.2s, border-color 0.2s;
        }
        .forecast-day:hover {
          background: rgba(212,175,55,0.05);
          border-color: rgba(212,175,55,0.2);
        }
        .forecast-dayname { font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 600; }
        .forecast-icon { font-size: 22px; }
        .forecast-temp { font-size: 14px; font-weight: 700; color: #f5e6c8; }
        .forecast-desc { font-size: 9px; color: rgba(255,255,255,0.3); text-align: center; }
      `}</style>
      <div className="forecast-card">
        <p className="forecast-title">5-Day Forecast</p>
        <div className="forecast-row">
          {forecast.map((item) => (
            <div key={item.dt} className="forecast-day">
              <span className="forecast-dayname">{getDayName(item.dt_txt)}</span>
              <span className="forecast-icon">{weatherEmoji(item.weather[0].main)}</span>
              <span className="forecast-temp">{Math.round(item.main.temp)}°C</span>
              <span className="forecast-desc">{item.weather[0].main}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
