import React, { useState } from "react";
import EmpresasPanelWrapper from '../components/EmpresasPanelWrapper';
import RegistrationModal from '../components/RegistrationModal'; // Asegúrate de copiar este archivo a tus componentes
import { PlusIcon } from '@heroicons/react/24/outline';

const EmpresasPage = ({ loggedInUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Validamos si tiene permisos para ver el botón de añadir
  const isAdmin = loggedInUser?.idRol === 1;

  return (
    <div className="w-full bg-background flex flex-col flex-grow" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      
      {/* SECCIÓN DE CONTROLES DE ADMINISTRADOR */}
      {isAdmin && (
        <div className="max-w-7xl mx-auto w-full px-4 pt-8 pb-2 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#2C5282] text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-[#244872] transition-colors font-bold tracking-wide"
          >
            <PlusIcon className="w-6 h-6" />
            Añadir Nueva Empresa
          </button>
        </div>
      )}

      {/* COMPONENTE PRINCIPAL QUE RENDERIZA LAS CARTAS */}
      <EmpresasPanelWrapper loggedInUser={loggedInUser} />

      {/* EL MODAL DE 7 PASOS IMPORTADO DEL OTRO PROYECTO */}
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
};

export default EmpresasPage;