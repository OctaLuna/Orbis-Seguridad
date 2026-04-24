import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Importación de los estilos globales.
// Esta línea es fundamental para que Tailwind funcione.
import './index.css';

// 2. Importación del componente principal App.
// CORRECCIÓN: Ajustamos la ruta para que apunte a la carpeta 'components',
// ya que tu archivo App.js se encuentra allí.
import App from './components/App';

// 3. Renderizado de la aplicación en el DOM.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

