import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    useEffect(() => {
        setValue(code);
    }, [code]);

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
        </div>
    );
};

CodeEditorWindow.propTypes = {
    onChange: PropTypes.func,
    language: PropTypes.string,
    code: PropTypes.string,
    theme: PropTypes.string,
};

export default CodeEditorWindow;
