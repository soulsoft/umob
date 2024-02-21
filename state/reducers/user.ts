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
    isSplashScreen: true,
    token: undefined,
    userInfo: {
      user: {
        user_id: undefined,
        email: undefined,
        name: null,
        nick_name: null,
        location: null,
        score: 0,
      },
    },
  },
  reducers: {
    setUserInfos: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    endSplashLoading: (state, action: PayloadAction<any>) =>{
      state.isSplashScreen= false;
    }
  },
});
export const {
  setUserInfos,
  endSplashLoading
} = slice.actions;

const updateUserInfos = (user: any) => (dispatch: any) => {
  dispatch(setUserInfos(user));
};


export {
  endSplashLoading,
  updateUserInfos,

};

export default slice.reducer;
