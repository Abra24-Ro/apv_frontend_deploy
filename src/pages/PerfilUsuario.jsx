import useAuth from "../hooks/useAuth";
import { Pencil } from "lucide-react";

const PerfilUsuario = ({ setFormularioPerfil, formularioPerfil }) => {
  const { auth } = useAuth();

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Perfil de Usuario
      </h2>

      <p className="text-gray-600 text-center mt-2">
        Información personal de tu cuenta.
      </p>

      <div className="mt-6 space-y-4 text-gray-700">
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Nombre:</span> {auth.nombre}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Email:</span> {auth.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Teléfono:</span> {auth.telefono || "No registrado"}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Web:</span> {auth.web || "No disponible"}
        </p>
      </div>

      {/* Mostrar el lápiz solo si el formulario NO está abierto */}
      {!formularioPerfil && (
        <div className="flex justify-end mt-6">
          <button
            className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
            onClick={() => setFormularioPerfil(true)}
          >
            <Pencil className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
