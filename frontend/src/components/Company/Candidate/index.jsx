import PropTypes from "prop-types";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import PdfRender from "../../PdfRender";
import userImg from "../../../assets/img/user.png";
import { FileUtil } from "../../../utils/FileUtil";
import { useState } from "react";

const Candidate = ({ user }) => {
    const [isShowCv, setIsShowCv] = useState(false);

    return (
        <Accordion className="w-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Ứng viên {user.name}</AccordionSummary>
            <AccordionDetails>
                <div className="w-full h-full flex">
                    <div className="h-full w-fit p-4 border border-r-0">
                        <Avatar src={user.image ? user.image : userImg} sx={{ width: 56, height: 56 }} />
                    </div>
                    <div className="grow flex flex-col gap-3">
                        <div className="flex flex-col gap-1 border-b border-l px-8 py-4">
                            <Typography variant="h5">Thông tin liên lạc</Typography>
                            <Typography>
                                <span className="font-bold">Email: </span>
                                {user.email}
                            </Typography>
                            <Typography>
                                <span className="font-bold">Số điện thoại: </span>
                                {user.phone}
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center justify-start">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setIsShowCv((prev) => !prev)}
                                >
                                    Hiển thị/Đóng CV
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="info"
                                    endIcon={<DownloadIcon />}
                                    onClick={() => FileUtil.Download(user.cv, `${user.name}-CV`)}
                                    disabled={!user.cv}
                                >
                                    Tải CV
                                </Button>
                            </div>
                            {isShowCv && user.cv && <PdfRender cv={user.cv} />}
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

Candidate.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Candidate;
