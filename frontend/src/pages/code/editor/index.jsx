import { useEffect, useState } from "react";
import CodeEditorWindow from "../../../components/CodeEditor/CodeEditorWindow";
import { languageOptions } from "../../../constants/Code";
import useKeyPress from "../../../hooks/KeyBoard";
import OutputWindow from "../../../components/CodeEditor/OutputWindow";
import OutputDetails from "../../../components/CodeEditor/OutputDetails";
import ThemeDropdown from "../../../components/CodeEditor/ThemeDropdown";
import LanguagesDropdown from "../../../components/CodeEditor/LanguagesDropdown";
import { toast } from "react-toastify";
import UserInput from "../../../components/CodeEditor/UserInput";
import { Button } from "@mui/material";
import defineTheme from "../../../lib/DefineTheme";
import axios from "axios";
import { useSelector } from "react-redux";
import { companySelector, userSelector } from "../../../redux/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "../../../hooks/Performance";
import LiveCodeService from "../../../services/Code/LiveCodeService";
import { io } from "socket.io-client";

const javascriptDefault = ``;

const CodeEditorPage = () => {
    const [code, setCode] = useState(javascriptDefault);
    const [userInput, setUserInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("oceanic-next");
    const [language, setLanguage] = useState(languageOptions[0]);
    const [socket, setSocket] = useState(null);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlPress, enterPress]);

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(userInput),
        };
        const options = {
            method: "POST",
            url: import.meta.env.VITE_RAPID_API_URL,
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                // get error status
                let status = err.response.status;
                if (status === 429) {
                    console.log("too many requests", status);

                    showErrorToast(`Quá quota!`, 10000);
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                showSuccessToast(`Dịch thành công!`);
                return;
            }
        } catch (err) {
            setProcessing(false);
            showErrorToast(`Dịch thất bại!`);
        }
    };

    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);

        if (["light", "vs-dark"].includes(theme)) {
            setTheme(theme);
        } else {
            defineTheme(theme).then(() => setTheme(theme));
        }
    }

    useEffect(() => {
        defineTheme("oceanic-next").then(() => setTheme("oceanic-next"));
    }, []);

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`);
    };
    const showErrorToast = (msg) => {
        toast.error(msg || `Something went wrong! Please try again.`);
    };

    const user = useSelector(userSelector);
    const company = useSelector(companySelector);

    const navigate = useNavigate();

    let codeDebounce = useDebounce(code, 1000);

    let { roomCode } = useParams();

    useEffect(() => {
        const socket = io(
            `${import.meta.env.VITE_LIVESERVER_SCHEME}://${import.meta.env.VITE_LIVESERVER_HOST}:${import.meta.env.VITE_LIVESERVER_PORT}`,
            {
                query: {
                    roomCode: roomCode,
                },
            },
        );
        socket.on(`RECEIVE-${roomCode}`, (data) => {
            console.log("Data received: " + JSON.stringify(data));
            setCode(data.value);
        });
        setSocket(socket);

        return () => {
            setSocket(null);
            socket.off(`RECEIVE-${roomCode}`);
            socket.off(`SEND-${roomCode}`);
        };
    }, [roomCode]);

    useEffect(() => {
        if (!user && !company) {
            return navigate("/login");
        }
    }, [company, user, navigate]);

    useEffect(() => {
        // gọi api để đồng bộ code giữa dev và company tại chỗ này
        const handleLiveCode = () => {
            // console.log(codeDebounce);
            // await LiveCodeService.liveCode(codeDebounce, roomCode);
            if (socket !== null && roomCode) {
                socket.emit(`SEND-${roomCode}`, {
                    value: codeDebounce,
                });
            }
        };

        handleLiveCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeDebounce]);

    useEffect(() => {
        const handleGetRoomData = async () => {
            try {
                let response = await LiveCodeService.getRoom(roomCode);
                if (response.isError) {
                    return toast.error(response.message);
                }
                setCode(response.data.body);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        handleGetRoomData();
    }, [roomCode]);

    return (
        <div className="my-5">
            <div className="flex flex-row">
                <div className="px-4 py-2">
                    <LanguagesDropdown onSelectChange={onSelectChange} />
                </div>
                <div className="px-4 py-2">
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditorWindow code={code} onChange={onChange} language={language?.value} theme={theme} />
                </div>

                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow outputDetails={outputDetails} />
                    <div className="flex flex-col mt-3 gap-3">
                        <UserInput userInput={userInput} setUserInput={setUserInput} />
                        <Button
                            onClick={handleCompile}
                            disabled={!code}
                            variant="contained"
                            color="info"
                            className="w-[50%]"
                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </Button>
                    </div>
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </div>
            </div>
        </div>
    );
};

export default CodeEditorPage;
