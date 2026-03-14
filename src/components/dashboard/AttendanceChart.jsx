import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAttendanceData } from '../../services/api';

const SAMPLE = [
  { day: 'Week 1', present: 480, absent: 20 }, { day: 'Week 2', present: 465, absent: 35 },
  { day: 'Week 3', present: 490, absent: 10 }, { day: 'Week 4', present: 455, absent: 45 },
  { day: 'Week 5', present: 470, absent: 30 }, { day: 'Week 6', present: 488, absent: 12 },
  { day: 'Week 7', present: 445, absent: 55 }, { day: 'Week 8', present: 460, absent: 40 },
  { day: 'Week 9', present: 492, absent: 8 },  { day: 'Week 10', present: 478, absent: 22 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2540', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 10, padding: '12px 16px' }}>
      <p style={{ color: '#d4af37', fontSize: 12, margin: '0 0 8px' }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontSize: 13, margin: '2px 0', fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function AttendanceChart() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [sample, setSample]   = useState(false);

  useEffect(() => {
    getAttendanceData()
      .then((res) => setData(res.data))
      .catch(() => { setData(SAMPLE); setSample(true); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="chart-card">
      <p className="chart-title">Attendance Over School Days</p>
      <p className="chart-subtitle">Weekly present vs absent breakdown</p>
      {sample && <span className="notice">⚠ Using sample data</span>}
      {loading ? (
        <div style={{ height: 220, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }} />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{v}</span>}
            />
            <Line type="monotone" dataKey="present" name="Present" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="absent"  name="Absent"  stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
