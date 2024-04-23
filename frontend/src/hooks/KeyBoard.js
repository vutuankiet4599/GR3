import { useEffect, useState } from "react";

const usePressKey = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        function downHandler({ key }) {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        }

        const upHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };
        document.addEventListener("keydown", downHandler);
        document.addEventListener("keyup", upHandler);

        return () => {
            document.removeEventListener("keydown", downHandler);
            document.removeEventListener("keyup", upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};

export default usePressKey;
