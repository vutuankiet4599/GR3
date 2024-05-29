import authApi from "../../api/authApi";
import publicApi from "../../api/publicApi";

const QuizService = {
    create: async (data) => {
        try {
            let questions = data.questions.map((question) => ({
                title: question.title,
                correct_answer: question.correctAnswer,
                wrong_answer_first: question.wrongAnswerFirst,
                wrong_answer_second: question.wrongAnswerSecond,
                wrong_answer_third: question.wrongAnswerThird,
            }));
            let requestData = {
                title: data.title,
                questions: questions,
            };

            let response = await authApi.post("/v1/companies/quizzes", requestData);

            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể tạo được bài quiz mới. Vui lòng thử lại!",
            };
        }
    },

    companyQuizzes: async () => {
        try {
            let response = await authApi.get("/v1/companies/quizzes");

            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy được bài quizzes. Vui lòng thử lại!",
            };
        }
    },

    getQuiz: async (id) => {
        try {
            let response = await publicApi.get(`/v1/devs/quizzes/${id}`);

            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể lấy được bài quizz. Vui lòng thử lại!",
            };
        }
    },

    answerQuiz: async (data, id) => {
        try {
            let response = await authApi.post(`/v1/devs/quizzes/${id}`, data);

            return {
                data: response.data,
            };
        } catch (error) {
            return {
                isError: true,
                message: "Không thể làm bài quiz. Có thể do bạn chưa ứng tuyển vào công ty này. Vui lòng thử lại!",
            };
        }
    },
};

export default QuizService;
