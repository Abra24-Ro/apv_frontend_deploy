import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setpasswordModificado] = useState(false);
  const [redireccionar, setRedireccionar] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprabarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu Nueva Contraseña",
        });
        setTokenValido(true);
      } catch (error) {
        console.log(error)
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };

    comprabarToken();
  }, []);

  useEffect(() => {
    if (passwordModificado) {
      setTimeout(() => {
        setRedireccionar(true);
      }, 2000);
    }
  }, [passwordModificado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
      });

      setpasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  if (redireccionar) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>
        <h1 className="text-[#10B981] font-black text-6xl leading-tight">
          Restablece tu contraseña y recupera tus{" "}
          <span className="text-gray-300">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-8 rounded-xl bg-[#1B263B] border border-[#415A77]">
        {alerta.msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-300 block text-xl font-bold">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  placeholder="Tu contraseña"
                  className="border border-[#415A77] w-full p-3 mt-3 bg-[#0D1B2A] text-gray-300 rounded-xl focus:border-[#10B981] focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="my-5">
                <label className="uppercase text-gray-300 block text-xl font-bold">
                  Repetir Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Confirma tu contraseña"
                  className="border border-[#415A77] w-full p-3 mt-3 bg-[#0D1B2A] text-gray-300 rounded-xl focus:border-[#10B981] focus:outline-none"
                  value={repetirPassword}
                  onChange={(e) => setRepetirPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Nueva Contraseña"
                className="bg-[#10B981] w-full md:w-auto py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer shadow-md hover:bg-[#0F996E] hover:shadow-lg transition-all"
              />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
