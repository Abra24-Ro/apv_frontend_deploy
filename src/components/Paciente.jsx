import { Pencil, Trash2 } from "lucide-react";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente ,setMostrarFormulario}) => {
  const { nombre, propietario, telefono, fecha, sintomas, _id,email } = paciente;

  const { setEdicion,eliminarPaciente } = usePacientes();

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-PE", { dateStyle: "long" }).format(nuevaFecha);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">
          <span className="text-gray-900 font-bold">Nombre:</span> {nombre}
        </p>
        <p className="text-gray-700 font-medium">
          <span className="text-gray-900 font-bold">Propietario:</span> {propietario}
        </p>
        <p className="text-gray-700 font-medium">
          <span className="text-gray-900 font-bold">Teléfono:   </span> +51{telefono}
        </p>
        <p className="text-gray-700 font-medium">
          <span className="text-gray-900 font-bold">Email:</span> {email}
        </p>
        <p className="text-gray-700 font-medium">
          <span className="text-gray-900 font-bold">Fecha:</span> {formatearFecha(fecha)}
        </p>
        <p className="text-gray-700 font-medium">
          <span className="text-gray-900 font-bold">Síntomas:</span> {sintomas}
        </p>
      </div>

     
      <div className="flex justify-end gap-6 mt-6">
        <button
          type="button"
          className="text-gray-600 transition-all duration-300 hover:text-blue-600 hover:scale-110 cursor-pointer"
          onClick={() => {
            setEdicion(paciente);
            setMostrarFormulario(); // 🔹 Abre el formulario al editar
          }}
          
       >
          <Pencil className="w-6 h-6" />
        </button>
        <button
          type="button"
          className="text-gray-600 transition-all duration-300 hover:text-red-600 hover:scale-110 cursor-pointer"
          onClick={() => eliminarPaciente(_id)}
       >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Paciente;
