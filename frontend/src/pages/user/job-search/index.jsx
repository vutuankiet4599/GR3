import { Container, Grid, Pagination, Typography } from "@mui/material";
import SearchV2 from "../../../components/Search/V2";
import JobCardV2 from "../../../components/Job/Card/Search";
import BestFitJobCard from "../../../components/Job/Card/Search/BestFit";
import { useEffect, useState } from "react";
import JobService from "../../../services/Job/JobService";
import useCustomSearchParams from "../../../hooks/RouteParamHook";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const JobSearchPage = () => {
    const [jobs, setJobs] = useState([]);
    const [bestFitJobs, setBestFitJobs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    let [searchParam, setSearchParam] = useCustomSearchParams();
    let [arraySearchParam] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(searchParam.page ? parseInt(searchParam.page) : 1);
    const handleSetPage = (e, page) => {
        setCurrentPage(page);
        setSearchParam({
            ...searchParam,
            page: page,
        });
    };

    useEffect(() => {
        const getJobsData = async () => {
            let query = searchParam.query;
            let contract = searchParam.contract;
            let level = searchParam.level;
            let type = searchParam.type;
            let city = searchParam.city;
            let page = searchParam.page;
            let tags = arraySearchParam.getAll("tags");
            let response = await JobService.search(query, contract, level, type, city, page, tags);
            if (response.isError) {
                return;
            }
            setJobs(response.data.jobs);
            setTotalPages(response.data.totalPages);
        };

        getJobsData();
    }, [
        searchParam.query,
        searchParam.contract,
        searchParam.level,
        searchParam.type,
        searchParam.city,
        searchParam.page,
        searchParam.tags,
        arraySearchParam,
    ]);

    useEffect(() => {
        const getBestJobsData = async () => {
            try {
                let response = await JobService.bestFit();
                if (response.isError) {
                    return toast.error(response.message);
                }
                setBestFitJobs(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Mời thử lại sau!");
            }
        };

        getBestJobsData();
    }, []);

    return (
        <Container maxWidth="xl" className="flex flex-col bg-gray-100 p-0">
            <SearchV2 />
            <Grid container className="p-4 px-16" spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h4" component="p">
                        Kết quả tìm kiếm
                    </Typography>
                    <div className="flex flex-col rounded gap-3 mt-5">
                        {jobs.map((job, index) => (
                            <JobCardV2 key={index} job={job} />
                        ))}
                    </div>
                    <div className="flex items-center justify-end my-5">
                        <Pagination
                            color="primary"
                            count={totalPages}
                            onChange={(e, p) => handleSetPage(e, p)}
                            page={currentPage}
                            className="p-4 pr-0"
                            shape="rounded"
                            variant="outlined"
                        />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="flex flex-col rounded bg-white border-blue-500 border">
                        <div className="m-0 p-0 bg-blue-50">
                            <Typography className="p-4 text-lg font-bold text-black">
                                Công việc thích hợp bạn nhất
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-0">
                            {bestFitJobs.map((job, index) => (
                                <BestFitJobCard key={index} job={job} />
                            ))}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default JobSearchPage;
