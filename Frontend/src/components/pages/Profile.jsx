import { useState } from "react";
import { Mail, Phone, Edit2, FileText, User, Briefcase, Award, Calendar } from "lucide-react";
import AppliedJobTable from "../AppliedJobTable";
import UpdateProfile from "../UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";

function Profile() {
  const { authUser } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const skills = authUser?.profile?.skills || [];

  useGetAppliedJobs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* Profile header card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Top section with avatar and basic info */}
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
                    {authUser?.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name, bio, and edit button */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {authUser?.fullname}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                        <User size={11} /> Student
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

                {authUser?.profile?.bio && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {authUser.profile.bio}
                  </p>
                )}
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

          {/* Skills section */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-100 dark:border-indigo-800"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Resume section */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Resume</h3>
            </div>
            {authUser?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${import.meta.env.VITE_BASEURI}user/resume/view?url=${encodeURIComponent(authUser.profile.resume)}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FileText size={14} />
                {authUser.profile.resumeOrignalName || "View Resume"}
              </a>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">No resume uploaded</p>
            )}
          </div>
        </div>

        {/* Applied jobs section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Applied Jobs</h2>
          </div>
          <AppliedJobTable />
        </div>

        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Profile;
