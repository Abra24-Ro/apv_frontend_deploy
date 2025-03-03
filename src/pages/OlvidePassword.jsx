import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlerta({ msg: "El Email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        {
          email,
        }
      );

      setAlerta({
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.smg,
        error: true,
      });
    }
  };
  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-[#10B981] font-black text-6xl leading-tight">
          Recupera tu Acceso y no Pierdas
          <span className="text-gray-300"> tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-10 rounded-xl bg-[#1B263B] border border-[#415A77]">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-300 block text-xl font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de registro"
              className="border border-[#415A77] w-full p-3 mt-3 bg-[#0D1B2A] text-gray-300 rounded-xl focus:border-[#10B981] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-[#10B981] w-full md:w-auto py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer shadow-md hover:bg-[#0F996E] hover:shadow-lg transition-all"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-around">
          <Link
            to="/"
            className="block text-center my-5 text-gray-400 hover:text-[#10B981] transition-colors"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-400 hover:text-[#10B981] transition-colors"
          >
            No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
