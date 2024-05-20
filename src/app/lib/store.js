import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { composeSlice } from "./composeSlice";
import { inboxSlice } from './inboxSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    compose: composeSlice.reducer,
    inbox: inboxSlice.reducer
  },
});