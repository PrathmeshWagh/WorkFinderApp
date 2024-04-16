// store.js

import { configureStore } from '@reduxjs/toolkit';
import savedJobsReducer from './savedSlice'; 


export default configureStore({
  reducer: {
    savedJobs: savedJobsReducer,
  },
});
