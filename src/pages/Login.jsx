import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function Login() {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);

      if (response && response.account) {
        console.log("Usuario:", response.account);
        console.log("Token:", response.accessToken);

        sessionStorage.setItem("token", response.accessToken);
        navigate("/profileUser");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
        {/* Logo / título */}
        <div className="mb-8">
          <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">MS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Iniciar Sesión
          </h1>
          <p className="text-gray-500 text-sm">
            Accede con tu cuenta Microsoft
          </p>
        </div>

        {/* Botón de login con MSAL */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Iniciar sesión con Microsoft
        </button>

        {/* Texto de pie */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Universidad San Martín de Porres <br />
            Facultad de Ingeniería y Arquitectura
          </p>
        </div>
      </div>
    </div>
  );
}
