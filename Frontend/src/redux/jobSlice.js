import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    searchJobs: [],
    singleJob: null,
    alljobsAdmin: [],
    allAppliedJobs: [],
    searchJobByText: "",
    searchedQuery: "",
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSearchJobs: (state, action) => {
      state.searchJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllJobsAdmin: (state, action) => {
      state.alljobsAdmin = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllJobsAdmin,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setSearchJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
