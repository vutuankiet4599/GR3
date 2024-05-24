import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Size from "../../../constants/job/size";
import CompanyService from "../../../services/Company/CompanyService";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FolderIcon from "@mui/icons-material/Folder";
import ShareIcon from "@mui/icons-material/Share";

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
                <Grid item xs={4} className="flex flex-col gap-3"></Grid>
            </Grid>
            <Grid container className="px-16" spacing={2}>
                <Grid item xs={8} className="flex flex-col gap-3"></Grid>
            </Grid>
        </Container>
    );
};

export default CompanyDetailPage;
