const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const endpoints = {
    dashboard: `${API_URL}/api/dashboard`,
    employees: `${API_URL}/api/employees`,
    tasks: `${API_URL}/api/tasks`,
};
