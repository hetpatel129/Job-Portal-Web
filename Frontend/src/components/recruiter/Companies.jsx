import { useNavigate } from "react-router-dom";
import CompaniesTable from "./CompaniesTable";
import { useSelector } from "react-redux";
import useGetUserCompanies from "../../hooks/useGetUserCompanies";
import { Plus, Building2 } from "lucide-react";

function Companies() {
  const navigate = useNavigate();
  useGetUserCompanies();
  const { userCompanies } = useSelector((state) => state.company);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Building2 size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Companies</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {userCompanies?.length || 0} {userCompanies?.length === 1 ? "company" : "companies"} registered
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/rec/companies/create")}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <Plus size={15} /> Add Company
          </button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
