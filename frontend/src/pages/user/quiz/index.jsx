import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QuizService from "../../../services/Quiz/QuizService";
import { Button, Container } from "@mui/material";
import QuizStepper from "../../../components/QuizStepper";

const QuizPage = () => {
    const [quiz, setQuiz] = useState({
        title: "",
        questions: [],
    });
    const { id } = useParams();
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleUpdateScore = (score) => {
        setScore((prev) => prev + score);
    };

    const handleFinishQuiz = async () => {
        try {
            let response = await QuizService.answerQuiz({ score: score }, id);
            if (response.isError) {
                return toast.error(response.message);
            }
            toast.success("Thông tin điểm số đã được lưu lại hoàn tất!");
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    useEffect(() => {
        const fetchQuizData = async (id) => {
            try {
                let response = await QuizService.getQuiz(id);
                if (response.isError) {
                    return toast.error(response.message);
                }
                setQuiz(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        fetchQuizData(id);
    }, [id]);

    return (
        <Container maxWidth="xl">
            <Button onClick={() => navigate(-1)} className="mt-5" variant="contained">
                Trở về
            </Button>
            <div className="flex items-center justify-center py-16 w-full">
                <QuizStepper
                    questions={quiz.questions}
                    handleFinishQuiz={handleFinishQuiz}
                    handleUpdateScore={handleUpdateScore}
                />
            </div>
        </Container>
    );
};

export default QuizPage;
