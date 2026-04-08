/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Users, Clock } from "lucide-react";

const daysAgo = (mongoTime) => {
  const diff = new Date() - new Date(mongoTime);
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

function Jobcard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-200">

      {/* Top row: time */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock size={11} /> {daysAgo(job?.createdAt)}
        </span>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mb-3">
        {job?.company?.logo ? (
          <img
            src={job.company.logo}
            alt={job.company.name}
            loading="lazy"
            className="w-11 h-11 rounded-xl object-contain border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-1 flex-shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm flex-shrink-0">
            {job?.company?.name?.charAt(0)?.toUpperCase() || <Briefcase size={16} />}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
            {job?.company?.name || "Unknown Company"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <MapPin size={10} /> {job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Title + description */}
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
        {job?.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">{job?.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Users size={10} /> {job?.position} pos
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <DollarSign size={10} /> {job?.salary} LPA
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          <Briefcase size={10} /> {job?.jobType}
        </span>
      </div>

      {/* Action */}
      <button
        onClick={() => navigate(`/jobs/jobDetails/${job._id}`)}
        className="mt-4 w-full py-2 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:border-indigo-600 transition-all"
      >
        View Details
      </button>
    </div>
  );
}

export default Jobcard;
