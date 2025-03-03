import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "./AdminNav";
import Alerta from "../components/Alerta";
import PerfilUsuario from "./PerfilUsuario";
import { X } from "lucide-react";

const EditarPerfil = () => {
  const [perfil, setPerfil] = useState({});
  const { auth, actualizarPerfil } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [formularioPerfil, setFormularioPerfil] = useState(false);

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });
      return;
    }

    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);

    if (!resultado.error) {
      setTimeout(() => {
        setFormularioPerfil(false);
      }, 2000);
    }

    setTimeout(() => {
      setAlerta({});
    }, 2500);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <PerfilUsuario
        setFormularioPerfil={setFormularioPerfil}
        formularioPerfil={formularioPerfil}
      />

      {formularioPerfil && (
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 border border-gray-200">
          {/* Botón de cerrar con la X */}
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-600 hover:text-red-600 transition-all duration-300 cursor-pointer"
              onClick={() => setFormularioPerfil(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Editar Perfil
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Modifica tu{" "}
            <span className="text-indigo-600 font-semibold">
              información aquí
            </span>
            .
          </p>

          {msg && <Alerta alerta={alerta} />}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Tu nombre"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* Sitio Web */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Sitio Web
              </label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="https://tusitio.com"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="+51 987 654 321"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="tucorreo@email.com"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditarPerfil;
