import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { GraphService } from "../../service/graph";
import { QueryService } from "../../util/querys";
import { Mail } from "lucide-react";

export default function BandejaDeEntrada() {
  const { accounts, instance } = useMsal();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);

      const query = QueryService.buildQuery({
        $top: "12",
        $orderby: "receivedDateTime desc",
      });

      GraphService.getMail(instance, query)
        .then((data) => setEmails(data.value || []))
        .catch((err) => console.error("Error al obtener correos:", err));
    }
  }, [accounts, instance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center mb-6">
          <Mail className="w-6 h-6 text-indigo-600 mr-2" /> Últimos Correos
        </h2>

        {emails.length > 0 ? (
          <ul className="space-y-4">
            {emails.map((mail) => (
              <li
                key={mail.id}
                className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-slate-50"
              >
                <h3 className="font-semibold text-slate-700 truncate">
                  {mail.subject || "(Sin asunto)"}
                </h3>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">
                    {mail.from?.emailAddress?.name}
                  </span>{" "}
                  — {mail.from?.emailAddress?.address}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-center">
            No hay correos disponibles o aún se están cargando...
          </p>
        )}
      </div>
    </div>
  );
}
