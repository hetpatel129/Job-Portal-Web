import { useSelector } from "react-redux";

const TIMELINE = ["pending", "reviewed", "interview", "offer", "accepted"];

const STATUS_COLOR = {
  pending: "bg-gray-400",
  reviewed: "bg-blue-500",
  interview: "bg-purple-500",
  offer: "bg-emerald-500",
  accepted: "bg-green-600",
  rejected: "bg-red-500",
};

const StatusTimeline = ({ status }) => {
  if (status === "rejected") {
    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="px-3 py-1 rounded-full text-xs text-white bg-red-500 font-medium">Rejected</span>
      </div>
    );
  }

  const currentIndex = TIMELINE.indexOf(status);

  return (
    <div className="flex items-center gap-1 mt-2 flex-wrap">
      {TIMELINE.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white transition-all
            ${i <= currentIndex ? STATUS_COLOR[step] : "bg-gray-200 text-gray-400"}`}>
            {i <= currentIndex ? "✓" : "○"} {step.charAt(0).toUpperCase() + step.slice(1)}
          </div>
          {i < TIMELINE.length - 1 && (
            <div className={`h-0.5 w-4 ${i < currentIndex ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (!allAppliedJobs?.length) {
    return <p className="text-center text-gray-500 py-6">You haven't applied for any jobs yet.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {allAppliedJobs.map((item, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item?.job?.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item?.job?.company?.name}</p>
              <p className="text-xs text-gray-400 mt-1">Applied: {item?.createdAt?.split("T")[0]}</p>
            </div>
            <span className={`self-start px-3 py-1 rounded-full text-xs text-white font-medium capitalize ${STATUS_COLOR[item.status] || "bg-gray-400"}`}>
              {item.status}
            </span>
          </div>

          {/* Interview details if scheduled */}
          {item.interviewDate && (
            <div className="mt-3 bg-purple-50 rounded-lg p-3 text-sm">
              <p className="text-purple-700 font-medium">
                📅 Interview scheduled: {new Date(item.interviewDate).toLocaleString()}
              </p>
              {item.interviewNote && <p className="text-purple-600 text-xs mt-1">{item.interviewNote}</p>}
            </div>
          )}

          {/* Status Timeline */}
          <StatusTimeline status={item.status} />
        </div>
      ))}
    </div>
  );
}

export default AppliedJobTable;
