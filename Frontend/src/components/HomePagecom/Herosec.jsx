import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 py-24 px-6 md:px-16 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          #1 Job Portal for Students & Recruiters
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Connecting{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Talent
          </span>{" "}
          with{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Opportunities
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Empowering students to discover their dream careers and recruiters to
          find the perfect candidates.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all"
          >
            <Search size={20} />
            Explore Jobs
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-700 shadow-lg transition-all"
          >
            Post a Job
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Jobs Posted" },
            { value: "200+", label: "Companies" },
            { value: "1000+", label: "Students Hired" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
