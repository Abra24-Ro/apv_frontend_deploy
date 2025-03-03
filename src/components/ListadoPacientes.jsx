import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = ({setMostrarFormulario}) => {
  const { pacientes } = usePacientes();

  return (
    <div >
      {pacientes.length ? (
        <>
          <h2 className="font-extrabold text-3xl text-center  mb-6  text-[#A78BFA]">
            Lista de Pacientes
          </h2>
          <div className="space-y-6">
            {pacientes.map((paciente) => (
              <div key={paciente._id} >
                <Paciente paciente={paciente} setMostrarFormulario={setMostrarFormulario} />
              
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="font-black text-3xl text-gray-800">No hay pacientes</h2>
          <p className="text-gray-500 mt-3 text-lg">
            Comienza agregando pacientes{" "}
            <span className="text-indigo-600 font-semibold">y aparecerán aquí.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ListadoPacientes;
