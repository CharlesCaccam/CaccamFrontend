import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getEnrollmentTrends } from '../../services/api';

const SAMPLE = [
  { month: 'Jun', enrolled: 320 }, { month: 'Jul', enrolled: 410 },
  { month: 'Aug', enrolled: 480 }, { month: 'Sep', enrolled: 500 },
  { month: 'Oct', enrolled: 430 }, { month: 'Nov', enrolled: 390 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2540', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#d4af37', fontSize: 12, margin: 0 }}>{label}</p>
      <p style={{ color: '#f5e6c8', fontSize: 16, fontWeight: 700, margin: '4px 0 0' }}>{payload[0].value} students</p>
    </div>
  );
};

export default function EnrollmentChart() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [sample, setSample]   = useState(false);

  useEffect(() => {
    getEnrollmentTrends()
      .then((res) => setData(res.data))
      .catch(() => { setData(SAMPLE); setSample(true); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="chart-card">
      <p className="chart-title">Monthly Enrollment Trends</p>
      <p className="chart-subtitle">Students enrolled per month</p>
      {sample && <span className="notice">⚠ Using sample data</span>}
      {loading ? (
        <div style={{ height: 220, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }} />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(212,175,55,0.05)' }} />
            <Bar dataKey="enrolled" fill="#d4af37" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
