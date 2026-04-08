import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FEEDBACK_API_END_POINT } from "../utils/constant";
import apiRequest from "../utils/axiosUtility";
import { toast } from "sonner";
import { Loader2, MessageSquare, Send, Star, User } from "lucide-react";
import { setLoading } from "../redux/authSlice";

const RATINGS = [1, 2, 3, 4, 5];

export default function FeedbackForm() {
  const { authUser, token, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [input, setInput] = useState({ name: "", email: authUser?.email || "", feedback: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await apiRequest("POST", `${FEEDBACK_API_END_POINT}/createFeedBack`, { ...input, rating }, token, dispatch);
      if (res.status === 201) {
        toast.success("Feedback submitted — thank you!");
        setInput({ name: "", email: authUser.email, feedback: "" });
        setRating(0);
      }
    } catch {
      toast.error("Failed to submit feedback.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-indigo-50/50 dark:from-gray-950 dark:to-indigo-950/30 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <MessageSquare size={14} /> Share Your Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            We&apos;d love your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              feedback
            </span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            Help us improve by sharing your thoughts. Your feedback means a lot to us.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 space-y-6">

          {/* Star rating */}
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">How would you rate your experience?</p>
            <div className="flex justify-center gap-2">
              {RATINGS.map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hovered || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </p>
            )}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Your Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Your Feedback
              </label>
              <textarea
                name="feedback"
                value={input.feedback}
                onChange={handleChange}
                placeholder="Tell us what you think — what worked well, what could be better..."
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-200 dark:shadow-none"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                : <><Send size={15} /> Submit Feedback</>
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
