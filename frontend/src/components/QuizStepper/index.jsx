import { Box, Button, Divider, Step, StepLabel, Stepper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const QuizStepper = ({ questions, handleUpdateScore, handleFinishQuiz }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isSelected, setIsSelected] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        if (activeStep !== questions.length) {
            const answers = [
                { text: questions[activeStep].correct_answer, isCorrect: true },
                { text: questions[activeStep].wrong_answer_first, isCorrect: false },
                { text: questions[activeStep].wrong_answer_second, isCorrect: false },
                { text: questions[activeStep].wrong_answer_third, isCorrect: false },
            ];
            setShuffledAnswers(shuffleArray(answers));
        }

        if (activeStep === questions.length) {
            handleFinishQuiz();
        }
    }, [questions, activeStep, handleFinishQuiz]);

    const shuffleArray = (array) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        setIsSelected(true);
    };

    const handleNext = () => {
        if (shuffledAnswers[selectedAnswer].isCorrect) {
            handleUpdateScore(10);
        }
        setIsSelected(false);
        setSelectedAnswer(null);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Box sx={{ width: "75%" }} className="border px-6 py-8 shadow-md">
            <Stepper activeStep={activeStep} connector={<></>}>
                {questions.map((_, index) => {
                    return (
                        <Step key={index} className="mb-2">
                            <StepLabel></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Divider />
            {activeStep === questions.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>Bạn đã hoàn thành bài quiz</Typography>
                </>
            ) : (
                <>
                    <div className="w-full flex flex-col gap-2">
                        <Typography variant="h5" className="mb-2 px-4 py-3 text-wrap">
                            {questions[activeStep].title}
                        </Typography>
                        {shuffledAnswers.map((answer, index) => (
                            <Typography
                                className={`cursor-pointer px-4 py-3 text-wrap border ${selectedAnswer === index ? (answer.isCorrect ? "bg-lime-300" : "bg-red-300") : "bg-white"} ${selectedAnswer === index && "bg-opacity-50 "}`}
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                            >
                                {answer.text}
                            </Typography>
                        ))}
                    </div>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button disabled={!isSelected} onClick={handleNext}>
                            {activeStep === questions.length - 1 ? "Nộp bài" : "Tiếp theo"}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

QuizStepper.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleFinishQuiz: PropTypes.func.isRequired,
    handleUpdateScore: PropTypes.func.isRequired,
};

export default QuizStepper;
