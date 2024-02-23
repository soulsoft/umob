/**
 * @format
 * @flow strict-local
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export const slice = createSlice({
  name: "user",
  initialState: {
    isUserLoggedIn: false,
    token: undefined,
    userInfo: undefined,
    currentScore: 0,
    currentAnswer: []
  },
  reducers: {
    setUserInfos: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<any>) => {
      state.isUserLoggedIn = action.payload;
    },
    setCurrentScore: (state, action: PayloadAction<any>) => {
      state.currentScore = action.payload;
    },
    setCurrentAnswer: (state, action: PayloadAction<any>) => {
      state.currentAnswer = action.payload;
    }
  }
});
const {
  setUserInfos,
  setIsLoggedIn,
  setCurrentScore,
  setCurrentAnswer
} = slice.actions;

const updateUserInfos = (user: any) => (dispatch: any) => {
  dispatch(setUserInfos(user));
};

const updateIsLoggedIn = (value: boolean) => (dispatch: any) => {
  dispatch(setIsLoggedIn(value));
};

const updateCurrentScore = (value: number) => (dispatch: any) => {

  dispatch(setCurrentScore(value));
};
const updateCurrentAnswer = (value: any) => (dispatch: any) => {

  dispatch(setCurrentAnswer(value));
};


export {
  updateUserInfos,
  updateIsLoggedIn,
  updateCurrentScore,
  updateCurrentAnswer
};

export default slice.reducer;
