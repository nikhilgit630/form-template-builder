// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "./Template/Slice";

const store = configureStore({
  reducer: {
    templates: templatesReducer,
  },
});

export default store;
