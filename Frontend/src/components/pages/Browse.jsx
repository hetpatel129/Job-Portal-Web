import Jobcard from "../Jobcard";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchedQuery } from "../../redux/jobSlice";
import { Search } from "lucide-react";

function Browse() {
  const { searchJobs, allJobs, searchedQuery } = useSelector((store) => store.job);
  useGetAllJobs();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // If there's an active search use searchJobs, otherwise show all jobs
  const jobs = searchedQuery ? searchJobs : allJobs;
  const isSearching = Boolean(searchedQuery);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSearching ? (
              <>Results for &quot;<span className="text-indigo-600 dark:text-indigo-400">{searchedQuery}</span>&quot;</>
            ) : (
              "Browse All Jobs"
            )}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {jobs?.length > 0 ? `${jobs.length} job${jobs.length !== 1 ? "s" : ""} found` : "No jobs found"}
          </p>
        </div>

        {jobs?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <Jobcard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Search size={28} className="text-indigo-500" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">No jobs found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center max-w-xs">
              {isSearching
                ? `No results for "${searchedQuery}". Try a different keyword.`
                : "No jobs are available right now. Check back later."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
