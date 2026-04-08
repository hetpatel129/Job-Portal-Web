import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ADMIN_API_END_POINT, USER_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { Users, Edit2, Trash2, X, Mail, Phone, User, Briefcase } from "lucide-react";
import axios from "axios";

const roleBadge = (role) => {
  const map = {
    student:   "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    recruiter: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  };
  return map[role] || "bg-gray-100 dark:bg-gray-800 text-gray-500";
};

const inputCls = "w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

const UserAdmin = () => {
  const { allUsers: initialUsers, token } = useSelector((store) => store.auth);
  const [allUsers, setAllUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({ fullname: "", email: "", phoneNumber: "", bio: "", skills: "", role: "" });
  const dispatch = useDispatch();

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname, email: user.email,
      phoneNumber: user.phoneNumber || "",
      bio: user.profile?.bio || "",
      skills: user.profile?.skills?.join(", ") || "",
      role: user.role,
    });
  };

  useEffect(() => {
    if (!selectedUser) return;
    setIsChanged(
      formData.fullname !== selectedUser.fullname ||
      formData.email !== selectedUser.email ||
      formData.phoneNumber !== (selectedUser.phoneNumber || "") ||
      formData.bio !== (selectedUser.profile?.bio || "") ||
      formData.skills !== (selectedUser.profile?.skills?.join(", ") || "")
    );
  }, [formData, selectedUser]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditSubmit = async () => {
    if (!isChanged) return;
    try {
      const res = await apiRequest("PUT", `${ADMIN_API_END_POINT}/editUser/${selectedUser._id}`, formData, token, dispatch);
      if (res.status === 200) {
        setAllUsers((prev) => prev.map((u) => u._id === selectedUser._id ? { ...u, ...formData } : u));
        toast.success("User updated successfully");
        setSelectedUser(null);
      }
    } catch { toast.error("Error updating user"); }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/deleteUser/${userId}`);
      if (res.status === 200) {
        setAllUsers((prev) => prev.filter((u) => u._id !== userId));
        toast.success("User deleted");
      }
    } catch { toast.error("Error deleting user"); }
  };

  const nonAdmins = allUsers?.filter((u) => u.role !== "admin") ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Users</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{nonAdmins.length} registered users</p>
      </div>

      {nonAdmins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <Users size={24} className="text-indigo-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonAdmins.map((user) => (
            <div key={user._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                {user.profile?.profilePhoto ? (
                  <img src={user.profile.profilePhoto} alt={user.fullname} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-200 dark:ring-indigo-700 flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg flex-shrink-0">
                    {user.fullname?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{user.fullname}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleBadge(user.role)}`}>{user.role}</span>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Mail size={11} className="text-indigo-400" /> {user.email}
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Phone size={11} className="text-indigo-400" /> {user.phoneNumber}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button onClick={() => handleEditClick(user)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(user._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit User</h3>
              <button onClick={() => setSelectedUser(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "fullname",    placeholder: "Full Name",              icon: User },
                { name: "email",       placeholder: "Email",                  icon: Mail },
                { name: "phoneNumber", placeholder: "Phone Number",           icon: Phone },
                { name: "bio",         placeholder: "Bio",                    icon: User },
                { name: "skills",      placeholder: "Skills (comma-separated)", icon: Briefcase },
              ].map(({ name, placeholder, icon: Icon }) => (
                <div key={name} className="relative">
                  <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name={name} value={formData[name]} onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              ))}
            </div>

            <button onClick={handleEditSubmit} disabled={!isChanged}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${isChanged ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"}`}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdmin;
