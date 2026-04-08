import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { MapPin, Briefcase, X } from "lucide-react";

function FilterCard({ onClose }) {
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const getUniqueValues = (key) => {
    const values = allJobs?.map((job) => job[key]).filter(Boolean);
    return [...new Set(values.map((v) => v.toLowerCase()))];
  };

  const uniqueTitles = getUniqueValues("title");
  const uniqueLocations = getUniqueValues("location");

  // Combine both filters — title takes priority, then location
  useEffect(() => {
    dispatch(setSearchedQuery(selectedTitle || selectedLocation || ""));
    return () => dispatch(setSearchedQuery(""));
  }, [selectedTitle, selectedLocation, dispatch]);

  const clearAll = () => {
    setSelectedTitle("");
    setSelectedLocation("");
  };

  const hasFilter = selectedTitle || selectedLocation;

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 dark:text-white text-base">Filter Jobs</h2>
        {hasFilter && (
          <button
            onClick={clearAll}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800" />

      {/* Job Title filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          <Briefcase size={12} /> Job Title
        </div>
        <div className="space-y-1">
          {["", ...uniqueTitles].map((title, idx) => {
            const label = title ? title.charAt(0).toUpperCase() + title.slice(1) : "All Jobs";
            const isSelected = selectedTitle === title;
            return (
              <button
                key={idx}
                onClick={() => setSelectedTitle(title)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all
                  ${isSelected
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isSelected ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800" />

      {/* Location filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          <MapPin size={12} /> Location
        </div>
        <div className="space-y-1">
          {["", ...uniqueLocations].map((loc, idx) => {
            const label = loc ? loc.charAt(0).toUpperCase() + loc.slice(1) : "All Locations";
            const isSelected = selectedLocation === loc;
            return (
              <button
                key={idx}
                onClick={() => setSelectedLocation(loc)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all
                  ${isSelected
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isSelected ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile close button */}
      {onClose && (
        <>
          <div className="border-t border-gray-100 dark:border-gray-800" />
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
}

export default FilterCard;
