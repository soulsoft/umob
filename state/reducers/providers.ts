/**
 * @format
 * @flow strict-local
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_PROVIDER_1, API_PROVIDER_2, API_PROVIDER_3
} from "../../config/api";

export const slice = createSlice({
  name: "providers",
  initialState: {
    provider1: [],
    provider2: [],
    provider3: []
  },
  reducers: {
    setProvider1: (state, action: PayloadAction<any>) => {
      state.provider1 = action.payload.vehicles;
    },
    setProvider2: (state, action: PayloadAction<any>) => {
      state.provider2 = action.payload.bikes;
    },
    setProvider3: (state, action: PayloadAction<any>) => {
      state.provider3 = action.payload.bikes;
    }
  }
});
export const {
  setProvider1,
  setProvider2,
  setProvider3
} = slice.actions;

const fetchProviders: Function = () => (dispatch: any) =>
  new Promise((resolve, reject) => {

// Create an array of Axios requests
    const axiosRequests = [
      axios.get(API_PROVIDER_1),
      axios.get(API_PROVIDER_2),
      axios.get(API_PROVIDER_3)
    ];

// Use Promise.all to wait for all requests to complete
    Promise.all(axiosRequests)
      .then(responses => {
        // Extract data from each response
        dispatch(setProvider1(responses[0]?.data?.data));
        dispatch(setProvider2(responses[1]?.data?.data));
        dispatch(setProvider3(responses[2]?.data?.data));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });


export { fetchProviders };

export default slice.reducer;
