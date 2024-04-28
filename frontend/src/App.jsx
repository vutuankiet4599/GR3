import "./App.css";
import { useSelector } from "react-redux";
import { tokenSelector } from "./redux/selectors";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routers";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    // const dispatch = useDispatch();

    // const user = useSelector(userSelector);
    const token = useSelector(tokenSelector);

    // const handleClick = () => {
    //     dispatch(userSlice.actions.updateUserInfo({ name: "kiet" }));
    //     dispatch(tokenSlice.actions.updateToken("Token"));
    // };

    useEffect(() => {
        window.Pusher = Pusher;

        window.Echo = new Echo({
            broadcaster: "pusher",
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
            wsHost: import.meta.env.VITE_PUSHER_HOST
                ? import.meta.env.VITE_PUSHER_HOST
                : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
            wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
            wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
            enabledTransports: ["ws", "wss"],
            authEndpoint: `${import.meta.env.VITE_BACKEND_URL}/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        });
    }, [token]);

    return (
        <>
            <RouterProvider router={Router} />
            <ToastContainer />
        </>
    );
}

export default App;
