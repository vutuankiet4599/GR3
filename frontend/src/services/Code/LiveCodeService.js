import authApi from "../../api/authApi";
import publicApi from "../../api/publicApi";

const LiveCodeService = {
    createRoom: async () => {
        try {
            let response = await authApi.post("/v1/code/rooms");
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể tạo được phòng. Mời thử lại sau!",
            };
        }
    },
    liveCode: async (body, code) => {
        try {
            let response = await authApi.post("/v1/code/live", {
                body: body,
                code: code,
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getRoom: async (roomCode) => {
        try {
            let response = await publicApi.get(`/v1/code/rooms/${roomCode}`);
            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy thông tin phòng. Mời thử lại sau!",
            };
        }
    },
    getCompanyRooms: async () => {
        try {
            let response = await authApi.get("/v1/code/rooms");
            return {
                data: response.data,
            };
        } catch (error) {
            console.log(error);
            return {
                isError: true,
                message: "Không thể lấy thông tin phòng. Mời thử lại sau!",
            };
        }
    },
};
export default LiveCodeService;
