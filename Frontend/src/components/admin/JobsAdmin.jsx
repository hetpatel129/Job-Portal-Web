import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobsAdminTable from "./JobsAdminTable";
import useGetJobsAdmin from "../../hooks/useGetJobsAdmin";
import { setSearchJobByText } from "../../redux/jobSlice";

function JobsAdmin() {
  useGetJobsAdmin();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);

  return (
    <>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <JobsAdminTable />
      </div>
    </>
  );
}

export default JobsAdmin;
