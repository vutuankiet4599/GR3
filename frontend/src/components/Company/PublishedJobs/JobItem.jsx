import { Link } from "react-router-dom";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PropTypes from "prop-types";

const JobItem = ({ job }) => {
    return (
        <ListItem
            secondaryAction={
                <Link to={`/company/jobs/${job.id}`}>
                    <IconButton>
                        <OpenInNewIcon color="primary" />
                    </IconButton>
                </Link>
            }
            className="border px-8 py-2 hover:bg-slate-50 cursor-pointer"
        >
            <ListItemText primary={job.name} />
        </ListItem>
    );
};

JobItem.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobItem;
