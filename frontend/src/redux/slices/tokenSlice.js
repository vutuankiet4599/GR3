import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageUtil } from "../../utils";

const tokenSlice = createSlice({
    name: "token",
    initialState: LocalStorageUtil.get("token"),
    reducers: {
        updateToken: (state, action) => {
            state = action.payload;
            return state;
        },
        resetToken: (state, action) => {
            console.log(action.type);
            state = "";
            return state;
        },
    },
});

export default tokenSlice;
