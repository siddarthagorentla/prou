import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, Layers } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Layers size={28} className="logo-icon" />
                <span className="logo-text">TaskFlow</span>
            </div>
            <div className="navbar-links">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/employees" className={`nav-link ${isActive('/employees') ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Employees</span>
                </Link>
                <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
                    <CheckSquare size={20} />
                    <span>Tasks</span>
                </Link>
            </div>
            <div className="navbar-user">
                <img src="https://i.pravatar.cc/150?u=admin" alt="User" className="user-avatar" />
            </div>
        </nav>
    );
};

export default Navbar;
