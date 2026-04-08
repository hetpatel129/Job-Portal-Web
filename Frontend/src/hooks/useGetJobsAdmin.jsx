import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobsAdmin } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility";

function useGetJobsAdmin() {
  const dispatch = useDispatch();
  const { authUser, token } = useSelector((store) => store.auth);
  const { alljobsAdmin } = useSelector((store) => store.job);
  console.log(alljobsAdmin);

  useEffect(() => {
    const fetchJobsAdmin = async () => {

      try {
        const endpoint = `${JOB_API_END_POINT}/adminPostedJob`;
        const res = await apiRequest("GET", endpoint, {}, token, dispatch);

        if (res.status === 200) {
          dispatch(setAllJobsAdmin(res.data.data));
          console.log(res.data.data.length);
        }
      } catch (error) {
        dispatch(setAllJobsAdmin(null));
        console.log(error);
      } 
    };
    if (authUser ) {
      fetchJobsAdmin();
    }
  }, [dispatch, token, authUser]);
}

export default useGetJobsAdmin;
