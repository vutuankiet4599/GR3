import authApi from "../../../api/authApi";
import publicApi from "../../../api/publicApi";
import { SessionUtil } from "../../../utils";

const CompanyAuthService = {
    login: async (data) => {
        try {
            let response = await publicApi.post("/v1/auth/companies/login", data);
            SessionUtil.set("company", response.data.company);
            SessionUtil.set("token", response.data.token);
            return {
                message: "Đăng nhập thành công",
                data: {
                    company: response.data.company,
                    token: response.data.token,
                },
            };
        } catch (error) {
            console.log(error);
            if (error.response?.status == 500) {
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
            formData.append("address", data.address);
            formData.append("description", data.description);
            if (data.logo) {
                formData.append("logo", data.logo);
            }
            formData.append("size", data.size);
            formData.append("nationality", data.nationality);
            formData.append("business", data.business);
            formData.append("website", data.website);
            await publicApi.post("/v1/auth/companies/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return {
                message: "Tài khoản tạo mới thành công. Mời xác thực ở email để sử dụng.",
            };
        } catch (error) {
            console.log(error);
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
            await authApi.post("/v1/auth/companies/logout");
            SessionUtil.delete("company");
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

export default CompanyAuthService;
