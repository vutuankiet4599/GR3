import publicApi from "../../../api/publicApi";

const CompanyService = {
    outstanding: async () => {
        try {
            let response = await publicApi.get("/v1/companies/outstanding");
            return {
                data: response.data,
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể lấy thông tin công ty, mời thử lại!",
            };
        }
    },
};

export default CompanyService;
