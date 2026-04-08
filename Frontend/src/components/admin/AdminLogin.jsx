import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setToken } from "../../redux/authSlice";
import { Loader2, Mail, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import apiRequest from "../../utils/axiosUtility";

export const AdminLogin = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "admin" });
  const [showPass, setShowPass] = useState(false);
  const { token, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await apiRequest("POST", `${USER_API_END_POINT}/login`, input, token, dispatch);
      Cookies.set("token", res.data.token, { expires: 1, path: "/", secure: true, sameSite: "None" });
      dispatch(setAuthUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(res.data.message);
      setTimeout(() => navigate("/AdminHomepage"), 800);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-gray-100 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-300">

      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/10" />
        <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-indigo-500/10" />
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full bg-indigo-500/10" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-14 text-white text-center space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Job<span className="text-yellow-400">Portal</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Admin Control Panel</p>
          </div>

          <div className="w-24 h-24 rounded-3xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
            <ShieldCheck size={48} className="text-indigo-400" />
          </div>

          <div className="space-y-3 max-w-xs">
            <h2 className="text-3xl font-bold">Admin Access</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Restricted area. Only authorized administrators can access this panel.
            </p>
          </div>

          <ul className="text-left space-y-3 text-sm text-gray-400 w-full max-w-xs">
            {["Manage users & recruiters", "Review job postings", "Handle applications", "Send announcements"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-600/50 flex items-center justify-center text-indigo-300 text-xs flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Job<span className="text-red-500">Portal</span>
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Enter your admin credentials</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email" name="email" value={input.email}
                    onChange={changeEventHandler}
                    placeholder="admin@jobportal.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"} name="password" value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm transition"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-200 dark:shadow-none"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Please wait...</>
                  : <><ShieldCheck size={15} /> Sign In as Admin</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
