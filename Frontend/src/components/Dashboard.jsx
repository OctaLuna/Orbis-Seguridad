import React, { useState } from 'react';
import PanelEditorUsuarios from './panelEditorUsuarios_temp';

const ROL_ADMIN = 1;

const Dashboard = ({ usuario, onLogout }) => {
  const [panelEditorVisible, setPanelEditorVisible] = useState(false);

  const nombreRol = usuario.idRol === ROL_ADMIN ? 'Administrador' : 'Colaborador';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Panel Principal</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>Bienvenido, <strong>{usuario.usuario}</strong> ({nombreRol})</span>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#FF4201',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={onLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <h3>Contenido General</h3>
        <p>Este contenido es visible tanto para administradores como para colaboradores.</p>

  {usuario.idRol === ROL_ADMIN && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            border: '2px dashed #FF4201',
            borderRadius: '8px',
            backgroundColor: '#fff8f5',
          }}>
            <h4>Sección de Administrador</h4>
            <p>Este botón solo lo ven los administradores.</p>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#199ECA',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
              onClick={() => setPanelEditorVisible(true)}
            >
              Administrar Usuarios
            </button>
          </div>
        )}
      </main>

      {panelEditorVisible && <PanelEditorUsuarios onClose={() => setPanelEditorVisible(false)} />}
    </div>
  );
};

export default Dashboard;
