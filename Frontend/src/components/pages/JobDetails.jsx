import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Users, Clock, CalendarDays, GraduationCap, CheckCircle2 } from "lucide-react";
import useGetSingleJob from "../../hooks/useGetSingleJob";
import apiRequest from "../../utils/axiosUtility";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

function JobDetails() {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { token, authUser } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const { fetchSingleJob } = useGetSingleJob(jobId);

  const isApplied = singleJob?.application?.some(
    (app) => app.applicant._id === authUser._id
  );

  const applyJob = async () => {
    if (!authUser.profile?.resume) {
      toast.error("Please upload your resume before applying.");
      navigate("/profile");
      return;
    }
    try {
      await apiRequest("POST", `${APPLICATION_API_END_POINT}/applyJob/${jobId}`, {}, token, dispatch);
      fetchSingleJob();
      toast.success("Successfully applied for the job!");
    } catch {
      toast.error("Failed to apply for the job.");
    }
  };

  const meta = [
    { icon: Briefcase,     label: "Role",        value: singleJob?.title },
    { icon: MapPin,        label: "Location",    value: singleJob?.location },
    { icon: GraduationCap, label: "Experience",  value: `${singleJob?.experience} yr${singleJob?.experience !== 1 ? "s" : ""}` },
    { icon: DollarSign,    label: "Salary",      value: `${singleJob?.salary} LPA` },
    { icon: Users,         label: "Applicants",  value: singleJob?.application?.length ?? 0 },
    { icon: CalendarDays,  label: "Posted",      value: singleJob?.createdAt?.split("T")[0] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-white dark:from-indigo-950/20 dark:to-gray-950 transition-colors duration-300 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </button>

        {/* Header card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {singleJob?.company?.logo ? (
                <img
                  src={singleJob.company.logo}
                  alt={singleJob.company.name}
                  className="w-14 h-14 rounded-xl object-contain border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-1.5 flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl flex-shrink-0">
                  {singleJob?.company?.name?.charAt(0)?.toUpperCase() || <Briefcase size={22} />}
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{singleJob?.company?.name}</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">
                  {singleJob?.title}
                </h1>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <MapPin size={11} /> {singleJob?.location || "India"}
                  <span className="mx-1">·</span>
                  <Clock size={11} /> {singleJob?.createdAt?.split("T")[0]}
                </div>
              </div>
            </div>

            {/* Apply button */}
            <button
              disabled={isApplied}
              onClick={!isApplied ? applyJob : undefined}
              className={`self-start sm:self-center flex-shrink-0 px-6 py-2.5 rounded-xl text-sm font-semibold transition
                ${isApplied
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                }`}
            >
              {isApplied ? (
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} /> Applied</span>
              ) : "Apply Now"}
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Users size={11} /> {singleJob?.position} Positions
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <DollarSign size={11} /> {singleJob?.salary} LPA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Briefcase size={11} /> {singleJob?.jobType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              <GraduationCap size={11} /> {singleJob?.experience} yrs exp
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Job Description</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{singleJob?.description}</p>
        </div>

        {/* Requirements */}
        {singleJob?.requirements?.length > 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Requirements</h2>
            <ul className="space-y-2">
              {singleJob.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Meta info grid */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Job Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default JobDetails;
