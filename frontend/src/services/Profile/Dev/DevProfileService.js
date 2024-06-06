import authApi from "../../../api/authApi";
import { LocalStorageUtil } from "../../../utils";

const DevProfileService = {
    getCurrentUserApplications: async () => {
        try {
            let response = await authApi.get("/v1/devs/profile/applications");
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy thông tin ứng tuyển. Mời thử lại sau!",
            };
        }
    },
    uploadCv: async (cv) => {
        try {
            let formData = new FormData();
            formData.append("cv", cv);
            let response = await authApi.post("/v1/devs/profile/cv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            LocalStorageUtil.set("user", response.data);
            return {
                data: response.data,
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể tải cv lên hệ thống. Mời thử lại sau!",
            };
        }
    },
    updateTags: async (tags) => {
        try {
            let tagIds = tags.map((tag) => tag.id);
            await authApi.put("/v1/devs/profile/tags", {
                tags: tagIds,
            });
            return {
                message: "Cập nhật thẻ thành công!",
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể cập nhật thẻ được. Mời thử lại sau!",
            };
        }
    },
};

export default DevProfileService;
