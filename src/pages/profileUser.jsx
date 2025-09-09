import React from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useApiUser } from "../hooks/useApi";
import { useGraphMe } from "../hooks/useGraph";
import {
  User, Mail, Phone, Building, MapPin, Globe, ArrowRight,
} from "lucide-react";

export default function ProfileUser() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  
  // Using your existing hooks
  const { data: apiData, isLoading: apiLoading, error: apiError } = useApiUser(instance);
  const { data: graphData, isLoading: graphLoading, error: graphError } = useGraphMe(instance);

  const isLoading = apiLoading || graphLoading;
  const error = apiError || graphError;

  // Use Graph data as primary source, API data as secondary
  const userData = graphData;

  const handleNavigateToMails = () => {
    navigate("/graphExamples");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8 flex items-center justify-center">
        <div className="text-xl text-indigo-600">Cargando datos del usuario...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-100 p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-xl text-red-600 mb-4">Error al cargar datos</div>
          <div className="text-sm text-gray-600">
            {error.message || 'Error desconocido'}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">
            Bienvenido a tu perfil
          </h1>
          
          {/* Debug info - remove in production */}
          <div className="text-xs text-gray-500">
            <div>API: {apiData ? '✅' : '❌'}</div>
            <div>Graph: {graphData ? '✅' : '❌'}</div>
          </div>
        </div>

        <button
          onClick={handleNavigateToMails}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          Ir a mis últimos mails <ArrowRight className="w-5 h-5" />
        </button>

        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <User className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Nombre:</strong> {userData.displayName}
            </div>
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Mail className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Email:</strong> {userData.mail || userData.userPrincipalName}
            </div>
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Building className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Puesto:</strong> {userData.jobTitle || "No definido"}
            </div>
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Phone className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Teléfono:</strong> {userData.mobilePhone || "No disponible"}
            </div>
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Phone className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Oficina:</strong> {userData.businessPhones?.[0] || "No disponible"}
            </div>
            <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <Building className="w-5 h-5 text-indigo-500 inline mr-2" />
              <strong>Departamento:</strong> {userData.department || "No definido"}
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
        )}
      </div>
    </div>
  );
}