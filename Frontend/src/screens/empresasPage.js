// src/screens/empresasPage.js
import React from "react";
//import EmpresasPanel from "../components/empresasPanel";
import EmpresasPanelWrapper from '../components/EmpresasPanelWrapper';

const EmpresasPage = ({ loggedInUser }) => {
  return (
  <div className="w-full bg-background flex flex-col flex-grow" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      <EmpresasPanelWrapper loggedInUser={loggedInUser} />
    </div>
  );
};

export default EmpresasPage;
