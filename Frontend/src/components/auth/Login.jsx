import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setToken } from "../../redux/authSlice";
import { Loader2, Mail, Lock, Briefcase, GraduationCap, LogIn, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import apiRequest from "../../utils/axiosUtility";

export const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const [showPass, setShowPass] = useState(false);
  const { token, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) return toast.error("Please select a role.");
    try {
      dispatch(setLoading(true));
      const res = await apiRequest("POST", `${USER_API_END_POINT}/login`, input, token, dispatch);
      Cookies.set("token", res.data.token, { expires: 1, path: "/", secure: true, sameSite: "None" });
      dispatch(setAuthUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(res.data.message);
      setTimeout(() => navigate(res.data.user.role === "recruiter" ? "/recHome" : "/studenthome"), 800);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-indigo-950 transition-colors duration-300">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 dark:from-indigo-800 dark:via-purple-900 dark:to-violet-950">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-14 text-white text-center space-y-8">
          {/* Logo */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Job<span className="text-yellow-300">Portal</span>
            </h1>
            <p className="text-indigo-200 text-sm mt-1">Your career starts here</p>
          </div>

          {/* Icon row */}
          <div className="flex gap-5">
            {[GraduationCap, Briefcase, LogIn].map((Icon, i) => (
              <div key={i} className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon size={26} />
              </div>
            ))}
          </div>

          <div className="space-y-3 max-w-xs">
            <h2 className="text-3xl font-bold leading-snug">Welcome Back!</h2>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Log in to explore thousands of job opportunities or manage your postings.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[["10K+", "Jobs"], ["5K+", "Companies"], ["50K+", "Users"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-yellow-300">{val}</p>
                <p className="text-xs text-indigo-200 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-indigo-200">
            New here?{" "}
            <Link to="/signup" className="text-yellow-300 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Job<span className="text-red-500">Portal</span>
            </h1>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                <LogIn size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeHandler}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <Link to="/forgotPass" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={input.password}
                    onChange={changeHandler}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  {["student", "recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium select-none
                        ${input.role === role
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                          : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-600"
                        }`}
                    >
                      <input type="radio" name="role" value={role} checked={input.role === role} onChange={changeHandler} className="hidden" />
                      {role === "student" ? <GraduationCap size={16} /> : <Briefcase size={16} />}
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-200 dark:shadow-none"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn size={16} /> Sign In</>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
