import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({ msg: "La contraseña debe tener al menos 6 caracteres", error: true });
      return;
    }
    setAlerta({});
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password });
      setAlerta({ msg: "Cuenta creada con éxito, revisa tu correo", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-[#10B981] font-black text-6xl leading-tight">
          Crea tu cuenta y Administra tus {" "}
          <span className="text-gray-300">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-8 rounded-xl bg-[#1B263B] border border-[#415A77]">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-300 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border border-[#415A77] w-full p-3 mt-3 bg-[#0D1B2A] text-gray-300 rounded-xl focus:border-[#10B981] focus:outline-none"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

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
              Contraseña
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
            value="Crear Cuenta"
            className="bg-[#10B981] w-full md:w-auto py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer shadow-md hover:bg-[#0F996E] hover:shadow-lg transition-all"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-around">
          <Link
            to="/"
            className="block text-center my-5 text-gray-400 hover:text-[#10B981] transition-colors"
          >
            ¿Ya tienes cuenta? Inicia sesión
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

export default Registrar;
