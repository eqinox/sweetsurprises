import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./reducers";

const initialState = {};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
};

export default makeStore;
