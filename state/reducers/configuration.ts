/**
 * @format
 * @flow strict-local
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'configuration',
  initialState: {
    isSplashScreen: true,
  },
  reducers: {
    endSplashLoading: (state, action: PayloadAction<any>) =>{
      state.isSplashScreen= false;
    }
  },
});
 const {
   endSplashLoading,
} = slice.actions;

const updateIsSplashScreen = (value: boolean) => (dispatch: any) => {
  dispatch(endSplashLoading(value));
};



export { updateIsSplashScreen };

export default slice.reducer;
