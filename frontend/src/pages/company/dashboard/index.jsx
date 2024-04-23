import { useState } from "react";
import { Container, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NewJob from "../../../components/Company/NewJob";
import PublishedJobs from "../../../components/Company/PublishedJobs";
import LiveCodeRoomCreator from "../../../components/Company/LiveCodeRoomCreator";

const DashboardPage = () => {
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl" className="p-4 px-16">
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="user tab" className="flex items-center justify-center">
                    <Tab value="1" label="Thông các job đã đăng" />
                    <Tab value="2" label="Đăng job mới" />
                    <Tab value="3" label="Tạo phòng live code" />
                </TabList>
                <TabPanel value="1">
                    <PublishedJobs />
                </TabPanel>
                <TabPanel value="2">
                    <NewJob />
                </TabPanel>
                <TabPanel value="3">
                    <LiveCodeRoomCreator />
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default DashboardPage;
