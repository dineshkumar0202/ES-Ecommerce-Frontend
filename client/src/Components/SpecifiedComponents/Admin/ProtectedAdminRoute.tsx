import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (!isAdminLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

export default ProtectedAdminRoute;
