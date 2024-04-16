// savedJobsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedJobs: [],
};

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {
    addSavedJob: (state, action) => {
      state.savedJobs.push(action.payload);
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload);
    },
  },
});

export const { addSavedJob, removeSavedJob } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
