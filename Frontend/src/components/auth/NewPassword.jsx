import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("passToken");
    if (!token) {
      toast.error("Session expired. Please start over.");
      navigate("/forgotPass");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/resetPassword`, { password, confirmPassword, token });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.removeItem("passToken");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100 dark:from-gray-950 dark:via-indigo-950 dark:to-violet-950 transition-colors duration-300">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 dark:from-indigo-900 dark:via-violet-900 dark:to-purple-950">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-14 text-white text-center space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Job<span className="text-yellow-300">Portal</span>
            </h1>
            <p className="text-indigo-200 text-sm mt-1">Account Security</p>
          </div>

          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <LockKeyhole size={48} />
          </div>

          <div className="space-y-3 max-w-xs">
            <h2 className="text-3xl font-bold">Set New Password</h2>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Choose a strong password to keep your account secure. Use at least 6 characters.
            </p>
          </div>

          <ul className="text-left space-y-2 text-sm text-indigo-200 w-full max-w-xs">
            {["At least 6 characters", "Mix of letters and numbers", "Avoid common passwords"].map((tip) => (
              <li key={tip} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 text-xs font-bold flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>

          <div className="w-16 h-1 bg-white/40 rounded-full" />
          <p className="text-sm text-indigo-200">
            Remember your password?{" "}
            <Link to="/login" className="text-yellow-300 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Job<span className="text-red-500">Portal</span>
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                <LockKeyhole size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Password</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Almost done — set your new password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                <div className="relative">
                  <LockKeyhole size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm transition"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <LockKeyhole size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm transition"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-200 dark:shadow-none">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
