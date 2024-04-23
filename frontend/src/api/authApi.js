import axiosInstanceGenerator from "./base";
import { SessionUtil } from "../utils";
const authApi = axiosInstanceGenerator();

authApi.interceptors.request.use(
    (req) => {
        req.headers.Authorization = `Bearer ${SessionUtil.get("token")}`;
        return req;
    },

    (err) => Promise.reject(err),
);

export default authApi;
