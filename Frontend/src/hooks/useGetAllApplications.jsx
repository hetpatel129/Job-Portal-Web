import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import apiRequest from "../utils/axiosUtility";
import { setAllApplications } from "../redux/applications";

const useGetAllApplications = () => {
  const { token, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplication = async () => {
      const endpoint = `${APPLICATION_API_END_POINT}/getAllApplications`;
      try {

        const res = await apiRequest("GET", endpoint, {}, token, dispatch);

        if (res.status === 200) {
          dispatch(setAllApplications(res.data.data));
        } else {
          dispatch(setAllApplications([]));
        }
      } catch (error) {
        dispatch(setAllApplications([]));
        console.error("Error fetching companies:", error);
      } 
    };
    if (authUser) {
      fetchAllApplication();
    }
  }, [token, authUser, dispatch]);
};

export default useGetAllApplications;
