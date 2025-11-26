import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="container" style={{ padding: '2rem 1rem' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
