import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Substitua isso pela sua lógica de autenticação

    if (!isAuthenticated) {
        // Redireciona para a página de login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>; // Retorna os children apenas se autenticado
}

export default RequireAuth;
