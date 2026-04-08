import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Mail, ShieldCheck, KeyRound } from "lucide-react";
import { setLoading } from "../../redux/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(() => JSON.parse(localStorage.getItem("isOtpSent")) || false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(() => parseInt(localStorage.getItem("timer")) || 0);
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const otpRefs = useRef([]);

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          const updated = prev - 1;
          if (updated >= 0) localStorage.setItem("timer", updated);
          else localStorage.removeItem("timer");
          return updated;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer, isOtpSent]);

  useEffect(() => { localStorage.setItem("isOtpSent", JSON.stringify(isOtpSent)); }, [isOtpSent]);

  const otpSend = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/forgotPass`, { email });
      if (res.status === 200) {
        localStorage.setItem("passToken", res?.data?.data);
        toast.success(res.data.message);
        setIsOtpSent(true);
        setTimer(300);
        localStorage.setItem("timer", 300);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleBack = () => {
    setIsOtpSent(false);
    setEmail("");
    localStorage.removeItem("isOtpSent");
    localStorage.removeItem("timer");
    navigate("/login");
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const sotp = otp.join("");
    if (sotp.length < 6) return toast.error("Please enter all 6 digits");
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/verifyOtp`, { sotp });
      if (res.status === 200) {
        toast.success("OTP Verified!");
        localStorage.setItem("passToken", res.data.data);
        localStorage.removeItem("isOtpSent");
        localStorage.removeItem("timer");
        navigate("/forgotPass/NewPassword");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 dark:from-gray-950 dark:via-blue-950 dark:to-cyan-950 transition-colors duration-300">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-950">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-14 text-white text-center space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Job<span className="text-yellow-300">Portal</span>
            </h1>
            <p className="text-blue-200 text-sm mt-1">Account Recovery</p>
          </div>

          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {isOtpSent ? <ShieldCheck size={48} /> : <KeyRound size={48} />}
          </div>

          <div className="space-y-3 max-w-xs">
            <h2 className="text-3xl font-bold leading-snug">
              {isOtpSent ? "Check Your Email" : "Forgot Password?"}
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              {isOtpSent
                ? `We sent a 6-digit code to ${email}. Enter it to verify your identity.`
                : "No worries! Enter your registered email and we'll send you a reset code instantly."}
            </p>
          </div>

          <div className="w-16 h-1 bg-white/40 rounded-full" />
          <p className="text-sm text-blue-200">
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
            <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              Job<span className="text-red-500">Portal</span>
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
            {!isOtpSent ? (
              <>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Mail size={26} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Enter your email to receive a reset code</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); otpSend(); }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm transition"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-200 dark:shadow-none">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send OTP"}
                  </button>

                  <button type="button" onClick={handleBack}
                    className="w-full py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition text-sm">
                    Back to Login
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={26} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify OTP</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Code sent to <span className="text-blue-600 dark:text-blue-400 font-medium">{email}</span>
                  </p>
                </div>

                <form onSubmit={verifyOtp} className="space-y-6">
                  {/* OTP boxes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                      Enter 6-digit code
                    </label>
                    <div className="flex justify-center gap-2.5">
                      {otp.map((_, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(e.target, index)}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !otp[index] && index > 0)
                              otpRefs.current[index - 1]?.focus();
                          }}
                          className="w-11 h-12 text-center text-xl font-bold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="text-center">
                    {timer > 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Resend in <span className="text-blue-600 dark:text-blue-400 font-semibold">{formatTime(timer)}</span>
                      </p>
                    ) : (
                      <button type="button" onClick={() => { otpSend(); setTimer(300); }}
                        className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck size={16} /> Verify & Continue</>}
                  </button>

                  <button type="button" onClick={handleBack}
                    className="w-full py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition text-sm">
                    Back to Login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
