import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      setAuth(data);
   
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-[#10B981] font-black text-6xl leading-tight">
          Inicia Sesión y Administra tus{" "}
          <span className="text-gray-300">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-10 rounded-xl bg-[#1B263B] border border-[#415A77]">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-300 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border border-[#415A77] w-full p-3 mt-3 bg-[#0D1B2A] text-gray-300 rounded-xl focus:border-[#10B981] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-300 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu contraseña"
              className="border border-[#415A77] w-full p-3 mt-3 bg-[#0D1B2A] text-gray-300 rounded-xl focus:border-[#10B981] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-[#10B981] w-full md:w-auto py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer shadow-md hover:bg-[#0F996E] hover:shadow-lg transition-all"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-around">
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-400 hover:text-[#10B981] transition-colors"
          >
            No tienes una cuenta? Regístrate
          </Link>
          <Link
            to="/olvide-contraseña"
            className="block text-center my-5 text-gray-400 hover:text-[#10B981] transition-colors"
          >
            Olvidé mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
