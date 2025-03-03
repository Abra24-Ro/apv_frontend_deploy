import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

 

 

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6 bg-white shadow-lg rounded-lg">
        {auth?._id ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </div>
  );
};

export default RutaProtegida;
