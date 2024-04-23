import { createSlice } from "@reduxjs/toolkit";
import { SessionUtil } from "../../utils";

const tokenSlice = createSlice({
    name: "token",
    initialState: SessionUtil.get("token"),
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
