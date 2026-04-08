import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setAllCompanies } from "../redux/companySlice";
import apiRequest from "../utils/axiosUtility";

function useGetAllCompanies() {
  const { token, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      const endpoint = `${COMPANY_API_END_POINT}/getAllCompanies`;
      try {
        const res = await apiRequest("GET", endpoint, {}, token, dispatch);
       
        if (res.status === 200) {
          dispatch(setAllCompanies(res.data.data));
        } else {
          dispatch(setAllCompanies([]));
        }
      } catch (error) {
        dispatch(setAllCompanies([]));
        console.error("Error fetching companies:", error);
      }
    };

    if (authUser) {
      fetchAllCompanies();
    }
  }, [token, authUser, dispatch]);
}

export default useGetAllCompanies;
