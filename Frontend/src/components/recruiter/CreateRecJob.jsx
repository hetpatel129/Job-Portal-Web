import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import apiRequest from "../../utils/axiosUtility";

function CreateRecJob() {
  const { userCompanies } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: 1,
    position: 0,
    company: "",
  });
  const { token } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (companyId) => {
    setInput({ ...input, company: companyId });
  };

  const isFormValid = () => {
    return (
      input.title.trim() &&
      input.description.trim() &&
      input.requirements.trim() &&
      input.salary &&
      input.location.trim() &&
      input.jobType.trim() &&
      input.position > 0 &&
      input.experience >= 0 &&
      input.company
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all required fields before posting the job.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${JOB_API_END_POINT}/postjob`;
      const res = await apiRequest("POST", endpoint, input, token, dispatch);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/rec/jobs");
      }
      setInput({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: 1,
        position: 0,
        company: "",
      });
    } catch (error) {
      toast.error("Failed to create job. Please try again.");
      console.error("Error submitting the job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-start justify-center px-4 py-8">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl px-6 py-6 space-y-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <button type="button" onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <ArrowLeft size={18} className="text-gray-500" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Post a New Job</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              required
              className="my-1"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="my-1"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label>Requirements</Label>
            <p className="text-xs text-gray-500 mb-1">Separate with commas (e.g., React.js, Node.js)</p>
            <textarea
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
          </div>

          <div>
            <Label>Salary (LPA)</Label>
            <Input
              type="number"
              required
              placeholder="LPA"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              min="0"
              className="my-1"
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              required
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="my-1"
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              required
              className="my-1"
            />
          </div>

          <div>
            <Label>No Of Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              required
              min="0"
              className="my-1"
            />
          </div>

          <div>
            <Label>Experience Level</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              required
              min="0"
              className="my-1"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label>Company</Label>
            {userCompanies?.length > 0 && userCompanies[0]?.status === "approved" ? (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {userCompanies.map((c) => (
                      <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-xs text-red-600 font-semibold mt-2">
                * Please register and get a company approved before posting jobs.
              </p>
            )}
          </div>
        </div>

        <Button className="w-full mt-2" disabled={loading || !isFormValid()}>
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
}

export default CreateRecJob;
