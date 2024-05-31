import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Size from "../../../constants/job/size";
import CompanyService from "../../../services/Company/CompanyService";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FolderIcon from "@mui/icons-material/Folder";
import ShareIcon from "@mui/icons-material/Share";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";

const CompanyDetailPage = () => {
    const [company, setCompany] = useState({
        name: "",
        email: "",
        address: "",
        description: "",
        logo: "",
        size: "",
        nationality: "",
        business: "",
        website: "",
        treatment: [],
        quizzes: [],
        application_jobs_count: 0,
    });

    let user = useSelector(userSelector);

    const { id } = useParams();
    useEffect(() => {
        const fetchCompanyData = async (id) => {
            try {
                let response = await CompanyService.getCompany(id);
                if (response.isError) {
                    return toast.error(response.message);
                }
                console.log(response);
                setCompany(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        fetchCompanyData(id);
    }, [id]);
    return (
        <Container maxWidth="xl" className="py-4 px-16 bg-gray-100">
            <Grid container className="px-16" spacing={2}>
                <Grid item xs={8} className="flex flex-col gap-3">
                    <div className="w-full bg-white flex items-center justify-center rounded px-4 h-fit">
                        <img src={company.logo} className="w-32 h-32" />
                        <div className="flex flex-col gap-1 grow px-5 py-4">
                            <Typography className="text-wrap text-2xl font-bold text-black" component="p">
                                {company.name}
                            </Typography>

                            <Typography
                                className="text-wrap my-1 line-clamp-1 text-base font-bold text-gray-500"
                                component="p"
                            >
                                <FolderIcon />
                                <span className="underline">{company.application_jobs_count} vị trí tuyển dụng</span>
                            </Typography>
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="grow"
                                    startIcon={<BookmarkBorderIcon />}
                                >
                                    Theo dõi
                                </Button>
                                <Button color="primary" variant="outlined">
                                    <ShareIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 bg-white p-4 px-8 rounded">
                        {company.description && (
                            <>
                                <Typography className="font-bold">Về chúng tôi</Typography>
                                <Typography className="text-wrap">{company.description}</Typography>
                            </>
                        )}
                        <Divider />
                        <Typography className="font-bold">Chế độ đãi ngộ</Typography>
                        <ul className="custom-ul">
                            {company.treatment.map((value, index) => (
                                <li key={index}>
                                    <Typography>{value}</Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={4} className="flex flex-col gap-3">
                    <div className="flex items-center justify-start px-4 py-3 bg-white -mb-2">
                        <Typography className="font-bold text-lg">Thông tin chung</Typography>
                    </div>
                    <div className="flex flex-col gap-2 rounded bg-white py-3 px-4">
                        <Typography className="px-4 font-bold -mb-2">Lĩnh vực</Typography>
                        <Typography className="px-4">{company.business}</Typography>

                        <Typography className="px-4 font-bold -mb-2">Quy mô công ty</Typography>
                        <Typography className="px-4">{Size[company.size]}</Typography>

                        <Typography className="px-4 font-bold -mb-2">Quốc tịch công ty</Typography>
                        <Typography className="px-4">{company.nationality}</Typography>
                    </div>

                    <div className="flex items-center justify-start px-4 py-3 bg-white -mb-2">
                        <Typography className="font-bold text-lg">Thông tin liên hệ</Typography>
                    </div>
                    <div className="flex flex-col gap-2 rounded bg-white py-3 px-4">
                        <Typography className="px-4 font-bold -mb-2">Website</Typography>
                        <a href={company.website} target="_blank" rel="noreferrer">
                            <Typography className="px-4">{company.website}</Typography>
                        </a>

                        <Typography className="px-4 font-bold -mb-2">Địa chỉ</Typography>
                        <Typography className="px-4">
                            <PlaceOutlinedIcon /> {company.address}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            {user && (
                <Grid container className="px-20 pr-[4.5rem]" spacing={2}>
                    <Grid item xs={8} className="flex flex-col gap-3 bg-white px-4 py-3">
                        <Typography className="font-bold flex items-center justify-start py-2">
                            Các bài quiz của công ty
                        </Typography>
                        {company.quizzes.map((quiz, index) => (
                            <Link key={index} to={`/quizzes/${quiz.id}`}>
                                <Typography className="border px-3 py-2 text-wrap hover:shadow-md">
                                    Bài quiz số {index + 1}: {quiz.title}
                                </Typography>
                            </Link>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default CompanyDetailPage;
