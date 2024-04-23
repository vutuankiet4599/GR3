import { Container, Divider, Typography } from "@mui/material";
import CompanySwiper from "../../../components/Company/Swiper";
import Search from "../../../components/Search";
import JobList from "../../../components/Job/List";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";
import CompanyService from "../../../services/Auth/Company/CompanyService";

const HomePage = () => {
    const [hotJobs, setHotJobs] = useState([]);
    const [outstandingCompanies, setOutstandingCompanies] = useState([]);

    useEffect(() => {
        const getHomePageData = async () => {
            try {
                let [resJobs, resCompanies] = await Promise.all([JobService.hotJob, CompanyService.outstanding]);
                let jobs = await resJobs();
                let companies = await resCompanies();

                if (jobs.isError) {
                    toast.error(jobs.message);
                } else {
                    setHotJobs(jobs.data);
                }

                if (companies.isError) {
                    toast.error(companies.message);
                } else {
                    setOutstandingCompanies(companies.data);
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        getHomePageData();
    }, []);

    return (
        <div className="grow flex flex-col">
            <Search />
            <Container maxWidth="xl" className="flex flex-col py-16 px-8 -mb-10">
                <Typography variant="h4" component="p" className="flex -mb-5">
                    ☀️ Top Công Ty&nbsp;<span className="text-blue-600">Nổi Bật</span>
                </Typography>
                <CompanySwiper companies={outstandingCompanies} />
            </Container>
            <Divider className="border-b-2" />
            <Container maxWidth="xl" className="p-8 py-16">
                <div className="flex flex-col gap-10">
                    <Typography variant="h4" component="p" className="flex">
                        🔥<span className="text-blue-600">Công Việc Hot</span>&nbsp;Hôm Nay
                    </Typography>
                    <JobList jobs={hotJobs} variant="outlined" color="primary" />
                </div>
            </Container>
        </div>
    );
};

export default HomePage;
