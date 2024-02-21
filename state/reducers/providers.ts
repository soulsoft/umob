/**
 * @format
 * @flow strict-local
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
} from '../../config/api';

export const slice = createSlice({
  name: 'providers',
  initialState: {
    providers: [],

  },
  reducers: {
    setProviders: (state, action: PayloadAction<any>) => {
      state.disclosures = action.payload.disclosures;
      state.step = action.payload.step;
    },
  },
});
export const {
  setProviders,
} = slice.actions;

const fetchProviderss: Function = (id: string) => (dispatch: any) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${`${'API_USER'}/${id}${'API_PROVIDERS'}`}`, {})
      .then(response => {
        if (response.status === 200) {
          dispatch(setProviders(response?.data?.data));
        }
        resolve(response?.data?.data.providers);
      })
      .catch(error => {
        reject();
      });
  });



export { fetchProviderss };

export default slice.reducer;
