import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { languageOptions } from "../../../constants/Code";

const LanguagesDropdown = ({ onSelectChange }) => {
    return (
        <FormControl>
            <InputLabel id="Language">Ngôn ngữ lập trình</InputLabel>
            <Select
                labelId="Language"
                label="Ngôn ngữ lập trình"
                name="languages"
                defaultValue={languageOptions[0]}
                onChange={(e) => onSelectChange(e.target.value)}
            >
                {languageOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

LanguagesDropdown.propTypes = {
    onSelectChange: PropTypes.func,
};

export default LanguagesDropdown;
