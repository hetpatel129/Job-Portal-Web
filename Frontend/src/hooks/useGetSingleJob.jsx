import { useEffect, useCallback } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility";

function useGetSingleJob(jobId) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const fetchSingleJob = useCallback(async () => {
    try {

      const endpoint = `${JOB_API_END_POINT}/getJob/${jobId}`;
      const res = await apiRequest("GET", endpoint, {}, token, dispatch);

      if (res.status === 200) {
        dispatch(setSingleJob(res.data.data));
      } else {
        dispatch(setSingleJob(null));
        console.error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching job:", error.message);
    } 
  }, [jobId, token, dispatch]);

  useEffect(() => {
    fetchSingleJob();
  }, [fetchSingleJob]);

  // Return the refetch function for manual refresh
  return { fetchSingleJob };
}

export default useGetSingleJob;
