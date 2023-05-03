import { configureStore } from "@reduxjs/toolkit";

import auhtReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import photoReducer from "./slices/photoSlice";

export const store = configureStore({
  reducer: {
    auth: auhtReducer,
    user: userReducer,
    photo: photoReducer,
  },
});