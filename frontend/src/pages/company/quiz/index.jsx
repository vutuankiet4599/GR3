import { Button, Container, IconButton, Tab, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import QuizItem from "../../../components/Company/QuizItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import QuizService from "../../../services/Quiz/QuizService";

const QuizPage = () => {
    const [quizData, setQuizData] = useState([]);
    const [quiz, setQuiz] = useState("");
    const [questions, setQuestions] = useState([
        {
            title: "",
            correctAnswer: "",
            wrongAnswerFirst: "",
            wrongAnswerSecond: "",
            wrongAnswerThird: "",
        },
    ]);

    const handleAddNewQuestion = () => {
        setQuestions([
            ...questions,
            {
                title: "",
                correctAnswer: "",
                wrongAnswerFirst: "",
                wrongAnswerSecond: "",
                wrongAnswerThird: "",
            },
        ]);
    };

    const handleRemoveQuestionByIndex = (index) => {
        let newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleUpdateQuestionByIndex = (index, value, type) => {
        let newQuestions = [...questions];
        if (type === "title") {
            newQuestions[index].title = value;
        }
        if (type === "correctAnswer") {
            newQuestions[index].correctAnswer = value;
        }
        if (type === "wrongAnswerFirst") {
            newQuestions[index].wrongAnswerFirst = value;
        }
        if (type === "wrongAnswerSecond") {
            newQuestions[index].wrongAnswerSecond = value;
        }
        if (type === "wrongAnswerThird") {
            newQuestions[index].wrongAnswerThird = value;
        }
        setQuestions(newQuestions);
    };

    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCreateNewQuiz = async () => {
        try {
            let response = await QuizService.create({ title: quiz, questions: questions });
            if (response.isError) {
                return toast.error(response.message);
            }
            setQuiz("");
            setQuestions([
                {
                    title: "",
                    correctAnswer: "",
                    wrongAnswerFirst: "",
                    wrongAnswerSecond: "",
                    wrongAnswerThird: "",
                },
            ]);
            toast.success("Tạo quiz thành công");
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    useEffect(() => {
        const fetchQuizzesData = async () => {
            try {
                let response = await QuizService.companyQuizzes();
                setQuizData(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
                setQuizData([]);
            }
        };

        fetchQuizzesData();
    }, []);

    return (
        <Container maxWidth="xl" className="p-4 px-16 flex flex-col gap-3 grow">
            <div className="w-full">
                <Link to="/company">
                    <Button variant="contained" color="primary" startIcon={<ArrowBackIosNewIcon />}>
                        Quay lại trang chủ
                    </Button>
                </Link>
            </div>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="user tab" className="flex items-center justify-center">
                    <Tab value="1" label="Danh sách tất cả bài quizzes" />
                    <Tab value="2" label="Tạo quiz mới" />
                </TabList>
                <TabPanel value="1">
                    <div className="flex flex-col gap-2">
                        {quizData.map((q, i) => (
                            <QuizItem key={i} index={i + 1} title={q.title} questions={q.questions} users={q.users} />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className="w-full flex flex-col gap-2">
                        <Typography variant="h5">Tiêu đề bài quiz</Typography>
                        <TextField
                            value={quiz}
                            onChange={(e) => setQuiz(e.target.value)}
                            label="Tiêu đề bài quiz"
                            required
                        />
                        <Typography variant="h5">Nội dung các câu hỏi</Typography>
                        {questions.map((question, index) => (
                            <div key={index} className="bg-white border shadow-md w-full flex px-3 py-4 ">
                                <div className="flex flex-col gap-2 border-r-2 grow">
                                    <TextField
                                        label={`Tiêu đề câu hỏi số ${index + 1}`}
                                        multiline
                                        minRows={3}
                                        maxRows={6}
                                        value={question.title}
                                        required
                                        onChange={(e) => handleUpdateQuestionByIndex(index, e.target.value, "title")}
                                    />
                                    <TextField
                                        label={`Đáp án đúng`}
                                        value={question.correctAnswer}
                                        required
                                        onChange={(e) =>
                                            handleUpdateQuestionByIndex(index, e.target.value, "correctAnswer")
                                        }
                                    />
                                    <TextField
                                        label={`Đáp án sai số 1`}
                                        value={question.wrongAnswerFirst}
                                        required
                                        onChange={(e) =>
                                            handleUpdateQuestionByIndex(index, e.target.value, "wrongAnswerFirst")
                                        }
                                    />
                                    <TextField
                                        label={`Đáp án sai số 2`}
                                        value={question.wrongAnswerSecond}
                                        required
                                        onChange={(e) =>
                                            handleUpdateQuestionByIndex(index, e.target.value, "wrongAnswerSecond")
                                        }
                                    />
                                    <TextField
                                        label={`Đáp án sai số 3`}
                                        value={question.wrongAnswerThird}
                                        required
                                        onChange={(e) =>
                                            handleUpdateQuestionByIndex(index, e.target.value, "wrongAnswerThird")
                                        }
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <IconButton color="error" onClick={() => handleRemoveQuestionByIndex(index)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-center">
                            <IconButton color="success" onClick={handleAddNewQuestion} size="large">
                                <AddIcon />
                            </IconButton>
                        </div>
                        <Button color="primary" variant="contained" onClick={handleCreateNewQuiz}>
                            Thêm mới
                        </Button>
                    </div>
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default QuizPage;
