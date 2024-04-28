import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import userImg from "../../../assets/img/user.png";
import PropTypes from "prop-types";
import PdfRender from "../../PdfRender";
import { useEffect, useState } from "react";
import { FileUtil } from "../../../utils/FileUtil";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";

const Applicant = ({ index = 0, application }) => {
    const [isShowCv, setIsShowCv] = useState(false);
    const [isPending, setIsPending] = useState(true);
    useEffect(() => {
        if (application.status != "pending") {
            setIsPending(false);
        }
    }, [application]);

    const handleChangeStatusApplication = async (id, status) => {
        try {
            let response = await JobService.updateApplicationStatus(id, status);
            if (response.isError) {
                return toast.error(response.message);
            }
            setIsPending(false);
            return toast.success("Xử lý thành công!");
        } catch (error) {
            return toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    return (
        <Accordion className="w-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Ứng viên số {index}</AccordionSummary>
            <AccordionDetails>
                <div className="w-full h-full flex">
                    <div className="h-full w-fit p-4 border border-r-0">
                        <Avatar
                            src={application.user?.image ? application.user?.image : userImg}
                            sx={{ width: 56, height: 56 }}
                        />
                    </div>
                    <div className="grow flex flex-col gap-3">
                        <div className="flex flex-col gap-1 border-b border-l px-8 py-4">
                            <Typography variant="h5">Thông tin liên lạc</Typography>
                            <Typography>
                                <span className="font-bold">Email: </span>
                                {application.user?.email}
                            </Typography>
                            <Typography>
                                <span className="font-bold">Số điện thoại: </span>
                                {application.user?.phone}
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
                                    onClick={() =>
                                        FileUtil.Download(application.user?.cv, `${application.user?.name}-CV`)
                                    }
                                    disabled={!application.user.cv}
                                >
                                    Tải CV
                                </Button>
                            </div>
                            {isShowCv && application.user.cv && <PdfRender cv={application.user.cv} />}
                        </div>
                    </div>
                </div>
            </AccordionDetails>
            <AccordionActions>
                <Button
                    variant="contained"
                    color="success"
                    disabled={!isPending}
                    onClick={() => handleChangeStatusApplication(application.id, "accepted")}
                >
                    Chấp nhận
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    disabled={!isPending}
                    onClick={() => handleChangeStatusApplication(application.id, "rejected")}
                >
                    Từ chối
                </Button>
            </AccordionActions>
        </Accordion>
    );
};

Applicant.propTypes = {
    index: PropTypes.number,
    application: PropTypes.object.isRequired,
};

export default Applicant;
