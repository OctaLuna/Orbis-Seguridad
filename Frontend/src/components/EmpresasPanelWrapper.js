import React from 'react';
import EmpresasPanelNuevo from './empresaPanelNuevo';

const EmpresasPanelWrapper = ({ loggedInUser }) => {
    const canEdit = loggedInUser?.idRol === 1;
    return <EmpresasPanelNuevo loggedInUser={loggedInUser} canEdit={canEdit} />;
};

export default EmpresasPanelWrapper;