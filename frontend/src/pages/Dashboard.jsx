import React, { useEffect, useState } from 'react';
import { Users, CheckCircle, Clock } from 'lucide-react';
import { endpoints } from '../config';
import './Dashboard.css';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card stat-card animate-fade-in">
        <div className="stat-icon" style={{ backgroundColor: `rgba(${color}, 0.2)`, color: `rgb(${color})` }}>
            <Icon size={24} />
        </div>
        <div className="stat-info">
            <h3>{value}</h3>
            <p>{title}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(endpoints.dashboard)
            .then(res => res.json())
            .then(data => {
                setStats(data.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="dashboard">
            <header className="page-header">
                <h1 className="text-2xl">Dashboard</h1>
                <p className="text-secondary">Overview of your team and tasks</p>
            </header>

            <div className="stats-grid">
                <StatCard
                    title="Total Employees"
                    value={stats.total_employees}
                    icon={Users}
                    color="99, 102, 241" // Indigo
                />
                <StatCard
                    title="Total Tasks"
                    value={stats.total_tasks}
                    icon={CheckCircle}
                    color="236, 72, 153" // Pink
                />
                <StatCard
                    title="Pending Tasks"
                    value={stats.task_distribution.find(t => t.status === 'Todo')?.count || 0}
                    icon={Clock}
                    color="234, 179, 8" // Yellow
                />
            </div>

            <div className="dashboard-content">
                <div className="card recent-activity">
                    <h2 className="text-xl font-bold mb-4">Task Distribution</h2>
                    <div className="distribution-bars">
                        {stats.task_distribution.map(item => (
                            <div key={item.status} className="dist-item">
                                <div className="dist-label">
                                    <span>{item.status}</span>
                                    <span>{item.count}</span>
                                </div>
                                <div className="dist-bar-bg">
                                    <div
                                        className="dist-bar-fill"
                                        style={{
                                            width: `${(item.count / stats.total_tasks) * 100}%`,
                                            backgroundColor: item.status === 'Done' ? '#4ade80' : item.status === 'In Progress' ? '#818cf8' : '#94a3b8'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
