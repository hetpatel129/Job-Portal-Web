/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Users } from "lucide-react";

function LatestJobCards({ job }) {
  const navigate = useNavigate();
  const { _id, company, title, description, position, salary, jobType, location } = job;

  return (
    <div
      onClick={() => navigate(`/jobs/jobDetails/${_id}`)}
      role="button"
      aria-label={`View details for ${title} at ${company?.name}`}
      className="group flex flex-col p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-200 cursor-pointer"
    >
      {/* Company */}
      <div className="flex items-center gap-3 mb-3">
        {company?.logo ? (
          <img src={company.logo} alt={company.name} loading="lazy" className="w-10 h-10 rounded-xl object-contain border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-1" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm flex-shrink-0">
            {company?.name?.charAt(0)?.toUpperCase() || <Briefcase size={16} />}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{company?.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <MapPin size={10} /> {location || "India"}
          </p>
        </div>
      </div>

      {/* Title + description */}
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Users size={10} /> {position} pos
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <DollarSign size={10} /> {salary} LPA
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          <Briefcase size={10} /> {jobType}
        </span>
      </div>
    </div>
  );
}

export default LatestJobCards;
