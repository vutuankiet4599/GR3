import axiosInstanceGenerator from "./base";
import { LocalStorageUtil } from "../utils";
const authApi = axiosInstanceGenerator();

authApi.interceptors.request.use(
    (req) => {
        req.headers.Authorization = `Bearer ${LocalStorageUtil.get("token")}`;
        return req;
    },

    (err) => Promise.reject(err),
);

export default authApi;
