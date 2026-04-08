import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader2, Mail, Lock, User, Phone, Briefcase,
  GraduationCap, UserPlus, Camera, Eye, EyeOff, ArrowLeft, ShieldCheck,
} from "lucide-react";
import * as Yup from "yup";
import apiRequest from "../../utils/axiosUtility";

const FIELDS = [
  { name: "fullname",    label: "Full Name",     type: "text",  icon: User,  placeholder: "John Doe",        col: "sm:col-span-1" },
  { name: "phoneNumber", label: "Phone Number",  type: "text",  icon: Phone, placeholder: "10-digit number", col: "sm:col-span-1" },
  { name: "email",       label: "Email Address", type: "email", icon: Mail,  placeholder: "you@example.com", col: "sm:col-span-2" },
];

const validationSchema = Yup.object({
  fullname:    Yup.string().required("Full name is required"),
  email:       Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().matches(/^\d{10}$/, "Must be 10 digits").required("Phone is required"),
  password:    Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  role:        Yup.string().oneOf(["student", "recruiter"]).required(),
});

export const Signup = () => {
  const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "student", file: null });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [showPass, setShowPass] = useState(false);

  // OTP step state
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const { loading, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => { if (authUser) navigate("/"); }, [authUser, navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Only image files allowed.");
    if (file.size > 2 * 1024 * 1024) return toast.error("File must be under 2MB.");
    setInput((prev) => ({ ...prev, file }));
    setPreview(URL.createObjectURL(file));
  }, []);

  // Step 1: validate & send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(input, { abortEarly: false });
      dispatch(setLoading(true));
      await apiRequest("POST", `${USER_API_END_POINT}/signup/sendOtp`, {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: input.password,
        role: input.role,
      }, "", dispatch);
      toast.success("OTP sent to " + input.email);
      setOtpStep(true);
    } catch (error) {
      if (error.name === "ValidationError") {
        setErrors(error.inner.reduce((acc, err) => ({ ...acc, [err.path]: err.message }), {}));
      } else {
        toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Step 2: verify OTP → account created
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      setOtpLoading(true);
      const res = await apiRequest("POST", `${USER_API_END_POINT}/signup/verifyOtp`, {
        email: input.email,
        otp,
      }, "", dispatch);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await apiRequest("POST", `${USER_API_END_POINT}/signup/sendOtp`, {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: input.password,
        role: input.role,
      }, "", dispatch);
      toast.success("OTP resent to " + input.email);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP.");
    }
  };

  // ── Left panel (shared) ──
  const LeftPanel = (
    <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 dark:from-purple-900 dark:via-violet-900 dark:to-indigo-950">
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute top-1/2 -left-12 w-56 h-56 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-white/10" />
      <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white text-center space-y-7">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Job<span className="text-yellow-300">Portal</span></h1>
          <p className="text-purple-200 text-sm mt-1">Your career starts here</p>
        </div>
        <div className="flex gap-4">
          {[GraduationCap, Briefcase, UserPlus].map((Icon, i) => (
            <div key={i} className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon size={24} />
            </div>
          ))}
        </div>
        <div className="space-y-3 max-w-xs">
          <h2 className="text-3xl font-bold leading-snug">Join Us Today</h2>
          <p className="text-purple-200 text-sm leading-relaxed">Connect with top companies and discover opportunities that match your skills.</p>
        </div>
        <ul className="text-left space-y-3 text-sm text-purple-100 w-full max-w-xs">
          {["Browse thousands of job listings", "Apply with one click", "Get real-time status updates", "Post jobs & find top talent"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 text-xs font-bold flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-purple-200">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-indigo-950 transition-colors duration-300">
      {LeftPanel}

      <div className="w-full lg:w-7/12 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
              Job<span className="text-red-500">Portal</span>
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-5">

            {otpStep ? (
              /* ── OTP Step ── */
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck size={26} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Your Email</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    We sent a 6-digit OTP to{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{input.email}</span>
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full text-center text-3xl tracking-[0.6em] px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition font-mono"
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpLoading}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-purple-200 dark:shadow-none"
                >
                  {otpLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck size={16} /> Verify & Create Account</>}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => { setOtpStep(false); setOtp(""); }}
                    className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            ) : (
              /* ── Signup Form ── */
              <>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-3">
                    <UserPlus size={26} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Start your journey with us</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FIELDS.map(({ name, label, type, icon: Icon, placeholder, col }) => (
                      <div key={name} className={col}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                        <div className="relative">
                          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            id={name} name={name} type={type} value={input[name]} onChange={handleChange} placeholder={placeholder}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-sm transition"
                          />
                        </div>
                        {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          name="password" type={showPass ? "text" : "password"} value={input.password} onChange={handleChange} placeholder="Minimum 6 characters"
                          className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-sm transition"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>
                  </div>

                  {/* Role selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a...</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["student", "recruiter"].map((role) => (
                        <label key={role}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium select-none
                            ${input.role === role
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-600"
                            }`}>
                          <input type="radio" name="role" value={role} checked={input.role === role} onChange={handleChange} className="hidden" />
                          {role === "student" ? <GraduationCap size={16} /> : <Briefcase size={16} />}
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Profile photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Photo <span className="text-gray-400 font-normal text-xs">(optional)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <label htmlFor="file"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <Camera size={15} /> Choose Photo
                      </label>
                      <input id="file" type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-11 h-11 rounded-full object-cover border-2 border-purple-400" />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                          <User size={18} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-purple-200 dark:shadow-none">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Mail size={16} /> Send Verification OTP</>}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">Sign in</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
