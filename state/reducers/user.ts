/**
 * @format
 * @flow strict-local
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export const slice = createSlice({
  name: 'user',
  initialState: {
    isUserLoggedIn: false,
    token: undefined,
    userInfo: undefined,
  },
  reducers: {
    setUserInfos: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<any>) =>{
      state.isUserLoggedIn= action.payload;
    }
  },
});
 const {
  setUserInfos,
  setIsLoggedIn
} = slice.actions;

const updateUserInfos = (user: any) => (dispatch: any) => {
  dispatch(setUserInfos(user));
};

const updateIsLoggedIn = (value: boolean) => (dispatch: any) => {
  dispatch(setIsLoggedIn(value));
};


export {
  updateUserInfos,
  updateIsLoggedIn
};

export default slice.reducer;
