import PropTypes from "prop-types";

const QuizAnswer = ({ answer, isCorrect }) => {
    return <div>QuizAnswer</div>;
};

QuizAnswer.propTypes = {
    answer: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
};

export default QuizAnswer;
