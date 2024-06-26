import axios from "axios";

const axiosInstanceGenerator = () => {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_SCHEME}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api`,
        timeout: 15000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    instance.interceptors.response.use(
        (res) => res.data,
        (err) => Promise.reject(err),
    );

    return instance;
};

export default axiosInstanceGenerator;
