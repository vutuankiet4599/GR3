import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import backgroundImg from "../../../assets/img/background.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CompanyCard = ({ company }) => {
    const [tags, setTags] = useState([]);
    useEffect(() => {
        let tagsArray = [];
        if (company.application_jobs) {
            company.application_jobs.forEach((job) => {
                job.tags.forEach((tag) => {
                    tagsArray.push(tag.name);
                });
            });
        }
        tagsArray = Array.from(new Set(tagsArray));
        setTags(tagsArray);
    }, [company.application_jobs]);
    return (
        <Link to={`/companies/${company.id}`}>
            <Card sx={{ maxWidth: 400 }} className="cursor-pointer border hover:shadow-lg">
                <CardMedia
                    image={backgroundImg}
                    sx={{ height: 200 }}
                    className="border-b flex justify-center items-center"
                >
                    <img className="w-40 h-40" src={company.logo} />
                </CardMedia>
                <CardContent sx={{ height: 150 }}>
                    <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        className="font-normal truncate hover:text-blue-500"
                    >
                        {company.name}
                    </Typography>
                    <Typography gutterBottom component="p" className="truncate mb-5">
                        {company.address}
                    </Typography>
                    <div className="flex flex-wrap overflow-hidden gap-2 max-h-10 mb-5">
                        {tags.map((item, index) => (
                            <Chip label={item} key={index} />
                        ))}
                    </div>
                    <div className="flex gap-2 bottom-2 absolute">
                        <SensorsIcon className="text-green-500" />
                        <Typography>{company.application_jobs_count}</Typography>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

CompanyCard.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyCard;
