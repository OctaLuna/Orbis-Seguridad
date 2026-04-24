import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './navbar.jsx';
import Header from './header';
// import RevistaPage from '../screens/revistaPage.jsx';  // Commented out temporarily
import HomePage from '../screens/homePage';
import EmpresasPage from '../screens/empresasPage';
import ContactoPage from '../screens/contactoPage';
import HistoriaPage from '../screens/historiaPage';
import EquipoPage from '../screens/equipoPage.js'; // Importar el componente EquipoPage
import EditorEmpresasPage from '../screens/editorEmpresasPage';
import PanelEditorUsuarios from './panelEditorUsuarios_temp';
import FooterBar from './footerBar.js';
import { logout as logoutService } from '../services/authService';
import { setAuthToken } from '../services/api';


function RedirectDashboard() {
  useEffect(() => {
    window.open('https://snarf3.github.io/Dashboard-bicentenario/', '_blank');
  }, []);

  return (
    <div className="p-12 text-center">
      Abriendo el dashboard externo en una nueva pestaña...
    </div>
  );
}

function App() {
  const [authState, setAuthState] = useState({ user: null, token: null });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed?.token) {
          setAuthToken(parsed.token);
        }
        setAuthState(parsed);
      } catch {
        localStorage.removeItem('authData');
      }
    }
  }, []);

  const handleLogin = useCallback((authData) => {
    if (!authData?.user || !authData?.token) {
      return;
    }

    localStorage.setItem('authData', JSON.stringify(authData));
    setAuthToken(authData.token);
    setAuthState(authData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authData');
    logoutService();
    setAuthState({ user: null, token: null });
  }, []);

  const loggedInUser = authState?.user ?? null;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50/50">
        <Header 
          loggedInUser={loggedInUser} 
          onLogout={handleLogout} 
          onLogin={handleLogin} 
          toggleMobileMenu={toggleMobileMenu}
        />
        {/* CORRECCIÓN: Asegurarnos de pasar loggedInUser al Navbar */}
        <Navbar 
          loggedInUser={loggedInUser} 
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <main className="flex-grow pt-[156px] flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage loggedInUser={loggedInUser} />} />
            <Route path="/empresas" element={<EmpresasPage loggedInUser={loggedInUser} />} />
            {/* <Route path="/revistaPage" element={<RevistaPage />} /> */}
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/historia" element={<HistoriaPage />} />
            <Route path="/equipo" element={<EquipoPage />} /> {/* Nueva ruta agregada */}

            <Route
              path="/dashboards"
              element={
                loggedInUser ? (
                  <RedirectDashboard />
                ) : (
                  <div className="p-12 text-center text-accent font-bold">
                    Acceso denegado. Inicia sesión.
                  </div>
                )
              }
            />

            {loggedInUser && loggedInUser.idRol === 1 && (
              <>
                <Route path="/editor-empresas" element={<EditorEmpresasPage />} />
                <Route path="/panel-usuarios" element={<PanelEditorUsuarios />} />
              </>
            )}

            {loggedInUser && loggedInUser.idRol !== 1 && (
              <>
                <Route
                  path="/editor-empresas"
                  element={
                    <div className="p-12 text-center text-accent font-bold">
                      No tienes permisos para acceder a esta página.
                    </div>
                  }
                />
                <Route
                  path="/panel-usuarios"
                  element={
                    <div className="p-12 text-center text-accent font-bold">
                      No tienes permisos para acceder a esta página.
                    </div>
                  }
                />
              </>
            )}
          </Routes>
        </main>

        <FooterBar />
      </div>
    </Router>
  );
}

export default App;
