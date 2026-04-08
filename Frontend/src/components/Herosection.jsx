import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const Herosection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(query));
    if (query) navigate("/browse");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[92vh] gap-6 px-4 text-center overflow-hidden
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
      dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950
      transition-colors duration-300">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-700/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200/20 dark:bg-pink-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Badge */}
      <span className="relative px-5 py-2 font-medium tracking-wide text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 rounded-full shadow-sm">
        ✨ Transform Your Career Today
      </span>

      {/* Heading */}
      <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white max-w-4xl">
        Find Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Dream Job
        </span>
        <br className="hidden sm:block" />
        <span className="text-gray-800 dark:text-gray-100"> in Just a Few Clicks</span>
      </h1>

      {/* Subtext */}
      <p className="relative max-w-2xl text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
        Whether you&apos;re starting your career or aiming higher, we connect you to
        opportunities that match your skills and aspirations.
      </p>

      {/* Search bar */}
      <form
        onSubmit={searchJobHandler}
        className="relative w-full sm:w-[70%] md:w-[60%] lg:w-[45%] mt-4"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter job title, skills, or company"
            className="w-full p-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-none outline-none"
          />
          <Button
            type="submit"
            className="p-3 text-white rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition flex-shrink-0"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Stats row */}
      <div className="relative flex gap-8 mt-4">
        {[["10K+", "Jobs Posted"], ["5K+", "Companies"], ["50K+", "Job Seekers"]].map(([val, label]) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{val}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
