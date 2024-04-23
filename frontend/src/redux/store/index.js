import { configureStore } from "@reduxjs/toolkit";
import { userSlice, tokenSlice, companySlice } from "../slices";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        token: tokenSlice.reducer,
        company: companySlice.reducer,
    },
});

export default store;
