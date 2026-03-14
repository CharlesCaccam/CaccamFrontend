import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Only redirect to login on 401 if it's NOT the login endpoint itself
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (credentials) => api.post('/login', credentials);
export const logout = () => api.post('/logout');

// ── Dashboard data ────────────────────────────────────────────────────────────
export const getEnrollmentTrends = () => api.get('/dashboard/enrollment-trends');
export const getCourseDistribution = () => api.get('/dashboard/course-distribution');
export const getAttendanceData = () => api.get('/dashboard/attendance');
export const getDashboardSummary = () => api.get('/dashboard/summary');

export default api;
