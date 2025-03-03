import { useState, useRef } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
import { AiOutlineForm } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";

const AdministrasPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const formularioRef = useRef(null); 

 
  const manejarEdicion = () => {
    setMostrarFormulario(true);
    setTimeout(() => {
      formularioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200); 
  };

  return (
    <div className="relative flex flex-col md:flex-row gap-6 p-6">
      <button
        type="button"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="font-semibold py-3 px-6 uppercase tracking-wide transition-all md:hidden flex items-center gap-2"
      >
        {mostrarFormulario ? (
          <IoCloseCircleOutline className="absolute top-3 left-3 text-[#A78BFA] hover:text-[#ed6e6e] text-2xl cursor-pointer" />
        ) : (
          <AiOutlineForm className="absolute top-3 left-3 text-[#A78BFA] text-2xl cursor-pointer" />
        )}
      </button>

      {/* Contenedor del Formulario */}
      <div
        ref={formularioRef} 
        className={`${
          mostrarFormulario ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5 transition-all duration-500 ease-in-out`}
      >
        <Formulario />
      </div>

      {/* Listado de Pacientes */}
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes setMostrarFormulario={manejarEdicion} />
      </div>
    </div>
  );
};

export default AdministrasPacientes;
