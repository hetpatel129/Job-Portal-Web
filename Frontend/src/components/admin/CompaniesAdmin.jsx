import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../utils/axiosUtility";
import { ADMIN_API_END_POINT, COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { Building2, MapPin, Globe, CalendarDays, CheckCircle2, XCircle, Trash2, Clock } from "lucide-react";

const statusStyle = {
  approved: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  rejected: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  pending:  "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
};

const CompaniesAdmin = () => {
  const { allCompanies } = useSelector((store) => store.company);
  const { token } = useSelector((store) => store.auth);
  const [companies, setCompanies] = useState(allCompanies);
  const dispatch = useDispatch();

  const updateStatus = async (id, status) => {
    try {
      const res = await apiRequest("PUT", `${ADMIN_API_END_POINT}/changeCompanyStatus/${id}`, { status }, token, dispatch);
      toast.success(res.data.message);
      setCompanies((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
    } catch { toast.error("Failed to update status."); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiRequest("DELETE", `${COMPANY_API_END_POINT}/deleteCompany/${id}`, {}, token, dispatch);
      if (res.status === 200) {
        toast.success("Company deleted");
        setCompanies((prev) => prev.filter((c) => c._id !== id));
      }
    } catch { toast.error("Failed to delete company."); }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Companies</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{companies?.length ?? 0} registered</p>
      </div>

      {companies?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <Building2 size={24} className="text-indigo-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No companies yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div key={company._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-4">

              {/* Logo + name */}
              <div className="flex items-center gap-3">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg flex-shrink-0">
                    {company.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{company.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusStyle[company.status] || statusStyle.pending}`}>
                    {company.status}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                {company.location && <div className="flex items-center gap-1.5"><MapPin size={11} className="text-indigo-400" />{company.location}</div>}
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline truncate">
                    <Globe size={11} />{company.website}
                  </a>
                )}
                <div className="flex items-center gap-1.5"><CalendarDays size={11} className="text-indigo-400" />{new Date(company.createdAt).toLocaleDateString()}</div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{company.description || "No description."}</p>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button onClick={() => updateStatus(company._id, "approved")}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 transition">
                  <CheckCircle2 size={12} /> Approve
                </button>
                <button onClick={() => updateStatus(company._id, "rejected")}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 transition">
                  <Clock size={12} /> Reject
                </button>
                <button onClick={() => handleDelete(company._id)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesAdmin;
