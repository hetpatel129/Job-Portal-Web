import { useDispatch, useSelector } from "react-redux";
import JobCardForAdmin from "./JobCardForAdmin";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { toast } from "sonner";
import { useState } from "react";
import { Briefcase, Search } from "lucide-react";

const JobAdmin = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { token } = useSelector((store) => store.auth);
  const [jobs, setJobs] = useState(allJobs);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const res = await apiRequest("DELETE", `${JOB_API_END_POINT}/deleteJob/${id}`, {}, token, dispatch);
      if (res.status === 200) {
        toast.success("Job deleted successfully");
        setJobs((prev) => prev.filter((j) => j._id !== id));
      }
    } catch { toast.error("Failed to delete job"); }
  };

  const filtered = jobs?.filter((j) =>
    search ? j?.title?.toLowerCase().includes(search.toLowerCase()) || j?.company?.name?.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Administration</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{jobs?.length ?? 0} total jobs</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-56"
          />
        </div>
      </div>

      {filtered?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <Briefcase size={24} className="text-indigo-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No jobs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCardForAdmin
              key={job._id} job={job}
              onDetails={() => navigate(`/admin/jobdetails/${job._id}`)}
              onDelete={() => handleDelete(job._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobAdmin;
