import PropTypes from "prop-types";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
    return (
        <FormControl>
            <InputLabel id="themes">Theme</InputLabel>
            <Select
                labelId="themes"
                label="Theme"
                name="themes"
                onChange={(e) => handleThemeChange(e.target.value)}
                value={theme}
            >
                {Object.entries(monacoThemes).map((option) => (
                    <MenuItem key={option[0]} value={option[0]}>
                        {option[1]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

ThemeDropdown.propTypes = {
    handleThemeChange: PropTypes.func,
    theme: PropTypes.string,
};

export default ThemeDropdown;
