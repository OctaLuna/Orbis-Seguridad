
import React from 'react';
import PanelEditorEmpresas from '../components/panelEditorEmpresas';

const EditorEmpresasPage = () => {
  return (
  <div className="min-h-screen bg-[#0000] p-4" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      <PanelEditorEmpresas />
    </div>
  );
};

export default EditorEmpresasPage;
  