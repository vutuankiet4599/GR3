// import PropTypes from "prop-types";

import { Button, Chip, CircularProgress, Container, Divider, Grid, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PaymentsIcon from "@mui/icons-material/Payments";
import "./style.css";
import { useEffect, useState } from "react";
import job from "../../../constants/job";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const JobDetailPage = () => {
    const user = useSelector(userSelector);

    const navigate = useNavigate();

    const { Contract, Level, Type } = job;

    const [isApplied, setIsApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [jobData, setJobData] = useState({
        name: "",
        company: {
            name: "",
            address: "",
            logo: "",
        },
        work: [],
        skill: [],
        salary: "",
        description: "",
        welfare: [],
        experience: "",
        level: "",
        contract: "",
        tags: [],
        interview: [],
        type: "",
    });
    const { id } = useParams();

    const handleApplyJob = async () => {
        setIsLoading(true);
        try {
            let response = await JobService.apply(id);
            if (response.isError) {
                return toast.error(response.message);
            }
            setIsApplied(true);
            toast.success(response.message);
        } catch (error) {
            toast.error("Có lỗi xảy ra. Mời thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const getData = async (id) => {
            try {
                let response = await JobService.find(id);
                if (response.isError) {
                    return toast.error(response.message);
                }
                setJobData(response.data);
                response.data.applications.map((application) => {
                    if (application.user_id == user.id && application.status == "pending") {
                        setIsApplied(true);
                    }
                });
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        getData(id);
    }, [id, user]);

    return (
        <Container maxWidth="xl" className="p-4 px-16 bg-gray-100">
            <Grid container className="px-16" spacing={2}>
                <Grid item xs={8} className="flex flex-col gap-3">
                    <div className="w-full bg-white flex items-center justify-center rounded px-4 h-fit">
                        <img src={jobData.company.logo} className="w-32 h-32" />
                        <div className="flex flex-col gap-1 grow px-5 py-4">
                            <Typography className="text-wrap text-2xl font-bold text-black" component="p">
                                {jobData.name}
                            </Typography>
                            <Typography
                                className="text-wrap my-1 line-clamp-1 text-base font-bold text-gray-500"
                                component="p"
                            >
                                {jobData.company.name}
                            </Typography>
                            <Typography className="text-wrap">
                                <PlaceIcon color="disabled" />
                                &nbsp;{jobData.company.address}
                            </Typography>
                            <Typography>
                                <PaymentsIcon color="disabled" />
                                &nbsp;
                                <Typography color="blue" component="span" className="underline">
                                    {user.email ? jobData.salary : "Đăng nhập để xem mức lương"}
                                </Typography>
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 bg-white p-4 px-8 rounded">
                        <Typography className="text-wrap">{jobData.description}</Typography>
                        <Divider />
                        <Typography className="font-bold">Trách nhiệm công việc</Typography>
                        <ul className="custom-ul">
                            {jobData.work.map((value, index) => (
                                <li key={index}>
                                    <Typography>{value}</Typography>
                                </li>
                            ))}
                        </ul>
                        <Divider />
                        <Typography className="font-bold">Kỹ năng & Chuyên môn</Typography>
                        <ul className="custom-ul">
                            {jobData.skill.map((value, index) => (
                                <li key={index}>
                                    <Typography>{value}</Typography>
                                </li>
                            ))}
                        </ul>
                        <Divider />
                        <Typography className="font-bold">Phúc lợi cho bạnc</Typography>
                        <ul className="custom-ul">
                            {jobData.welfare.map((value, index) => (
                                <li key={index}>
                                    <Typography>{value}</Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={4} className="flex flex-col gap-3">
                    {!user.email ? (
                        <Button variant="contained" size="large" onClick={() => navigate("/login")}>
                            Ứng tuyển ngay
                        </Button>
                    ) : !isApplied ? (
                        <Button variant="contained" size="large" onClick={handleApplyJob}>
                            {isLoading ? <CircularProgress className="text-white" /> : "Ứng tuyển ngay"}
                        </Button>
                    ) : (
                        <Button variant="contained" size="large">
                            <CheckCircleOutlineIcon />
                        </Button>
                    )}
                    <div className="flex flex-col gap-2 rounded bg-white">
                        <Typography className="px-4 pt-2 pb-0 text-lg font-bold text-gray-500">
                            Thông tin chung
                        </Typography>
                        <Divider />
                        <Typography className="px-4 font-bold -mb-2">Năm kinh nghiệm tối thiểu</Typography>
                        <Typography className="px-4">Tối thiểu {jobData.experience} năm</Typography>
                        <Divider />
                        <Typography className="px-4 font-bold -mb-2">Cấp bậc</Typography>
                        <Typography className="px-4">{Level[jobData.level]}</Typography>
                        <Divider />
                        <Typography className="px-4 font-bold -mb-2">Loại hình</Typography>
                        <Typography className="px-4">{Type[jobData.type]}</Typography>
                        <Divider />
                        <Typography className="px-4 font-bold -mb-2">Loại hợp đồng</Typography>
                        <Typography className="px-4">{Contract[jobData.contract]}</Typography>
                        <Divider />
                        <Typography className="px-4 font-bold -mb-2">Công nghệ sử dụng</Typography>
                        <div className="flex flex-wrap gap-1 px-4">
                            {jobData.tags.map((tag, i) => (
                                <Chip label={tag.name} key={i} color="info" />
                            ))}
                        </div>
                        <Divider />
                        <Typography className="px-4 font-bold -mb-2">Quy trình phỏng vấn</Typography>
                        <ul className="custom-ul">
                            {jobData.interview.map((value, index) => (
                                <li key={index}>
                                    Vòng {index + 1}: {value}
                                </li>
                            ))}
                        </ul>
                        <Divider />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

JobDetailPage.propTypes = {};

export default JobDetailPage;
