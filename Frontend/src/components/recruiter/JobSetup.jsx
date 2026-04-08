import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import { toast } from "sonner";
import useGetSingleJob from "../../hooks/useGetSingleJob";
import { JOB_API_END_POINT } from "../../utils/constant";
import { ArrowLeft } from "lucide-react"; // Import the back arrow icon
import apiRequest from "../../utils/axiosUtility";

function JobSetup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Custom hook to fetch single job
  useGetSingleJob(jobId);
  const { singleJob } = useSelector((state) => state.job);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
  });

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        position: singleJob.position || "",
        experience: singleJob.experience || "",
      });
    }
  }, [singleJob]);
  const { token } = useSelector((store) => store.auth);

  const changeEventHandler = ({ target: { name, value } }) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const openDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const endpoint = `${JOB_API_END_POINT}/updateJob/${jobId}`;
      const res = await apiRequest("PUT", endpoint, input, token, dispatch);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/rec/jobs");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async () => {
    try {
      setLoading(true);
      const endpoint = `${JOB_API_END_POINT}/deleteJob/${params.id}`;

      const res = await apiRequest("DELETE", endpoint, {}, token, dispatch);

      if (res.status === 200) {
        toast.success("Job Deleted Successfully");
        navigate("/rec/jobs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen my-5 ">
      <form
        onSubmit={handleSubmit}
        className="p-8 max-w-4xl border-gray-400 shadow-lg rounded-md"
      >
        <div className="flex items-center gap-4 mb-5">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-semibold text-gray-500"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              navigate(-1);
            }} // Navigate back
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <h1 className="text-xl font-bold">Job Setup</h1>
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            onClick={openDeleteModal}
          >
            DELETE
          </Button>
        </div>

        {error && <p className="text-red-700">{error}</p>}
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(input).map((key) => (
            <div key={key}>
              <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input
                type={
                  key === "salary" || key === "experience" || key === "position"
                    ? "number"
                    : "text"
                }
                name={key}
                value={input[key]}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
                disabled={loading}
              />
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>
          Are you sure you want to delete this company? <br /> This action will
          also permanently remove all associated jobs and applications.
        </h2>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={closeDeleteModal} className="bg-gray-300">
            Cancel
          </Button>
          <Button onClick={deleteJob} className="bg-red-600 text-white">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default JobSetup;
