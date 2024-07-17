import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function RequireAuth({ allowedRoles }) {
    const token = Cookies.get('token');
    const location = useLocation();

    try {
        if (allowedRoles?.includes(jwtDecode(token)?.roles)) {
            return <Outlet />;
        } else if (jwtDecode(token)?.sub) {
            return <Navigate to='/login' state={{ from: location }} replace />;
        } else {
            return <Navigate to='/login' state={{ from: location }} replace />;
        }
    } catch (err) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }
}

export default RequireAuth;
