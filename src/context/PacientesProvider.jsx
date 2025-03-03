import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

// eslint-disable-next-line react/prop-types
export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/pacientes", config);

        setPacientes(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    if (paciente.id) {
        try {
            const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

            // 🔹 Corregimos el map para actualizar correctamente el paciente editado
            const pacientesActualizados = pacientes.map(pacienteState => 
                pacienteState._id === paciente.id ? data : pacienteState
            );

            setPacientes(pacientesActualizados);
            setPaciente({}); // 🔹 Limpiamos el estado de paciente
        } catch (error) {
            console.log(error.response?.data?.msg || "Error al actualizar el paciente");
        }
    } else {
        try {
            const { data } = await clienteAxios.post("/pacientes", paciente, config);
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            setPacientes([pacienteAlmacenado, ...pacientes]);
        } catch (error) {
            console.log(error.response?.data?.msg || "Error al crear el paciente");
        }
    }
};


  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };


  const eliminarPaciente = async id => {
    const confirmar = confirm("¿Confirma que quieres eliminar un paciente ?");
  
    if(confirmar){
      try {
    const token = localStorage.getItem("token");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

        const pacientesActualizados = pacientes.filter(pacientesSate => pacientesSate._id !== id);
        setPacientes(pacientesActualizados);
    
       
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  }


  return (
    <PacientesContext.Provider
      value={{ pacientes, guardarPaciente, setEdicion, paciente,eliminarPaciente }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
