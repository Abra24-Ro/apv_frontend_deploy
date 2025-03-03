import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);
  const [alerta, setAlerta] = useState({});
  const [telefono, setTelefono] = useState("");
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setTelefono(paciente.telefono);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas,telefono].includes("")) {
      setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      return;
    }

   
    guardarPaciente({ nombre, propietario, email, fecha, sintomas,id ,telefono});
    setAlerta({
      msg: "Paciente guardado correctamente",
    });

   setTimeout(() => {
    setAlerta({});
   }, 2500);

    // Limpiar el formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId('');
    setTelefono('');

  };

  const { msg } = alerta;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto border border-gray-300">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        🐾 Añadir Paciente
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Nombre Mascota */}
        <div className="flex flex-col">
          <label
            className="text-gray-700 font-medium text-sm mb-2"
            htmlFor="nombre"
          >
            Nombre de la Mascota
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Ej: Max, Luna, Rocky..."
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Nombre Propietario */}
        <div className="flex flex-col">
          <label
            className="text-gray-700 font-medium text-sm mb-2"
            htmlFor="propietario"
          >
            Nombre del Propietario
          </label>
          <input
            type="text"
            id="propietario"
            placeholder="Ej: Juan Pérez"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            className="text-gray-700 font-medium text-sm mb-2"
            htmlFor="email"
          >
            Email de Contacto
          </label>
          <input
            type="email"
            id="email"
            placeholder="correo@ejemplo.com"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-gray-700 font-medium text-sm mb-2"
            htmlFor="telefono"
          >
            Telefono de Contacto
          </label>
          <input
  type="tel"
  id="telefono"
  placeholder="Ej: 987654321"
  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
  value={telefono}
  onChange={(e) => {
    const valor = e.target.value.replace(/\D/, ""); // Permite solo números
    setTelefono(valor);
  }}
  maxLength="9" // Opcional, para restringir la cantidad de dígitos
/>
        </div>

        {/* Fecha de Registro */}
        <div className="flex flex-col">
          <label
            className="text-gray-700 font-medium text-sm mb-2"
            htmlFor="fecha"
          >
            Fecha de Registro
          </label>
          <input
            type="date"
            id="fecha"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        {/* Síntomas */}
        <div className="flex flex-col">
          <label
            className="text-gray-700 font-medium text-sm mb-2"
            htmlFor="sintomas"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describa los síntomas del paciente..."
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm resize-none"
            rows="3"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        {/* Botón de Envío */}
        <input
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-md font-semibold text-sm uppercase tracking-wide shadow-md hover:bg-indigo-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          value={id ? "Editar Paciente" : "Añadir Paciente"}
        />

        {msg && <Alerta alerta={alerta} />}
      </form>
    </div>
  );
};

export default Formulario;
