import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Applicantstable from "./Applicantstable";
import { ArrowLeft, Users } from "lucide-react";
import useFetchApplicants from "../../hooks/useFetchApplicants";

function Applicants() {
  const params = useParams();
  const navigate = useNavigate();
  useFetchApplicants(params.id);
  const { applicants } = useSelector((store) => store.application);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users size={22} className="text-indigo-500" />
                Applicants
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {applicants?.length || 0} candidate{applicants?.length !== 1 ? "s" : ""} applied
              </p>
            </div>
          </div>
        </div>

        <Applicantstable />
      </div>
    </div>
  );
}

export default Applicants;
