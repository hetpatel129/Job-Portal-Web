import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setSingleComapny } from "../redux/companySlice";
import apiRequest from "../utils/axiosUtility";

function useGetSingleCompany(companyId) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth); // Get token from auth state
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const endpoint = `${COMPANY_API_END_POINT}/getCompany/${companyId}`;

        const res = await apiRequest("GET", endpoint, {}, token, dispatch);

        if (res.status === 200) {
          dispatch(setSingleComapny(res.data.data)); // Corrected spelling
        } else {
          dispatch(setSingleComapny(null));
          console.error(`Error: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching company:", error.message);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch, token]);
}

export default useGetSingleCompany;
