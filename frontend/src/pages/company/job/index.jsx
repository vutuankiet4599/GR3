import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Container, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";
import job from "../../../constants/job";
import Applicant from "../../../components/Company/Applicant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CompanyJobPage = () => {
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [jobData, setJobData] = useState({});
    const { id } = useParams();
    const { Contract, Level, Type } = job;

    useEffect(() => {
        const getData = async (id) => {
            try {
                let response = await JobService.companyJob(id);
                if (response.isError) {
                    return toast.error(response.message);
                }
                setJobData(response.data);
                toast.success(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        getData(id);
    }, [id]);

    const handleUpdateStatus = async (status) => {
        try {
            let response = await JobService.updateJobStatus(id, status);
            if (response.isError) {
                return toast.error(response.message);
            }
            setJobData({ ...jobData, status: status });
            toast.success("Cập nhật trạng thái thành công");
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
    };

    return (
        <Container maxWidth="xl" className="p-4 px-16">
            <Link to="/company/dashboard">
                <Button startIcon={<ArrowBackIcon />}>Trở về bảng điều khiển</Button>
            </Link>
            <TabContext value={value}>
                <TabList onChange={handleChange} className="flex items-center justify-center">
                    <Tab value="1" label="Thông tin chi tiết công việc" />
                    <Tab value="2" label="Thông tin các ứng viên" />
                </TabList>
                <TabPanel value="1">
                    <div className="px-8 py-4 flex flex-col gap-3">
                        <Typography>
                            <b>Tên công việc: </b>
                            {jobData.name}
                        </Typography>
                        <Typography>
                            <b>Lương: </b>
                            {jobData.salary}
                        </Typography>
                        <Typography>
                            <b>Hình thức làm việc: </b>
                            {Type[jobData.type]}
                        </Typography>
                        <Typography>
                            <b>Loại hợp đồng: </b>
                            {Contract[jobData.contract]}
                        </Typography>
                        <Typography>
                            <b>Trình độ yêu cầu: </b>
                            {Level[jobData.level]}
                        </Typography>
                        <Typography>
                            <b>Kinh nghiệm tối thiểu: </b>
                            {jobData.experience} năm
                        </Typography>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Đãi ngộ:</b>
                            </Typography>
                            <ul>
                                {jobData.welfare?.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Thông tin phỏng vấn:</b>
                            </Typography>
                            <ul>
                                {jobData.interview?.map((text, index) => (
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
                                {jobData.work?.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Typography>
                                <b>Kỹ năng cần có:</b>
                            </Typography>
                            <ul>
                                {jobData.skill?.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-2 justify-start items-center">
                            <Button
                                color="error"
                                disabled={jobData.status == "closed"}
                                onClick={() => handleUpdateStatus("closed")}
                            >
                                Đóng công việc
                            </Button>
                            <Button
                                color="success"
                                disabled={jobData.status == "opening"}
                                onClick={() => handleUpdateStatus("opening")}
                            >
                                Mở lại công việc
                            </Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className="flex flex-col items-start justify-center">
                        {jobData.applications?.map((application, index) => (
                            <Applicant key={index} index={index + 1} application={application} />
                        ))}
                    </div>
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default CompanyJobPage;
