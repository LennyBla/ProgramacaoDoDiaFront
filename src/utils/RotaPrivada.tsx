import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import autenticaStore from "../stores/autentica.store";

const RotaPrivada = observer(() => {
    return (
        autenticaStore.estaAutenticado ? <Outlet /> : <Navigate to="/login" replace />
    );
});

export default RotaPrivada;
