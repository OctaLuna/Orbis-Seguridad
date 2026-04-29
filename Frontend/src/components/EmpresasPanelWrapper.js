import React from 'react';
import EmpresasPanelNuevo from './empresaPanelNuevo';

const EmpresasPanelWrapper = ({ loggedInUser }) => {
    // Validamos para Superadmin (1) y Admin RRHH (Ej: 2)
    const canEdit = loggedInUser?.idRol === 1 || loggedInUser?.idRol === 2;
    
    return <EmpresasPanelNuevo loggedInUser={loggedInUser} canEdit={canEdit} />;
};

export default EmpresasPanelWrapper;