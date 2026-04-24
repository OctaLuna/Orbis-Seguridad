import React, { useEffect } from 'react';
import logo from '../assets/logo.png'; // Import the logo

const DashboardPage = () => {
  const dashboardUrl = 'https://snarf3.github.io/orbis-dashboard/';

  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(dashboardUrl, '_blank');
    }, 5000); // Increased delay to 5 seconds for a better user experience

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    window.open(dashboardUrl, '_blank');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-miles text-text-main bg-surface">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-sm brightness-75 z-10"
        style={{ backgroundImage: 'url("/media/dashboardsPage/bg.jpg")' }}
      ></div>
      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center p-5 text-center">
        <div className="bg-background bg-opacity-80 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-2xl w-full animate-fade-in-up">
          <div className="flex justify-center items-center mb-6">
            <img src={logo} alt="Logo" className="h-24" />
          </div>
          <h1 className="text-4xl font-bodoni font-bold uppercase text-primary mb-5" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
            Redirigiendo a nuestros Dashboards
          </h1>
          <p className="text-xl text-text-main mb-8">
            Estás siendo redirigido a nuestra página de dashboards. La página se abrirá en una nueva pestaña.
          </p>
          <div className="flex justify-center items-center mb-8">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <button
            onClick={handleRedirect}
            className="bg-accent text-white py-3 px-8 text-lg font-bold rounded-md cursor-pointer uppercase transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1"
          >
            Si no fue redirigido, haga clic aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
