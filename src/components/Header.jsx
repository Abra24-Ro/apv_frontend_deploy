import { Link } from "react-router-dom";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [mostrarNav, setMostrarNav] = useState(false);

  const {cerrarSesion } = useAuth();

  const toggleNav = () => {
    setMostrarNav(!mostrarNav);
  };

  return (
    <header className="py-6 bg-[#2D2D44] shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6">
        {/* Título */}
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center lg:text-left">
          Administrador de Pacientes de{" "}
          <span className="text-[#A78BFA]">Veterinaria</span>
        </h1>

        {/* Botón para mostrar menú en móviles */}
        <button
          onClick={toggleNav}
          className="lg:hidden mt-4 p-2 bg-[#A78BFA] text-white rounded-lg shadow-md transition-all duration-300 hover:bg-[#8b6efb] flex items-center gap-2"
        >
          <FiChevronDown className={`text-lg transition-transform ${mostrarNav ? "rotate-180" : "rotate-0"}`} />
        </button>

        {/* Navegación - Oculto en móviles, visible en lg */}
        <nav className={`flex flex-col lg:flex-row items-center gap-6 mt-5 lg:mt-0 ${mostrarNav ? "flex" : "hidden lg:flex"}`}>
          <Link 
            to="/admin" 
            className="text-white text-sm md:text-base uppercase hover:text-[#A78BFA] transition-all duration-300"
          >
            Pacientes
          </Link>
          <Link 
            to="/admin/perfil" 
            className="text-white text-sm md:text-base uppercase hover:text-[#A78BFA] transition-all duration-300"
          >
            Perfil
          </Link>

          {/* Botón de Cerrar Sesión con Ícono */}
          <button 
            type="button"  
            className="flex items-center gap-2 bg-[#A78BFA] text-white px-4 py-2 rounded-lg text-sm md:text-base uppercase font-semibold hover:bg-[#8b6efb] transition-all duration-300 shadow-md"
            onClick={cerrarSesion}
          >
            <FiLogOut className="text-lg" />
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
