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
    <>
      <Table>
        <TableCaption>A List Of Your Recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>CompanyName</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs &&
            filterJobs.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c?.company?.name}</TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>
                  {new Date(c.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => editHandler(c._id)}
                        className="flex items-center gap-2 cursor-pointer w-fit"
                      >
                        <Edit2Icon className="w-4" />
                        <span>Edit</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${c._id}/applicants`)
                        }
                        className="flex mt-3 items-center gap-2 cursor-pointer w-fit"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default JobsAdminTable;
