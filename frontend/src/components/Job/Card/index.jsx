import { Box, Chip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    return (
        <Link to={`/jobs/${job.id}`}>
            <div className="w-[450px] h-32 bg-white flex gap-5 border shadow hover:shadow-md truncate p-4">
                <Box component="img" src={job.company.logo} className="h-full w-20" />
                <div className="grow flex justify-center flex-col gap-1">
                    <Typography className="font-bold text-base truncate max-w-[310px]">{job.name}</Typography>
                    <Typography className="truncate max-w-[310px]" gutterBottom>
                        {job.company.address}
                    </Typography>
                    <div className="flex gap-2 truncate max-w-[310px]">
                        {job.tags.map((tag, index) => (
                            <Chip label={tag.name} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

JobCard.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobCard;
