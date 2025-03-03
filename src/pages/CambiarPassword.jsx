import { useState } from "react";
import Alerta from "../components/Alerta";
import AdminNav from "./AdminNav";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const navigate = useNavigate();
  const { guardarPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({}); // Limpia la alerta anterior

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    const respuesta = await guardarPassword(password); // Esperar la respuesta correctamente
    setAlerta(respuesta);

    if (!respuesta.error) {
      // Si la contraseña se actualizó correctamente, redirigir a /admin después de 2 segundos
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    }
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Cambiar Contraseña
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Modifica tu{" "}
          <span className="text-indigo-600 font-semibold">contraseña aquí</span>
          .
        </p>

        {msg && <Alerta alerta={alerta} />}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña actual"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="pwd_actual"
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="pwd_nuevo"
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default CambiarPassword;
