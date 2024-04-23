import authApi from "../../../api/authApi";
import publicApi from "../../../api/publicApi";
import { SessionUtil } from "../../../utils";

const DevAuthService = {
    login: async (data) => {
        try {
            let response = await publicApi.post("/v1/auth/devs/login", data);
            SessionUtil.set("user", response.data.user);
            SessionUtil.set("token", response.data.token);
            return {
                message: "Đăng nhập thành công",
                data: {
                    user: response.data.user,
                    token: response.data.token,
                },
            };
        } catch (error) {
            if (error.response.status == 500) {
                return {
                    isError: true,
                    message: "Lỗi hệ thống, mời quay lại sau",
                };
            }

            return {
                isError: true,
                message: "Thông tin bạn nhập sai hoặc không hợp lệ. Mời nhập lại",
            };
        }
    },

    register: async (data) => {
        try {
            let formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("password_confirmation", data.passwordConfirmation);
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("image", data.image);
            await publicApi.post("/v1/auth/devs/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return {
                message: "Tài khoản tạo mới thành công. Mời xác thực ở email để sử dụng.",
            };
        } catch (error) {
            if (error.response.status == 500) {
                return {
                    isError: true,
                    message: "Lỗi hệ thống, mời quay lại sau",
                };
            }

            return {
                isError: true,
                message: "Thông tin bạn nhập sai hoặc không hợp lệ. Mời nhập lại",
            };
        }
    },

    logout: async () => {
        try {
            await authApi.post("/v1/auth/devs/logout");
            SessionUtil.delete("user");
            SessionUtil.delete("token");
            return {
                message: "Đăng xuất thành công",
            };
        } catch (error) {
            return {
                isError: true,
                message: "Lỗi hệ thống, mời quay lại sau",
            };
        }
    },
};

export default DevAuthService;
