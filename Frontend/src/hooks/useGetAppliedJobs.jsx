import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility.js"; // Adjust the import path accordingly

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth); // Get token from auth state

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const endpoint = `${APPLICATION_API_END_POINT}/getAppliedJob`;
        const res = await apiRequest("GET", endpoint, {}, token, dispatch);

        if (res.status === 200) {
          dispatch(setAllAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching applied jobs:", error);
      } 
    };

    fetchAppliedJobs();
  }, [dispatch, token]); // Added token as a dependency
};

export default useGetAppliedJobs;
