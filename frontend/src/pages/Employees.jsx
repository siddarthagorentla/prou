import React, { useEffect, useState } from 'react';
import { Plus, Mail, Briefcase, Trash2, Edit2 } from 'lucide-react';
import { endpoints } from '../config';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', role: '', department: '', avatar: 'https://i.pravatar.cc/150'
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        fetch(endpoints.employees)
            .then(res => res.json())
            .then(data => {
                setEmployees(data.data);
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(endpoints.employees, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                setShowModal(false);
                fetchEmployees();
                setFormData({ name: '', email: '', role: '', department: '', avatar: 'https://i.pravatar.cc/150' });
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`${endpoints.employees}/${id}`, { method: 'DELETE' })
                .then(() => fetchEmployees());
        }
    };

    return (
        <div className="employees-page">
            <header className="page-header flex justify-between items-center">
                <div>
                    <h1 className="text-2xl">Employees</h1>
                    <p className="text-secondary">Manage your team members</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    Add Employee
                </button>
            </header>

            <div className="employees-grid">
                {employees.map(emp => (
                    <div key={emp.id} className="card employee-card animate-fade-in">
                        <div className="employee-header">
                            <img src={emp.avatar} alt={emp.name} className="employee-avatar" />
                            <div className="employee-actions">
                                <button className="btn-icon" onClick={() => handleDelete(emp.id)}><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="employee-info">
                            <h3>{emp.name}</h3>
                            <p className="role">{emp.role}</p>
                            <div className="employee-details">
                                <div className="detail-item">
                                    <Briefcase size={14} />
                                    <span>{emp.department}</span>
                                </div>
                                <div className="detail-item">
                                    <Mail size={14} />
                                    <span>{emp.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal card">
                        <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                className="input"
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                className="input"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <input
                                className="input"
                                placeholder="Role"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                required
                            />
                            <input
                                className="input"
                                placeholder="Department"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                required
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Employee</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
