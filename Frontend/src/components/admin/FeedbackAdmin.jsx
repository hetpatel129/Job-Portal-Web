import { Trash2, MessageSquare, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FEEDBACK_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { useState } from "react";

export const FeedbackAdmin = () => {
  const { feedbacks } = useSelector((store) => store.feedback);
  const { token } = useSelector((store) => store.auth);
  const [list, setList] = useState(feedbacks);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const res = await apiRequest("DELETE", `${FEEDBACK_API_END_POINT}/deleteFeedback/${id}`, null, token, dispatch);
      if (res.status === 200) {
        setList((prev) => prev.filter((f) => f._id !== id));
        toast.success("Feedback deleted");
      }
    } catch { toast.error("Failed to delete feedback"); }
  };

  const roleBadge = (role) => {
    const map = {
      student:   "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      recruiter: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };
    return map[role] || "bg-gray-100 dark:bg-gray-800 text-gray-500";
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Feedback</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{list?.length ?? 0} responses</p>
      </div>

      {list?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <MessageSquare size={24} className="text-indigo-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No feedback yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((fb) => (
            <div key={fb._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition-all relative group">
              {/* Delete */}
              <button onClick={() => handleDelete(fb._id)}
                className="absolute top-4 right-4 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition">
                <Trash2 size={14} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-3 pr-8">
                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm flex-shrink-0">
                  {fb.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{fb.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge(fb.user?.role)}`}>
                    {fb.user?.role}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {fb.rating > 0 && (
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} className={s <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">{fb.feedback}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                {new Date(fb.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
