import { Box, Button, CircularProgress, Container, FormControl, Grid, Tab, TextField, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import DevAuthService from "../../../services/Auth/Dev/DevAuthService";
import CompanyAuthService from "../../../services/Auth/Company/CompanyAuthService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { companySlice, tokenSlice, userSlice } from "../../../redux/slices";

const LoginPage = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleOnChangeForm = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLoginDev = async () => {
        setIsLoading(true);
        let response = await DevAuthService.login(userData);
        setIsLoading(false);
        if (response.isError) {
            return toast.error(response.message);
        }
        setIsLoading(false);
        dispatch(userSlice.actions.updateUserInfo(response.data.user));
        dispatch(tokenSlice.actions.updateToken(response.data.token));
        setUserData({
            email: "",
            password: "",
        });
        navigate("/");
        toast.success(response.message);
    };

    const handleLoginCompany = async () => {
        setIsLoading(true);
        let response = await CompanyAuthService.login(userData);
        setIsLoading(false);
        if (response.isError) {
            return toast.error(response.message);
        }
        dispatch(companySlice.actions.updateCompany(response.data.company));
        dispatch(tokenSlice.actions.updateToken(response.data.token));
        setUserData({
            email: "",
            password: "",
        });
        navigate("/company");
        toast.success(response.message);
    };

    return (
        <Container maxWidth="xl" className="grow">
            <Grid container>
                <Grid item xs={6} className="flex flex-col items-center justify-center">
                    <TabContext value={value}>
                        <Box
                            sx={{ borderBottom: 1, borderColor: "divider" }}
                            className="w-full flex items-center justify-center"
                        >
                            <TabList onChange={handleChange} aria-label="dev register tab">
                                <Tab label="Developer" value="1" />
                                <Tab label="Nhà tuyển dụng" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" className={`w-full`}>
                            <Typography variant="h5" component="p" gutterBottom className="text-center">
                                Chào mừng đến với DevJob
                            </Typography>
                            <FormControl className="w-full">
                                <TextField
                                    required
                                    type="text"
                                    label="Địa chỉ email"
                                    name="email"
                                    className="mb-3"
                                    value={userData.email}
                                    onChange={handleOnChangeForm}
                                />
                                <TextField
                                    required
                                    type="password"
                                    name="password"
                                    label="Mật khẩu"
                                    className="mb-3"
                                    value={userData.password}
                                    onChange={handleOnChangeForm}
                                />
                                <Button variant="contained" onClick={handleLoginDev}>
                                    {isLoading ? <CircularProgress className="text-white" /> : "Đăng nhập"}
                                </Button>
                            </FormControl>
                        </TabPanel>
                        <TabPanel value="2" className="w-full">
                            <Typography variant="h5" component="p" gutterBottom className="text-center">
                                Chào mừng đến với DevJob
                            </Typography>
                            <FormControl className="w-full">
                                <TextField
                                    required
                                    name="email"
                                    type="text"
                                    label="Email công ty"
                                    className="mb-3"
                                    value={userData.email}
                                    onChange={handleOnChangeForm}
                                />
                                <TextField
                                    required
                                    type="password"
                                    name="password"
                                    label="Mật khẩu"
                                    className="mb-3"
                                    value={userData.password}
                                    onChange={handleOnChangeForm}
                                />
                                <Button variant="contained" onClick={handleLoginCompany}>
                                    {isLoading ? <CircularProgress className="text-white" /> : "Đăng nhập"}
                                </Button>
                            </FormControl>
                        </TabPanel>
                    </TabContext>
                </Grid>
                <Grid item xs={6}>
                    <div className="flex flex-col gap-5 px-10 py-16">
                        <Typography variant="h5" className="font-bold">
                            Trở thành thành viên của DevJob để nhận những để được hưởng trọn vẹn dịch vụ
                        </Typography>
                        <ul>
                            <li>
                                <Typography className="mb-3">
                                    <DoneIcon className="text-green-500" />
                                    &nbsp;Xem chi tiết thông tin lương của job
                                </Typography>
                            </li>
                            <li>
                                <Typography className="mb-3">
                                    <DoneIcon className="text-green-500" />
                                    &nbsp;Dễ dàng ứng tuyển chỉ với một click
                                </Typography>
                            </li>
                            <li>
                                <Typography className="mb-3">
                                    <DoneIcon className="text-green-500" />
                                    &nbsp;Quản lý thông tin cá nhân
                                </Typography>
                            </li>
                        </ul>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;
