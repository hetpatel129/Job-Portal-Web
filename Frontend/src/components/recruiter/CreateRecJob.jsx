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
    <div className="flex items-center justify-center w-screen my-4">
      <form
        onSubmit={submitHandler}
        className="px-6 py-4 max-w-4xl border border-gray-400 shadow-lg rounded-md"
      >
        <Button
          variant="outline"
          className="flex items-center gap-2 font-semibold text-gray-500"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> <span>Back</span>
        </Button>

        <div className="grid grid-cols-2 gap-2">
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

          <div className="col-span-2">
            <Label>Requirements</Label>
            <p className="text-sm text-gray-500">
              * Separate requirements with commas (e.g., React.js, Node.js,
              MongoDB)
            </p>
            <textarea
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="w-full border rounded-md p-2 my-1"
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

          <div className="col-span-2">
            <Label>Company</Label>
            {userCompanies?.length > 0 &&
            userCompanies[0]?.status === "approved" ? (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {userCompanies.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-xs text-red-700 font-bold text-center my-3">
                *Please Register a Company First before Posting New Jobs
              </p>
            )}
          </div>
        </div>

        <Button className="w-full mt-4" disabled={loading || !isFormValid()}>
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
}

export default CreateRecJob;
