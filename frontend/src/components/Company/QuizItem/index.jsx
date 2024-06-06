import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { useState } from "react";

const QuizItem = ({ index = 1, title, questions, users }) => {
    const [isShowQuestions, setIsShowQuestions] = useState(false);
    const [isShowUser, setIsShowUser] = useState(false);
    return (
        <Accordion className="w-full border">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Bài quiz số {index}: {title}
            </AccordionSummary>
            <AccordionDetails>
                <div className="w-full flex gap-2 items-center justify-start">
                    <Button color="primary" onClick={() => setIsShowQuestions((prev) => !prev)}>
                        Hiển thị danh sách câu hỏi
                    </Button>
                    <Button color="info" onClick={() => setIsShowUser((prev) => !prev)}>
                        Hiển thị danh sách người trả lời
                    </Button>
                </div>
                {isShowQuestions &&
                    questions.map((question, i) => (
                        <Paper key={i} className="flex flex-col gap-2 mb-3 border py-3 px-4">
                            <Typography className="text-wrap w-full mb-2 px-3 py-4 border font-bold text-lg">
                                {question.title}
                            </Typography>
                            <Typography className="text-wrap w-full bg-lime-300 bg-opacity-50 px-3 py-4 border">
                                {question.correct_answer}
                            </Typography>
                            <Typography className="text-wrap w-full bg-red-300 bg-opacity-50 px-3 py-4 border">
                                {question.wrong_answer_first}
                            </Typography>
                            <Typography className="text-wrap w-full bg-red-300 bg-opacity-50 px-3 py-4 border">
                                {question.wrong_answer_second}
                            </Typography>
                            <Typography className="text-wrap w-full bg-red-300 bg-opacity-50 px-3 py-4 border">
                                {question.wrong_answer_third}
                            </Typography>
                        </Paper>
                    ))}
                {isShowUser &&
                    users.map((user, i) => (
                        <Typography key={i} className="border shadow px-4 py-3 flex items-center justify-start">
                            {user.name} - {user.email}:&nbsp;
                            <span
                                className={
                                    user.pivot.score > questions.length * 10 * 0.8
                                        ? "text-green-500"
                                        : user.pivot.score < questions.length * 10 * 0.4
                                          ? "text-red-500"
                                          : "text-yellow-500"
                                }
                            >
                                {user.pivot.score}
                            </span>
                            &nbsp;điểm.
                        </Typography>
                    ))}
            </AccordionDetails>
        </Accordion>
    );
};

QuizItem.propTypes = {
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuizItem;
