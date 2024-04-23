import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Pagination } from "@mui/material";
import JobCard from "../Card";

const JobList = ({ jobs }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleSetPage = (e, page) => {
        setCurrentPage(page);
    };

    return (
        <Container maxWidth="xl">
            <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-wrap gap-7">
                    {jobs.map((job, index) => {
                        if (index < currentPage * 9 && index >= (currentPage - 1) * 9) {
                            return <JobCard job={job} key={index} />;
                        }
                    })}
                </div>
                <Pagination
                    color="primary"
                    count={parseInt(jobs.length / 9) + 1}
                    onChange={(e, p) => handleSetPage(e, p)}
                    page={currentPage}
                />
            </div>
        </Container>
    );
};

JobList.propTypes = {
    jobs: PropTypes.array.isRequired,
};

export default JobList;
