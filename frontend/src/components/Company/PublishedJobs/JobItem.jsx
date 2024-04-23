import { Link } from "react-router-dom";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PropTypes from "prop-types";

const JobItem = ({ job }) => {
    return (
        <ListItem
            disableGutters
            secondaryAction={
                <Link to={`/company/jobs/${job.id}`}>
                    <IconButton>
                        <OpenInNewIcon color="primary" />
                    </IconButton>
                </Link>
            }
        >
            <ListItemText primary={job.name} />
        </ListItem>
    );
};

JobItem.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobItem;
