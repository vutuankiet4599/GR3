import authApi from "../../api/authApi";

const TagService = {
    getAll: async () => {
        try {
            let response = await authApi.get("/v1/tags");
            return {
                data: response.data,
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể lấy được thông tin thẻ! Mời thử lại",
            };
        }
    },
};

export default TagService;
