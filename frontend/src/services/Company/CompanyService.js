import authApi from "../../api/authApi";
import publicApi from "../../api/publicApi";

const CompanyService = {
    sendEmail: async (userId, body) => {
        try {
            let response = await authApi.post("/v1/companies/user/contact", {
                user_id: userId,
                body: body,
            });
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Gửi email thất bại. Mời thử lại sau!",
            };
        }
    },

    getCompany: async (id) => {
        try {
            let response = await publicApi.get(`/v1/companies/${id}`);
            let data = response.data;
            data.treatment = JSON.parse(data.treatment);
            return {
                data: data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy được thông tin công ty. Mời thử lại sau!",
            };
        }
    },
};

export default CompanyService;
