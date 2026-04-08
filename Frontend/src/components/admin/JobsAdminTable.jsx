/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2Icon, Eye, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function JobsAdminTable() {
  const { alljobsAdmin, searchJobByText } = useSelector((state) => state.job);

  const [filterJobs, setFilterJobs] = useState(alljobsAdmin);

  const navigate = useNavigate();
  useEffect(() => {
    const filteredJobs =
      alljobsAdmin?.length > 0 &&
      alljobsAdmin?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });

    setFilterJobs(filteredJobs);
  }, [alljobsAdmin, searchJobByText]);

  const editHandler = (id) => {
    navigate(`/admin/jobs/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filterJobs && filterJobs.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-200">{c?.company?.name}</td>
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{c.title}</td>
                <td className="px-5 py-4 text-gray-500 dark:text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-4 text-right">
                  <Popover>
                    <PopoverTrigger><MoreHorizontalIcon className="ml-auto text-gray-400" /></PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div onClick={() => editHandler(c._id)} className="flex items-center gap-2 cursor-pointer py-1 hover:text-indigo-600">
                        <Edit2Icon className="w-4" /><span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${c._id}/applicants`)} className="flex items-center gap-2 cursor-pointer py-1 mt-1 hover:text-indigo-600">
                        <Eye className="w-4" /><span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-800">
        {filterJobs && filterJobs.map((c) => (
          <div key={c._id} className="p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{c.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c?.company?.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{new Date(c.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => editHandler(c._id)} className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600">
                <Edit2Icon size={14} />
              </button>
              <button onClick={() => navigate(`/admin/jobs/${c._id}/applicants`)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                <Eye size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsAdminTable;
