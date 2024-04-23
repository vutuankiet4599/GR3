import PropTypes from "prop-types";
import moment from "moment";
import "moment/dist/locale/vi.js";
import { Link } from "react-router-dom";
import { Chip, Divider, Typography } from "@mui/material";
import { useEffect } from "react";

const BestFitJobCard = ({ job }) => {
    useEffect(() => {
        moment.locale("vi");
    }, []);

    return (
        <Link to={`/jobs/${job.id}`}>
            <div className="p-4 w-full flex gap-6 item-start justify-between bg-white border shadow-sm hover:bg-blue-100 hover:shadow transition-all ease-linear">
                <img src={job.company.logo} className="rounded h-[66px] w-[88px]" />
                <div className="flex flex-col grow gap-1 w-fit">
                    <Typography className="font-bold text-lg transition-all hover:text-blue-500 max-w-80 truncate">
                        {job.name}
                    </Typography>
                    <Typography className="text-gray-600 transition-all hover:text-blue-500 max-w-80 truncate">
                        {job.company.name}
                    </Typography>
                    <Divider className="mb-1" />
                    <div className="flex flex-col">
                        {job.tags && (
                            <div className="flex truncate gap-2 max-w-72">
                                {job.tags.map((tag, i) => (
                                    <Chip label={tag.name} key={i} color="info" className="rounded-none" />
                                ))}
                            </div>
                        )}
                    </div>
                    <Typography className="text-gray-400">Đăng {moment(job.created_at).fromNow()}</Typography>
                </div>
            </div>
        </Link>
    );
};

BestFitJobCard.propTypes = {
    job: PropTypes.object.isRequired,
};

export default BestFitJobCard;
