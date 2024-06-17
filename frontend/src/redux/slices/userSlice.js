import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageUtil } from "../../utils";

const getInitState = () => {
    let data = LocalStorageUtil.get("user");
    if (data) {
        return data;
    }
    return {
        id: 0,
        name: "",
        email: "",
        image: "",
        cv: "",
        phone: "",
    };
};

const userSlice = createSlice({
    name: "user",
    initialState: getInitState(),
    reducers: {
        updateUserInfo: (state, action) => {
            const { name, email, image, id, cv, phone } = action.payload;
            state.id = id;
            state.name = name;
            state.email = email;
            state.image = image;
            state.cv = cv;
            state.phone = phone;
        }, // => { type: 'user/updateUserInfo' }
        resetUserInfo: (state, action) => {
            console.log(action.type);
            state.id = 0;
            state.name = "";
            state.email = "";
            state.image = "";
            state.cv = "";
            state.phone = "";
        },
    },
});

export default userSlice;
