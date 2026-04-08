import { MapPin, DollarSign, Briefcase, GraduationCap, Eye, Trash2 } from "lucide-react";

const JobCardForAdmin = ({ job, onDetails, onDelete }) => {
  if (!job || typeof job !== "object") return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all">
      {/* Company + title */}
      <div className="flex items-start gap-3 mb-4">
        {job?.company?.logo ? (
          <img src={job.company.logo} alt={job.company.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm flex-shrink-0">
            {job?.company?.name?.charAt(0)?.toUpperCase() || <Briefcase size={16} />}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs text-gray-400 dark:text-gray-500">{job?.company?.name || "Unknown"}</p>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{job?.title}</h3>
        </div>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 mb-4">
        {[
          { icon: MapPin,        label: job?.location },
          { icon: DollarSign,    label: `${job?.salary} LPA` },
          { icon: GraduationCap, label: `${job?.experience} yrs exp` },
          { icon: Briefcase,     label: job?.jobType },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Icon size={12} className="text-indigo-400 flex-shrink-0" />
            {label}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
        <button onClick={onDetails}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition">
          <Eye size={13} /> Details
        </button>
        <button onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition">
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
};

export default JobCardForAdmin;
