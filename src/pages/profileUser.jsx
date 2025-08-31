import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { GraphService } from "../service/graph";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Building, MapPin, Globe, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { instance, accounts } = useMsal();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      GraphService.getMe(instance)
        .then((data) => setUserData(data))
        .catch((err) =>
          console.error("Error al obtener datos del usuario:", err)
        );
    }
  }, [accounts, instance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Bienvenido a tu perfil
        </h1>

        <button
          onClick={() => navigate("/graphExamples")}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          Ir a mis últimos mails <ArrowRight className="w-5 h-5" />
        </button>

        {userData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <User className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Nombre:</strong> {userData.displayName}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Mail className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Email:</strong>{" "}
              {userData.mail || userData.userPrincipalName}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Building className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Puesto:</strong> {userData.jobTitle || "No definido"}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Phone className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Teléfono:</strong>{" "}
              {userData.mobilePhone || "No disponible"}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Phone className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Oficina:</strong>{" "}
              {userData.businessPhones?.[0] || "No disponible"}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Building className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Departamento:</strong>{" "}
              {userData.department || "No definido"}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <MapPin className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Ciudad:</strong> {userData.city || "No definida"}
            </div>

            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Globe className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>País:</strong> {userData.country || "No definido"}
            </div>
          </div>
        ) : (
          <p className="text-slate-500">Cargando datos del usuario...</p>
        )}
      </div>
    </div>
  );
}
