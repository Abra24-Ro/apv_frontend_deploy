import { Link, useLocation } from "react-router-dom";
import { User, Lock } from "lucide-react";
const AdminNav = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-center gap-4 bg-white shadow-lg p-4 rounded-xl w-full max-w-md mx-auto">
    <Link
      to="/admin/perfil"
      className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
        location.pathname === "/admin/perfil"
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <User className="w-4 h-4" />
      Perfil
    </Link>
  
    <Link
      to="/admin/cambiar-password"
      className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
        location.pathname === "/admin/cambiar-password"
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Lock className="w-4 h-4" />
      Cambiar Contraseña
    </Link>
  </nav>
  
  );
};

export default AdminNav;
