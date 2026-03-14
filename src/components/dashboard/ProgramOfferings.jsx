import { useState, useEffect } from 'react';
import { getCourses } from '../../services/api';

export default function ProgramOfferings() {
  const [courses, setCourses]       = useState([]);
  const [selected, setSelected]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');

  useEffect(() => {
    getCourses()
      .then((res) => {
        setCourses(res.data);
        if (res.data.length > 0) setSelected(res.data[0]);
      })
      .catch(() => setError('Failed to load courses.'))
      .finally(() => setLoading(false));
  }, []);

  const departments = [
    'All Departments',
    ...new Set(courses.map((c) => c.department).filter(Boolean)),
  ];

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.course_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code?.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All Departments' || c.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div style={{ padding: '2rem', color: '#e2e8f0', fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem', color: '#f1f5f9' }}>
        Program Offerings
      </h1>

      <div style={{ background: '#1e2433', borderRadius: '12px', padding: '1.5rem', border: '1px solid #2d3748' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#94a3b8' }}>
          Program Offerings
        </h2>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code or name..."
            style={{
              flex: 1, minWidth: '200px', background: '#0f1623', border: '1px solid #2d3748',
              borderRadius: '8px', padding: '8px 12px', color: '#e2e8f0', fontSize: '14px',
            }}
          />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{
              background: '#0f1623', border: '1px solid #2d3748', borderRadius: '8px',
              padding: '8px 12px', color: '#e2e8f0', fontSize: '14px',
            }}
          >
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        {loading && (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Loading courses...</p>
        )}
        {error && (
          <p style={{ color: '#f87171', textAlign: 'center', padding: '2rem' }}>{error}</p>
        )}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

            {/* Left: Course List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((c) => {
                const isSelected = selected?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c)}
                    style={{
                      background: isSelected ? '#162032' : '#141a27',
                      border: isSelected ? '1px solid #3b82f6' : '1px solid #2d3748',
                      borderRadius: '10px', padding: '1rem', cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>
                        {c.course_code}
                      </span>
                      {c.department && (
                        <span style={{
                          fontSize: '11px', padding: '2px 10px', borderRadius: '20px',
                          background: '#1a2a3a', color: '#60a5fa', border: '1px solid #1d4ed8', fontWeight: 500,
                        }}>
                          {c.department}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '14px', color: '#f1f5f9' }}>
                      {c.course_name}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      {c.units} units · {c.slots} slots
                    </p>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No courses found.</p>
              )}
            </div>

            {/* Right: Course Detail */}
            {selected && (
              <div style={{ background: '#141a27', border: '1px solid #2d3748', borderRadius: '10px', padding: '1.5rem' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {selected.course_code}
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', margin: '6px 0 12px' }}>
                  {selected.course_name}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#0f1623', borderRadius: '8px', padding: '12px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Department</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                      {selected.department || '—'}
                    </p>
                  </div>
                  <div style={{ background: '#0f1623', borderRadius: '8px', padding: '12px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Units</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                      {selected.units ?? '—'}
                    </p>
                  </div>
                  <div style={{ background: '#0f1623', borderRadius: '8px', padding: '12px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Available Slots</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#4ade80', fontWeight: 600 }}>
                      {selected.slots ?? '—'}
                    </p>
                  </div>
                  <div style={{ background: '#0f1623', borderRadius: '8px', padding: '12px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Course Code</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#60a5fa', fontWeight: 500 }}>
                      {selected.course_code}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
