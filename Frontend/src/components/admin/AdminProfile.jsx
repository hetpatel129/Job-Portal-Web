import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, ShieldCheck, User, ArrowLeft } from "lucide-react";

const AdminProfile = () => {
  const { authUser } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const initials = authUser?.fullname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "A";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 p-6">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Back button */}
        <button
          onClick={() => navigate("/AdminHomepage")}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Admin Panel
        </button>

        {/* Header card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-5">
            {authUser?.profile?.profilePhoto ? (
              <img
                src={authUser.profile.profilePhoto}
                alt="avatar"
                className="w-20 h-20 rounded-2xl object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md flex-shrink-0">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {authUser?.fullname || "Admin"}
              </h1>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full mt-1">
                <ShieldCheck size={14} /> Admin
              </span>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Contact Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{authUser?.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{authUser?.phoneNumber || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Role</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{authUser?.role || "admin"}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;
