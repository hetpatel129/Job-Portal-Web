import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, setSearchJobs } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility.js";
import { JOB_API_END_POINT } from "../utils/constant.js";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const { authUser, token } = useSelector((store) => store.auth);

  useEffect(() => {
    const getJobs = async () => {
      const endpoint = searchedQuery
        ? `${JOB_API_END_POINT}/getAllJob/?keyword=${searchedQuery}`
        : `${JOB_API_END_POINT}/getAllJob`;

      try {

        const res = await apiRequest("GET", endpoint, {}, token,dispatch);

        if (res.status === 200) {
          if (searchedQuery) {
            dispatch(setSearchJobs(res.data.data));
          } else {
            dispatch(setAllJobs(res.data.data));
          }
        }
      } catch (error) {
        console.error(error);
      } 
    };
    getJobs();
  }, [dispatch, searchedQuery, token, authUser]);
}

export default useGetAllJobs;
