/**
 * @format
 * @flow strict-local
 */
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import { rootReducers } from "../reducers";

const reducers = combineReducers(rootReducers);
const persistConfig = {
  key: "primary",
  storage: AsyncStorage,
  whitelist: ["user", "providers"] // only persisted reducers
};


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk]
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
