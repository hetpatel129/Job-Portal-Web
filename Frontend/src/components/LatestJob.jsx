import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LatestJobCards from "./LatestJobCards";
import { Briefcase } from "lucide-react";

function LatestJob() {
  const { allJobs } = useSelector((state) => state.job);
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase size={13} /> Hot Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Latest &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Top
            </span>{" "}
            Job Openings
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            Explore the most recent opportunities from top companies hiring right now.
          </p>
        </div>

        {!allJobs?.length ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Briefcase size={28} className="text-indigo-500" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">No jobs available right now</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Log in to see the latest opportunities.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
            >
              Login to Explore
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(allJobs || []).slice(0, 8).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default LatestJob;
