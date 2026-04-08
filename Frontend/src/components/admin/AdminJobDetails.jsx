import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Users, Calendar, Clock, Award } from "lucide-react";
import useGetSingleJob from "../../hooks/useGetSingleJob";

const AdminJobDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((state) => state.job);

  useGetSingleJob(jobId);

  const infoCards = [
    { icon: Briefcase,  label: "Role",        value: singleJob?.title },
    { icon: MapPin,     label: "Location",    value: singleJob?.location },
    { icon: Clock,      label: "Experience",  value: singleJob?.experience != null ? `${singleJob.experience} yrs` : "—" },
    { icon: DollarSign, label: "Salary",      value: singleJob?.salary != null ? `${singleJob.salary} LPA` : "—" },
    { icon: Users,      label: "Applicants",  value: singleJob?.application?.length ?? 0 },
    { icon: Calendar,   label: "Posted",      value: singleJob?.createdAt?.split("T")[0] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {singleJob?.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {singleJob?.company?.name || "Company"}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-100 dark:border-blue-800">
                  <Users size={11} /> {singleJob?.position} Position{singleJob?.position > 1 ? "s" : ""}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold border border-green-100 dark:border-green-800">
                  <DollarSign size={11} /> {singleJob?.salary} LPA
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold border border-purple-100 dark:border-purple-800">
                  <Briefcase size={11} /> {singleJob?.jobType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {infoCards.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={16} className="text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Job Description</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>

        {/* Requirements */}
        {singleJob?.requirements?.length > 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} className="text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Job Requirements</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {singleJob.requirements.map((req, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-100 dark:border-indigo-800">
                  {req}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminJobDetails;
