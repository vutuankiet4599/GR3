import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
    Box,
    CircularProgress,
    Container,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Pagination,
    Tab,
    Typography,
    FormControl,
    MenuItem,
    Button,
    TextField,
    Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PdfRender from "../../../components/PdfRender";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DevProfileService from "../../../services/Profile/Dev/DevProfileService";
import userSlice from "../../../redux/slices/userSlice";
import TagService from "../../../services/Tag/TagService";
import CheckIcon from "@mui/icons-material/Check";

const ProfilePage = () => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [cv, setCv] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const handleSetPage = (e, page) => {
        setCurrentPage(page);
    };

    const [applications, setApplications] = useState([]);

    const [tags, setTags] = useState([]);
    const [userTags, setUserTags] = useState([]);

    useEffect(() => {
        const getUserApplications = async () => {
            try {
                let response = await DevProfileService.getCurrentUserApplications();
                if (response.isError) {
                    return toast.error(response.message);
                }
                setApplications(response.data);
            } catch (error) {
                return toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        const getTags = async () => {
            try {
                let response = await TagService.getAll();
                if (response.isError) {
                    return toast.error(response.message);
                }
                setTags(response.data.tags);
                setUserTags(response.data.user_tags);
            } catch (error) {
                return toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        if (value == "2") {
            getUserApplications();
        }

        if (value == "3") {
            getTags();
        }
    }, [value]);

    useEffect(() => {
        const handleUploadCv = async () => {
            setIsLoading(true);
            try {
                let response = await DevProfileService.uploadCv(cv);
                if (response.isError) {
                    return toast.error(response.message);
                }
                dispatch(userSlice.actions.updateUserInfo(response.data));
                toast.success("Tải cv lên thành công");
            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra. Mời thử lại sau!");
            } finally {
                setIsLoading(false);
            }
        };

        if (cv) {
            handleUploadCv();
        }
    }, [cv, dispatch]);

    const handleUpdateUserTags = async () => {
        try {
            let response = await DevProfileService.updateTags(userTags);
            if (response.isError) {
                return toast.error(response.message);
            }
            toast.success(response.message);
        } catch (error) {
            toast.error("Có lỗi xảy ra. Mời thử lại sau!");
        }
    };

    const handleOnChangeTags = (e, value) => {
        setUserTags(value);
    };

    return (
        <Container maxWidth="xl" className="p-4 px-16">
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="user tab" className="flex items-center justify-center">
                    <Tab value="1" label="Thông tin CV" />
                    <Tab value="2" label="Những job đã apply" />
                    <Tab value="3" label="Thông tin thẻ" />
                </TabList>
                <TabPanel value="1">
                    <Box className="flex flex-col gap-5">
                        <div className="flex gap-1">
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={(e) => {
                                        setCv(e.target.files[0]);
                                    }}
                                />

                                <Fab
                                    color="primary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                    type="submit"
                                >
                                    <AddIcon /> Tải CV lên ngay
                                </Fab>
                            </label>
                            {isLoading && <CircularProgress />}
                        </div>
                        <Typography variant="caption" className="italic">
                            Cv định dạng pdf. Kích cỡ dưới 5MB
                        </Typography>
                        <div>
                            {!user.cv && <Typography>Bạn chưa có cv nào! Mời tải lên tại đây</Typography>}
                            {user.cv && <PdfRender cv={user.cv} />}
                        </div>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {applications.map((application, index) => {
                            if (index < currentPage * 9 && index >= (currentPage - 1) * 9) {
                                return (
                                    <ListItem alignItems="flex-start" key={index}>
                                        <ListItemAvatar>
                                            <Box
                                                component="img"
                                                src={application.application_job.company.logo}
                                                className="w-10 h-10"
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={application.application_job.name}
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{ display: "inline" }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {application.application_job.company.name}
                                                    </Typography>
                                                    {` — ${application.application_job.company.address}`}
                                                </>
                                            }
                                        />
                                        <Link to={`/jobs/${application.application_job_id}`}>
                                            <ListItemIcon>
                                                <OpenInNewIcon />
                                            </ListItemIcon>
                                        </Link>
                                        <ListItemIcon
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log(e);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <DeleteIcon color="error" />
                                        </ListItemIcon>
                                    </ListItem>
                                );
                            }
                        })}
                    </List>
                    <div className="flex justify-end items-end">
                        <Pagination
                            color="primary"
                            count={parseInt(applications.length / 9) + 1}
                            onChange={(e, p) => handleSetPage(e, p)}
                            page={currentPage}
                        />
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className="flex flex-col gap-3">
                        <Typography variant="caption" className="italic">
                            Thông tin này có thể giúp lọc những công việc phù hợp với bạn. Vui lòng lựa chọn cẩn thận!
                        </Typography>
                        <FormControl className="-ml-2">
                            <Autocomplete
                                sx={{ m: 1, width: 500 }}
                                multiple
                                id="tags-standard"
                                options={tags}
                                getOptionLabel={(option) => option.name}
                                value={userTags}
                                disableCloseOnSelect
                                onChange={handleOnChangeTags}
                                renderOption={(props, option, { selected }) => (
                                    <MenuItem
                                        key={option.id}
                                        value={option}
                                        sx={{ justifyContent: "space-between" }}
                                        {...props}
                                    >
                                        {option.name}
                                        {selected ? <CheckIcon color="success" /> : null}
                                    </MenuItem>
                                )}
                                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Thông tin thẻ của người dùng" />
                                )}
                            />
                        </FormControl>
                        <Button variant={"contained"} onClick={handleUpdateUserTags} className="w-[30%]">
                            Cập nhật thông tin thẻ
                        </Button>
                    </div>
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default ProfilePage;
