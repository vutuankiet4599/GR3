import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LiveCodeService from "../../../services/Code/LiveCodeService";

const LiveCodeRoomCreator = () => {
    const [link, setLink] = useState("");
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const getCompanyRooms = async () => {
            try {
                let response = await LiveCodeService.getCompanyRooms();
                if (response.isError) {
                    return toast(response.message);
                }
                setRooms(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        getCompanyRooms();
    }, []);

    const handleCreateRoom = async () => {
        try {
            let response = await LiveCodeService.createRoom();
            if (response.isError) {
                return toast.error(response.message);
            }
            setLink(`${import.meta.env.VITE_APP_URL}/code/${response.data.code}`);
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };
    return (
        <div className="flex flex-col items-start justify-start px-8 py-4">
            <Button variant="contained" color="primary" onClick={handleCreateRoom}>
                Tạo phòng ngay
            </Button>
            {link && <Typography>Đường dẫn đã tạo: {link}</Typography>}
            <List>
                {rooms.map((room, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${import.meta.env.VITE_APP_URL}/code/${room.code}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default LiveCodeRoomCreator;
