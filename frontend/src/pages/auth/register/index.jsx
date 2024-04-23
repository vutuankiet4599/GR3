import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    TextField,
    Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import job from "../../../constants/job";
import DevAuthService from "../../../services/Auth/Dev/DevAuthService";
import { toast } from "react-toastify";
import CompanyAuthService from "../../../services/Auth/Company/CompanyAuthService";

const RegisterPage = () => {
    const [value, setValue] = useState("1");

    const [dev, setDev] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        phone: "",
        image: null,
    });
    const [company, setCompany] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        address: "",
        description: "",
        size: "",
        nationality: "",
        business: "",
        website: "",
        logo: null,
    });

    const handleOnChangeTextForm = (e, type) => {
        if (type === 1) {
            setDev({
                ...dev,
                [e.target.name]: e.target.value,
            });
        } else {
            setCompany({
                ...company,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleOnChangeFileForm = (e, type) => {
        if (type === 1) {
            setDev({
                ...dev,
                image: e.target.files[0],
            });
        } else {
            setCompany({
                ...company,
                logo: e.target.files[0],
            });
        }
    };
    const Size = job.Size;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRegisterDev = async () => {
        let response = await DevAuthService.register(dev);
        if (response.isError) {
            return toast.error(response.message);
        }
        setDev({
            email: "",
            password: "",
            passwordConfirmation: "",
            name: "",
            phone: "",
            image: null,
        });
        toast.success(response.message);
    };

    const handleRegisterCompany = async () => {
        let response = await CompanyAuthService.register(company);
        if (response.isError) {
            return toast.error(response.message);
        }
        setCompany({
            email: "",
            password: "",
            passwordConfirmation: "",
            name: "",
            address: "",
            description: "",
            size: "",
            nationality: "",
            business: "",
            website: "",
            logo: null,
        });
        toast.success(response.message);
    };

    return (
        <Container maxWidth="xl" className="mt-5">
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
                                    className="mb-3"
                                    name="email"
                                    value={dev.email}
                                    onChange={(e) => handleOnChangeTextForm(e, 1)}
                                />
                                <TextField
                                    required
                                    type="password"
                                    label="Mật khẩu"
                                    className="mb-3"
                                    name="password"
                                    onChange={(e) => handleOnChangeTextForm(e, 1)}
                                    value={dev.password}
                                />
                                <TextField
                                    required
                                    type="password"
                                    label="Nhập lại mật khẩu"
                                    className="mb-3"
                                    name="passwordConfirmation"
                                    onChange={(e) => handleOnChangeTextForm(e, 1)}
                                    value={dev.passwordConfirmation}
                                />
                                <TextField
                                    required
                                    type="text"
                                    label="Tên"
                                    className="mb-3"
                                    name="name"
                                    onChange={(e) => handleOnChangeTextForm(e, 1)}
                                    value={dev.name}
                                />
                                <TextField
                                    type="text"
                                    label="Số điện thoại"
                                    className="mb-3"
                                    name="phone"
                                    onChange={(e) => handleOnChangeTextForm(e, 1)}
                                    value={dev.phone}
                                />
                                <Input
                                    type="file"
                                    label="Ảnh đại diện"
                                    className="mb-3"
                                    name="image"
                                    onChange={(e) => handleOnChangeFileForm(e, 1)}
                                />
                                <Button variant="contained" onClick={handleRegisterDev}>
                                    Đăng ký
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
                                    type="text"
                                    label="Địa chỉ email"
                                    className="mb-3"
                                    name="email"
                                    value={company.email}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <TextField
                                    required
                                    type="password"
                                    label="Mật khẩu"
                                    className="mb-3"
                                    name="password"
                                    value={company.password}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <TextField
                                    required
                                    type="password"
                                    label="Nhập lại mật khẩu"
                                    className="mb-3"
                                    name="passwordConfirmation"
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                    value={company.passwordConfirmation}
                                />
                                <TextField
                                    required
                                    type="text"
                                    label="Tên doanh nghiệp"
                                    className="mb-3"
                                    name="name"
                                    value={company.name}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <TextField
                                    type="text"
                                    label="Địa chỉ"
                                    className="mb-3"
                                    name="address"
                                    value={company.address}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <TextField
                                    type="text"
                                    label="Mô tả công ty"
                                    className="mb-3"
                                    multiline={true}
                                    name="description"
                                    value={company.description}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <FormControl>
                                    <InputLabel id="size" className="mb-3">
                                        Quy mô công ty
                                    </InputLabel>
                                    <Select
                                        labelId="size"
                                        label="Quy mô công ty"
                                        className="mb-3"
                                        name="size"
                                        value={company.size}
                                        onChange={(e) => handleOnChangeTextForm(e, 2)}
                                    >
                                        {Object.keys(Size).map((key, index) => (
                                            <MenuItem key={index} value={key}>
                                                {Size[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    type="text"
                                    required
                                    label="Quốc tịch"
                                    className="mb-3"
                                    name="nationality"
                                    value={company.nationality}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <TextField
                                    type="text"
                                    required
                                    label="Ngành nghề"
                                    className="mb-3"
                                    name="business"
                                    value={company.business}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <TextField
                                    type="text"
                                    label="Địa chỉ website"
                                    className="mb-3"
                                    name="website"
                                    value={company.website}
                                    onChange={(e) => handleOnChangeTextForm(e, 2)}
                                />
                                <Input
                                    type="file"
                                    label="Logo công ty"
                                    className="mb-3"
                                    onChange={(e) => handleOnChangeFileForm(e, 2)}
                                />
                                <Button variant="contained" onClick={handleRegisterCompany}>
                                    Đăng ký
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

export default RegisterPage;
