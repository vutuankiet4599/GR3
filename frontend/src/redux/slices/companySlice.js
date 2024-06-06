import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageUtil } from "../../utils";

const getInitState = () => {
    let data = LocalStorageUtil.get("company");
    if (data) {
        return data;
    }
    return {
        name: "",
        email: "",
        logo: "",
    };
};

const companySlice = createSlice({
    name: "company",
    initialState: getInitState(),
    reducers: {
        updateCompany: (state, action) => {
            let { name, email, logo, business } = action.payload;
            console.log(action.payload);
            state.name = name;
            state.email = email;
            state.logo = logo;
            state.business = business;
        },
        resetCompany: (state, action) => {
            console.log(action.type);
            state.name = "";
            state.email = "";
            state.logo = "";
            state.business = "";
        },
    },
});

export default companySlice;
