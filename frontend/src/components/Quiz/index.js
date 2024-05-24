import PropTypes from "prop-types";

const QuizCard = ({ quiz }) => {
    return <div>{quiz.question}</div>;
};

QuizCard.propTypes = {
    quiz: PropTypes.object.isRequired,
};

export default QuizCard;
