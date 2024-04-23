import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const UserInput = ({ userInput, setUserInput }) => {
    return <TextField variant="outlined" multiline value={userInput} onChange={(e) => setUserInput(e.target.value)} />;
};

UserInput.propTypes = {
    userInput: PropTypes.string,
    setUserInput: PropTypes.func,
};

export default UserInput;
