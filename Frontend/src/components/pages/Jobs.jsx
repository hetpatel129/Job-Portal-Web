import { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import Jobcard from "../Jobcard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { SlidersHorizontal, X, Briefcase } from "lucide-react";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);
  useGetAllJobs();

  useEffect(() => {
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      setFilterJobs(
        allJobs?.filter(
          (job) =>
            job?.title?.toLowerCase().includes(q) ||
            job?.description?.toLowerCase().includes(q) ||
            job?.location?.toLowerCase().includes(q)
        )
      );
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {filterJobs?.length ?? 0} Jobs
          </h1>
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className="flex gap-6">

          {/* ── Filter sidebar (desktop) ── */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterCard />
            </div>
          </aside>

          {/* ── Mobile filter drawer ── */}
          {showFilter && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilter(false)} />
              {/* Drawer */}
              <div className="relative w-72 max-w-[85vw] bg-white dark:bg-gray-950 h-full overflow-y-auto p-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900 dark:text-white">Filters</span>
                  <button onClick={() => setShowFilter(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
                <FilterCard onClose={() => setShowFilter(false)} />
              </div>
            </div>
          )}

          {/* ── Job grid ── */}
          <div className="flex-1 min-w-0">
            {/* Desktop count */}
            <div className="hidden md:flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filterJobs?.length ?? 0}</span> jobs
                {searchedQuery && <> for &quot;<span className="text-indigo-600 dark:text-indigo-400">{searchedQuery}</span>&quot;</>}
              </p>
            </div>

            {filterJobs?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                  <Briefcase size={28} className="text-indigo-500" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">No jobs found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm text-center max-w-xs">
                  Try adjusting your filters or search with a different keyword.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Jobcard job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
