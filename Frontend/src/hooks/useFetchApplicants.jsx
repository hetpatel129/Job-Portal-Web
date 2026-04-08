import { useEffect } from "react";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllApplicants } from "../redux/applications";
import { useDispatch, useSelector } from "react-redux";

import apiRequest from "../utils/axiosUtility";

function useFetchApplicants(id) {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const endpoint = `${APPLICATION_API_END_POINT}/getApplicant/${id}`;
        const res = await apiRequest("GET", endpoint, {}, token, dispatch);

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.data.application));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } 
    };
    fetchApplicants();
  }, [id, dispatch, token]);
}

export default useFetchApplicants;
