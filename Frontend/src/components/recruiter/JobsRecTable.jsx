import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Users, Briefcase, CalendarDays } from "lucide-react";

function JobsRecTable() {
  const { alljobsAdmin, searchJobByText } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (alljobsAdmin?.length) {
      setFilterJobs(
        alljobsAdmin.filter((job) =>
          searchJobByText
            ? job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
            : true
        )
      );
    } else {
      setFilterJobs([]);
    }
  }, [alljobsAdmin, searchJobByText]);

  if (filterJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
          <Briefcase size={28} className="text-indigo-500" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 font-semibold">No jobs found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {searchJobByText ? `No results for "${searchJobByText}"` : "Post your first job to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Desktop table header */}
      <div className="hidden sm:grid grid-cols-12 px-5 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        <div className="col-span-3">Company</div>
        <div className="col-span-4">Role</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      {/* Desktop rows */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {filterJobs.map((job) => (
          <div key={job._id}>
            {/* Desktop row */}
            <div className="hidden sm:grid grid-cols-12 items-center px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
              <div className="col-span-3 flex items-center gap-3">
                {job?.company?.logo ? (
                  <img src={job.company.logo} loading="lazy" alt={job.company.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs flex-shrink-0">
                    {job?.company?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{job?.company?.name || "N/A"}</span>
              </div>
              <div className="col-span-4">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{job.title}</span>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400"><Users size={10} /> {job?.application?.length ?? 0} applicants</div>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 text-xs text-gray-400"><CalendarDays size={12} />{new Date(job.createdAt).toLocaleDateString()}</div>
              <div className="col-span-3 flex items-center justify-end gap-2">
                <button onClick={() => navigate(`/rec/jobs/${job._id}`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => navigate(`/rec/jobs/${job._id}/applicants`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition">
                  <Users size={12} /> Applicants
                </button>
              </div>
            </div>

            {/* Mobile card */}
            <div className="sm:hidden p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {job?.company?.logo ? (
                  <img src={job.company.logo} loading="lazy" alt={job.company.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                    {job?.company?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{job.title}</p>
                  <p className="text-xs text-gray-500 truncate">{job?.company?.name}</p>
                  <p className="text-xs text-gray-400">{job?.application?.length ?? 0} applicants · {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => navigate(`/rec/jobs/${job._id}`)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600"><Edit2 size={14} /></button>
                <button onClick={() => navigate(`/rec/jobs/${job._id}/applicants`)} className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600"><Users size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsRecTable;
