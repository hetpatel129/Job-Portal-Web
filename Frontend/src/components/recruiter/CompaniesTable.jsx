import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Globe, MapPin, CalendarDays, Building2, Clock, XCircle } from "lucide-react";

const statusConfig = {
  pending:  { icon: Clock,     color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-900/20",  label: "Pending Approval" },
  approved: { icon: Building2, color: "text-green-600",  bg: "bg-green-50 dark:bg-green-900/20",  label: "Approved" },
  rejected: { icon: XCircle,   color: "text-red-500",    bg: "bg-red-50 dark:bg-red-900/20",      label: "Rejected" },
};

function CompanyCard({ company }) {
  const navigate = useNavigate();
  const cfg = statusConfig[company.status] || statusConfig.pending;
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
              ) : (
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {company.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{company.name}</h2>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mt-1 ${cfg.bg} ${cfg.color}`}>
                <StatusIcon size={11} /> {cfg.label}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/rec/companies/${company._id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-semibold transition flex-shrink-0"
          >
            <Edit2 size={12} /> Edit
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {company.location && (
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} className="text-indigo-500" /> {company.location}
            </span>
          )}
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
              <Globe size={12} /> {company.website}
            </a>
          )}
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <CalendarDays size={12} className="text-indigo-500" />
            {new Date(company.createdAt).toLocaleDateString()}
          </span>
        </div>

        {company.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
            {company.description}
          </p>
        )}
      </div>
    </div>
  );
}

function CompaniesTable() {
  const { userCompanies } = useSelector((state) => state.company);

  if (!userCompanies || userCompanies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
          <Building2 size={28} className="text-indigo-500" />
        </div>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">No companies yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
          Click "Add Company" to register your first company.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {userCompanies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
}

export default CompaniesTable;
