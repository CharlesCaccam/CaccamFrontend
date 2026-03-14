import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getCourseDistribution } from '../../services/api';

const COLORS = [
  '#d4af37','#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444',
  '#06b6d4','#f97316','#ec4899','#14b8a6','#84cc16','#a855f7',
  '#fb923c','#38bdf8','#4ade80','#f43f5e','#818cf8','#fbbf24',
  '#34d399','#60a5fa',
];

const SAMPLE = [
  { course: 'BSIT', students: 130 }, { course: 'BSCS', students: 95 },
  { course: 'BSBA', students: 75 },  { course: 'BSN', students: 60 },
  { course: 'BSED', students: 55 },  { course: 'BSEE', students: 50 },
  { course: 'BSA',  students: 45 },  { course: 'BSHM', students: 40 },
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
        // Show ALL courses, no grouping into Others
        const sorted = [...res.data].sort((a, b) => b.students - a.students);
        setData(sorted);
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
        <div style={{ height: 360, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }} />
      ) : (
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie
              data={data}
              dataKey="students"
              nameKey="course"
              cx="50%"
              cy="45%"
              outerRadius={75}
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, percent }) => {
                if (percent < 0.03) return null;
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 14;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="rgba(255,255,255,0.8)" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />\
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v) => (
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{v}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
