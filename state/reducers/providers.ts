/**
 * @format
 * @flow strict-local
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API_PROVIDER_1
} from "../../config/api";

export const slice = createSlice({
  name: 'providers',
  initialState: {
    providers: [],
  },
  reducers: {
    setProviders: (state, action: PayloadAction<any>) => {
      state.providers = action.payload.vehicles;
    },
  },
});
export const {
  setProviders,
} = slice.actions;

const fetchProviderss: Function = () => (dispatch: any) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PROVIDER_1, {})
      .then(response => {
        if (response.status === 200) {
          dispatch(setProviders(response?.data?.data));
        }
        resolve(response?.data?.data);
      })
      .catch(error => {
        reject();
      });
  });



export { fetchProviderss };

export default slice.reducer;
