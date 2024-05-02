import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";
import Applicant from "../../../components/Company/Applicant";

const CompanyJobPage = () => {
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [job, setJob] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getData = async (id) => {
            try {
                let response = await JobService.companyJob(id);
                if (response.isError) {
                    return toast.error(response.message);
                }
                setJob(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        getData(id);
    }, [id]);

    return (
        <Container maxWidth="xl" className="p-4 px-16">
            <TabContext value={value}>
                <TabList onChange={handleChange} className="flex items-center justify-center">
                    <Tab value="1" label="Thông tin chi tiết công việc" />
                    <Tab value="2" label="Thông tin các ứng viên" />
                </TabList>
                <TabPanel value="1">
                    <div className="px-8 py-4 flex flex-col gap-3">
                        <Typography>
                            <b>Tên công việc: </b>
                            {job.name}
                        </Typography>
                        <Typography>
                            <b>Lương: </b>
                            {job.salary}
                        </Typography>
                        <Typography>
                            <b>Hình thức làm việc: </b>
                            {job.type}
                        </Typography>
                        <Typography>
                            <b>Loại hợp đồng: </b>
                            {job.contract}
                        </Typography>
                        <Typography>
                            <b>Trình độ yêu cầu: </b>
                            {job.level}
                        </Typography>
                        <Typography>
                            <b>Kinh nghiệm tối thiểu: </b>
                            {job.experience} năm
                        </Typography>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Đãi ngộ:</b>
                            </Typography>
                            <ul>
                                {job.welfare.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Thông tin phỏng vấn:</b>
                            </Typography>
                            <ul>
                                {job.interview.map((text, index) => (
                                    <li key={index}>
                                        Vòng {index + 1}: {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Yêu cầu công việc:</b>
                            </Typography>
                            <ul>
                                {job.work.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Kỹ năng cần có:</b>
                            </Typography>
                            <ul>
                                {job.skill.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className="flex flex-col items-start justify-center">
                        {job.applications?.map((application, index) => (
                            <Applicant key={index} index={index + 1} application={application} />
                        ))}
                    </div>
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default CompanyJobPage;
