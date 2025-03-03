import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState(null); // Asegura que no hay un estado inicial con error
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      setCargando(true);

      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });

        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        // Evita mostrar "Token no válido" si la cuenta ya fue confirmada
        if (!cuentaConfirmada) {
          setAlerta({
            msg:
              error.response?.data?.msg ||
              "Hubo un error al confirmar la cuenta",
            error: true,
          });
        }
      } finally {
        setCargando(false);
      }
    };

    confirmarCuenta();
  }, [id, navigate]);

  return (
    <>
      <div>
        <h1 className="text-[#10B981] font-black text-4xl leading-tight text-center">
          Confirma tu Cuenta y Comienza a Administrar{" "}
          <span className="text-gray-300">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-10 md:mt-5 shadow-lg px-5 py-8 rounded-lg bg-[#1B263B] border border-[#415A77] max-w-md mx-auto text-center">
        {!cargando && alerta && !cuentaConfirmada && <Alerta alerta={alerta} />}

        {cuentaConfirmada && !alerta?.error && <Alerta alerta={alerta} />}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
