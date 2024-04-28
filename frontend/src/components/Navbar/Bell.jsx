import { Badge, Button, Popover, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors";

const Bell = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const user = useSelector(userSelector);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let devChannel, devListener;
        if (user.id && window.Echo) {
            devChannel = window.Echo.channel(`dev-${user.id}`);
            devListener = (e) => {
                setNotifications((notifications) => [...notifications, e.data]);
            };

            devChannel.listen("DevReceiveNotificationFromCompanyEvent", devListener);
        }

        // Cleanup function
        return () => {
            // Unsubscribe or detach the event listener when the component is unmounted
            if (devChannel && window.Echo) {
                devChannel.stopListening("DevReceiveNotificationFromCompanyEvent", devListener);
                window.Echo.leaveChannel(`dev-${user.id}`);
            }
        };
    }, [user]);

    return (
        <>
            <Button className="w-fit h-fit outline-none border-none" aria-describedby={id} onClick={handleClick}>
                {notifications.length > 0 ? (
                    <Badge badgeContent={notifications.length} color="error" className="mr-3">
                        <NotificationsNoneIcon color="primary" />
                    </Badge>
                ) : (
                    <NotificationsNoneIcon color="primary" />
                )}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {notifications.map((notification, index) => (
                    <Typography sx={{ p: 2 }} key={index}>
                        Công ty <b>{notification.company}</b> đã{" "}
                        <b>{notification.isAccepted ? "chấp nhận" : "từ chối"}</b> ứng tuyển của bạn
                    </Typography>
                ))}
            </Popover>
        </>
    );
};

export default Bell;
