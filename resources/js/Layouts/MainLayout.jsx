import React from 'react';

export default function MainLayout({ children }) {
    return (
        <div className="container mt-5">
            {children}
        </div>
    );
}
