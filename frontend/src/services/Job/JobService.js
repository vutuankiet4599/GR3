import authApi from "../../api/authApi";
import publicApi from "../../api/publicApi";

const JobService = {
    search: async (query, contract, level, type, city, page, tags) => {
        try {
            let response = await publicApi.get("/v1/devs/jobs/search", {
                params: {
                    query: query,
                    contract: contract,
                    level: level,
                    type: type,
                    city: city,
                    page: page,
                    "tags[]": tags,
                },
            });
            return {
                data: response.data,
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
            };
        }
    },

    hotJob: async () => {
        try {
            let response = await publicApi.get("/v1/devs/jobs/hot");
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy thông tin công việc. Mời thử lại!",
            };
        }
    },

    find: async (id) => {
        try {
            let response = await publicApi.get(`/v1/devs/jobs/${id}`);
            let data = response.data;

            data.work = JSON.parse(data.work);
            data.skill = JSON.parse(data.skill);
            data.welfare = JSON.parse(data.welfare);
            data.interview = JSON.parse(data.interview);

            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy thông tin công việc. Mời thử lại!",
            };
        }
    },

    apply: async (applicationJobId) => {
        try {
            await authApi.post("/v1/devs/jobs/apply", {
                application_job_id: applicationJobId,
            });
            return {
                message: "Ứng tuyển thành công",
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể tạo ứng tuyển cho công việc này. Mời thử lại sau!",
            };
        }
    },

    bestFit: async () => {
        try {
            let response = await authApi.get("/v1/devs/jobs/best-fit");
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể tìm được công việc phù hợp cho bạn. Mời thử lại sau!",
            };
        }
    },

    create: async (data) => {
        try {
            let response = await authApi.post("/v1/companies/jobs", {
                name: data.name,
                description: data.description,
                salary: data.salary,
                welfare: data.welfare,
                experience: data.experience,
                interview: data.interview,
                type: data.type,
                contract: data.contract,
                work: data.work,
                skill: data.skill,
                level: data.level,
                city_id: data.cityId,
                tags: data.tags,
            });
            console.log(response);
            return {
                data: response.data,
                message: "Đăng tuyển dụng thành công!",
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Đăng công việc mới thất bại. Mời thử lại sau!",
            };
        }
    },

    companyJobs: async () => {
        try {
            let response = await authApi.get("/v1/companies/jobs");
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy công việc. Mời thử lại sau!",
            };
        }
    },

    companyJob: async (id) => {
        try {
            let response = await authApi.get(`/v1/companies/jobs/${id}`);
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy công việc. Mời thử lại sau!",
            };
        }
    },

    updateApplicationStatus: async (id, status) => {
        try {
            let response = await authApi.put(`/v1/companies/applications/${id}/status`, {
                status: status,
            });
            return {
                data: response.data,
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể xử lý được. Mời thử lại sau!",
            };
        }
    },
};

export default JobService;
