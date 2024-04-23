import { useEffect } from "react";

export const Test = () => {
    useEffect(() => {
        let testChannel, testEventListener;
        if (window.Echo) {
            testChannel = window.Echo.channel("test");
            testEventListener = (e) => {
                console.log(e);
            };

            testChannel.listen("TestEvent", testEventListener);
        }

        // Cleanup function
        return () => {
            // Unsubscribe or detach the event listener when the component is unmounted
            if (testChannel && window.Echo) {
                testChannel.stopListening("TestEvent", testEventListener);
                window.Echo.leaveChannel("test");
            }
        };
    }, []);
    return <div className="text-amber-700">Test</div>;
};
