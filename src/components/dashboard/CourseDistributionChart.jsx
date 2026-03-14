import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getCourseDistribution } from '../../services/api';

const COLORS = ['#d4af37','#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#f97316','#6b7280'];

const SAMPLE = [
  { course: 'BSIT', students: 130 }, { course: 'BSCS', students: 95 },
  { course: 'BSBA', students: 75 },  { course: 'BSN', students: 60 },
  { course: 'BSED', students: 55 },  { course: 'Others', students: 85 },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2540', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#d4af37', fontSize: 12, margin: 0 }}>{payload[0].name}</p>
      <p style={{ color: '#f5e6c8', fontSize: 16, fontWeight: 700, margin: '4px 0 0' }}>{payload[0].value} students</p>
    </div>
  );
};

export default function CourseDistributionChart() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [sample, setSample]   = useState(false);

  useEffect(() => {
    getCourseDistribution()
      .then((res) => {
        const sorted = [...res.data].sort((a, b) => b.students - a.students);
        const top8 = sorted.slice(0, 8);
        const rest = sorted.slice(8).reduce((s, c) => s + c.students, 0);
        if (rest > 0) top8.push({ course: 'Others', students: rest });
        setData(top8);
      })
      .catch(() => { setData(SAMPLE); setSample(true); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="chart-card">
      <p className="chart-title">Course Distribution</p>
      <p className="chart-subtitle">Students per program</p>
      {sample && <span className="notice">⚠ Using sample data</span>}
      {loading ? (
        <div style={{ height: 220, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }} />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="students" nameKey="course" cx="50%" cy="45%" outerRadius={75} labelLine={false}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle" iconSize={8}
              formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
