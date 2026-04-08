import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobsAdminTable from "./JobsRecTable";
import useGetJobsAdmin from "../../hooks/useGetJobsAdmin";
import { setSearchJobByText } from "../../redux/jobSlice";
import useGetUserCompanies from "../../hooks/useGetUserCompanies";
import { Plus, Search, Briefcase } from "lucide-react";

function JobsRec() {
  useGetJobsAdmin();
  useGetUserCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Posted Jobs</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">Manage your job listings</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/rec/jobs/create")}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <Plus size={15} /> New Job
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by job title..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <JobsAdminTable />
      </div>
    </div>
  );
}

export default JobsRec;
