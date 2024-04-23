import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";
import { List } from "@mui/material";
import JobItem from "./JobItem";

const PublishedJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await JobService.companyJobs();
                if (response.isError) {
                    return toast.error(response.message);
                }
                setJobs(response.data);
            } catch (error) {
                toast.error("Có lỗi xảy ra. Mời thử lại sau");
            }
        };

        getData();
    }, []);

    return (
        <div className="w-full">
            <nav>
                <List>
                    {jobs.map((job, index) => (
                        <JobItem key={index} job={job} />
                    ))}
                </List>
            </nav>
        </div>
    );
};

export default PublishedJobs;
