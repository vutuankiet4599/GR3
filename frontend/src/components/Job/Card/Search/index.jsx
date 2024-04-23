import PropTypes from "prop-types";
import { Chip, Divider, Typography } from "@mui/material";
import Level from "../../../../constants/job/level";
import Type from "../../../../constants/job/type";
import { useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/vi.js";
import { Link } from "react-router-dom";

const JobCardV2 = ({ job }) => {
    useEffect(() => {
        moment.locale("vi");
    });
    return (
        <Link to={`/jobs/${job.id}`}>
            <div className="p-4 w-full flex gap-6 item-start justify-between bg-white border shadow-sm hover:bg-blue-100 hover:shadow transition-all ease-linear">
                <img src={job.company.logo} className="h-28 w-40 rounded-xl" />
                <div className="flex flex-col grow gap-1">
                    <Typography className="font-bold text-lg transition-all hover:text-blue-500">{job.name}</Typography>
                    <Typography className="text-gray-600 transition-all hover:text-blue-500">
                        {job.company.name}
                    </Typography>
                    <Typography className="text-blue-500">
                        {job.salary}{" "}
                        <Typography component="span" className="text-gray-400">
                            ( {Level[job.level]} )
                        </Typography>
                    </Typography>
                    <Typography className="text-gray-400">
                        {job.city.nam}{" "}
                        <Typography component="span" className="text-gray-400">
                            ( {Type[job.type]} )
                        </Typography>
                    </Typography>
                    <Divider className="mb-2" />
                    <div className="flex">
                        <div className="flex overflow-hidden gap-2 grow">
                            {job.tags.map((tag, i) => (
                                <Chip label={tag.name} key={i} color="info" className="rounded-none" />
                            ))}
                        </div>
                        <Typography className="w-fit text-gray-400">Đăng {moment(job.created_at).fromNow()}</Typography>
                    </div>
                </div>
            </div>
        </Link>
    );
};

JobCardV2.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobCardV2;
