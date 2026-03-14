import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import EnrollmentChart from './EnrollmentChart';
import CourseDistributionChart from './CourseDistributionChart';
import AttendanceChart from './AttendanceChart';
import WeatherWidget from '../weather/WeatherWidget';
import { getDashboardSummary } from '../../services/api';

const SAMPLE_SUMMARY = { totalStudents: 500, totalCourses: 20, attendanceRate: '94.2%', schoolDays: 180 };

const StatCard = ({ icon, label, value, color, delay }) => (
  <div className="stat-card" style={{ animationDelay: delay, borderTop: `3px solid ${color}` }}>
    <div className="stat-icon" style={{ background: `${color}18`, color }}>{icon}</div>
    <div className="stat-info">
      <p className="stat-value">{value ?? '—'}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

export default function Dashboard({ setToken }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getDashboardSummary()
      .then((res) => setSummary(res.data))
      .catch(() => setSummary(SAMPLE_SUMMARY));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        .dashboard-page {
          min-height: 100vh;
          background: #080d1a;
          font-family: 'DM Sans', sans-serif;
        }
        .dashboard-main {
          padding: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .dashboard-header {
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease both;
        }
        .dashboard-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          color: #f5e6c8;
          letter-spacing: -0.3px;
        }
        .dashboard-header p {
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          margin-top: 4px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: #0f1729;
          border-radius: 14px;
          padding: 20px 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(255,255,255,0.05);
          animation: fadeUp 0.5s ease both;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .stat-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
        }
        .stat-value {
          font-size: 26px; font-weight: 700;
          color: #f5e6c8; margin: 0;
          font-family: 'Playfair Display', serif;
        }
        .stat-label {
          font-size: 12px; color: rgba(255,255,255,0.4);
          margin: 3px 0 0; text-transform: uppercase; letter-spacing: 0.8px;
        }
        .content-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
          align-items: start;
        }
        .charts-col { display: flex; flex-direction: column; gap: 20px; }
        .charts-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }
        .chart-card {
          background: #0f1729;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          animation: fadeUp 0.5s ease both;
          transition: box-shadow 0.2s;
        }
        .chart-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .chart-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; color: #f5e6c8;
          margin: 0 0 4px;
        }
        .chart-subtitle {
          font-size: 12px; color: rgba(255,255,255,0.3);
          margin: 0 0 20px;
        }
        .notice {
          font-size: 11px; color: #f59e0b;
          margin-bottom: 8px; display: block;
        }
        .weather-col { position: sticky; top: 80px; }
        .weather-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; color: #f5e6c8;
          margin: 0 0 14px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Tablet */
        @media (max-width: 1100px) {
          .content-layout { grid-template-columns: 1fr; }
          .weather-col { position: static; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .dashboard-main { padding: 16px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .charts-row { grid-template-columns: 1fr; }
          .stat-value { font-size: 20px; }
          .stat-icon { width: 40px; height: 40px; font-size: 18px; }
          .stat-card { padding: 14px 16px; gap: 12px; }
          .dashboard-header h2 { font-size: 20px; }
        }

        /* Small mobile */
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dashboard-page">
        <Navbar setToken={setToken} />
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h2>School Overview</h2>
            <p>Academic year analytics and real-time data</p>
          </div>

          <div className="stats-grid">
            <StatCard icon="👨‍🎓" label="Total Students"  value={summary?.totalStudents}  color="#d4af37" delay="0.1s" />
            <StatCard icon="📚" label="Courses Offered" value={summary?.totalCourses}   color="#3b82f6" delay="0.15s" />
            <StatCard icon="✅" label="Attendance Rate" value={summary?.attendanceRate} color="#10b981" delay="0.2s" />
            <StatCard icon="📅" label="School Days"     value={summary?.schoolDays}     color="#f59e0b" delay="0.25s" />
          </div>

          <div className="content-layout">
            <div className="charts-col">
              <div className="charts-row">
                <EnrollmentChart />
                <CourseDistributionChart />
              </div>
              <AttendanceChart />
            </div>
            <div className="weather-col">
              <p className="weather-title">Weather Forecast</p>
              <WeatherWidget />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
