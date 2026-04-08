import { useSelector } from "react-redux";
import { useState } from "react";
import { Mail, Phone, Edit2, Briefcase, Calendar, Building2, MapPin, Globe } from "lucide-react";
import UpdateRecProfile from "./UpdateRecProile";
import useGetUserCompanies from "../../hooks/useGetUserCompanies";

const RecProfile = () => {
  const { authUser } = useSelector((store) => store.auth);
  const { userCompanies } = useSelector((state) => state.company);
  const [open, setOpen] = useState(false);

  useGetUserCompanies();

  const approvedCompanies = userCompanies?.filter((c) => c.status === "approved") || [];
  const totalCompanies = userCompanies?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* Profile header card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">

              {/* Avatar */}
              <div className="flex-shrink-0">
                {authUser?.profile?.profilePhoto ? (
                  <img
                    src={authUser.profile.profilePhoto}
                    alt={authUser?.fullname}
                    className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-100 dark:ring-indigo-900/50"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {authUser?.fullname?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name, role, edit */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {authUser?.fullname}
                    </h1>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                        <Briefcase size={11} /> Recruiter
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar size={11} />
                        Joined {new Date(authUser?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold transition shadow-sm flex-shrink-0"
                  >
                    <Edit2 size={14} /> Edit Profile
                  </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-5">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                      <Building2 size={16} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{totalCompanies}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {totalCompanies === 1 ? "Company" : "Companies"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <Building2 size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{approvedCompanies.length}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Approved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={15} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                  <p className="text-sm text-gray-900 dark:text-white truncate">{authUser?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                  <p className="text-sm text-gray-900 dark:text-white truncate">
                    {authUser?.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies section */}
        {totalCompanies > 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Companies</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userCompanies.map((company) => (
                <div key={company._id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition">
                  <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {company.name?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{company.name}</p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      {company.location && (
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin size={10} /> {company.location}
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        company.status === "approved"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : company.status === "rejected"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }`}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <UpdateRecProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default RecProfile;
