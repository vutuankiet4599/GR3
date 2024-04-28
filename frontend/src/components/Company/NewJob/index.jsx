import { useEffect, useState } from "react";
import job from "../../../constants/job";
import City from "../../../constants/City";
import {
    Container,
    FormControl,
    InputLabel,
    TextField,
    Typography,
    Select,
    MenuItem,
    Autocomplete,
    InputAdornment,
    IconButton,
    Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TagService from "../../../services/Tag/TagService";
import { toast } from "react-toastify";
import JobService from "../../../services/Job/JobService";

const NewJob = () => {
    let { Type, Contract, Level } = job;
    const [newJob, setNewJob] = useState({
        name: "",
        salary: "",
        welfare: [""],
        experience: 0,
        interview: [""],
        type: "",
        contract: "",
        work: [""],
        skill: [""],
        level: "",
        status: "",
        cityId: 0,
        descripiton: "",
        tags: [],
    });

    const [tags, setTags] = useState([]);

    const handleChangeAtomicValue = (e) => {
        setNewJob({
            ...newJob,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const getTags = async () => {
            try {
                let response = await TagService.getAll();
                if (response.isError) {
                    return toast.error(response.message);
                }
                setTags(response.data.tags);
            } catch (error) {
                return toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        };

        getTags();
    }, []);

    const handleOnChangeTags = (e, value) => {
        setNewJob({
            ...newJob,
            tags: value,
        });
    };

    const handleAddField = (type) => {
        if (type === "WORK") {
            setNewJob({
                ...newJob,
                work: [...newJob.work, ""],
            });
        }

        if (type === "INTERVIEW") {
            setNewJob({
                ...newJob,
                interview: [...newJob.interview, ""],
            });
        }

        if (type === "WELFARE") {
            setNewJob({
                ...newJob,
                welfare: [...newJob.welfare, ""],
            });
        }

        if (type === "SKILL") {
            setNewJob({
                ...newJob,
                skill: [...newJob.skill, ""],
            });
        }
    };

    const handleDeleteField = (type, index) => {
        if (type === "WORK") {
            const updatedWork = [...newJob.work];
            updatedWork.splice(index, 1);
            setNewJob({
                ...newJob,
                work: updatedWork,
            });
        }

        if (type === "INTERVIEW") {
            const updatedInterview = [...newJob.interview];
            updatedInterview.splice(index, 1);
            setNewJob({
                ...newJob,
                interview: updatedInterview,
            });
        }

        if (type === "WELFARE") {
            const updatedWelfare = [...newJob.welfare];
            updatedWelfare.splice(index, 1);
            setNewJob({
                ...newJob,
                welfare: updatedWelfare,
            });
        }

        if (type === "SKILL") {
            const updatedSkill = [...newJob.skill];
            updatedSkill.splice(index, 1);
            setNewJob({
                ...newJob,
                skill: updatedSkill,
            });
        }
    };

    const handleOnChangeField = (type, value, index) => {
        if (type === "WORK") {
            let newValue = [...newJob.work];
            newValue[index] = value;
            setNewJob({
                ...newJob,
                work: newValue,
            });
        }

        if (type === "INTERVIEW") {
            let newValue = [...newJob.interview];
            newValue[index] = value;
            setNewJob({
                ...newJob,
                interview: newValue,
            });
        }

        if (type === "WELFARE") {
            let newValue = [...newJob.welfare];
            newValue[index] = value;
            setNewJob({
                ...newJob,
                welfare: newValue,
            });
        }

        if (type === "SKILL") {
            let newValue = [...newJob.skill];
            newValue[index] = value;
            setNewJob({
                ...newJob,
                skill: newValue,
            });
        }
    };

    const handleCreateNewJob = async () => {
        try {
            let response = await JobService.create(newJob);
            if (response.isError) {
                return toast(response.message);
            }
            setNewJob({
                name: "",
                salary: "",
                welfare: [""],
                experience: 0,
                interview: [""],
                type: "",
                contract: "",
                work: [""],
                skill: [""],
                level: "",
                status: "",
                cityId: 0,
                descripiton: "",
                tags: [],
            });
            return toast(response.message);
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại");
        }
    };

    return (
        <Container maxWidth="xl" className="flex gap-5 justify-between w-full">
            <div className="flex flex-col gap-3 w-1/2 justify-start">
                <Typography className="font-bold text-lg">Thông tin chung</Typography>
                <div className="flex flex-col gap-2">
                    <TextField
                        value={newJob.name}
                        label="Tên công việc"
                        id="name"
                        name="name"
                        onChange={handleChangeAtomicValue}
                        required
                    />
                    <FormControl>
                        <InputLabel id="city">Địa chỉ công việc</InputLabel>
                        <Select
                            required
                            labelId="city"
                            label="Địa chỉ công việc"
                            className="min-w-full"
                            name="cityId"
                            value={newJob.cityId}
                            onChange={handleChangeAtomicValue}
                        >
                            {City.map((value, index) => (
                                <MenuItem key={index} value={value.id}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        value={newJob.salary}
                        label="Mức lương công việc"
                        id="salary"
                        name="salary"
                        onChange={handleChangeAtomicValue}
                    />
                    <TextField
                        required
                        value={newJob.experience}
                        id="experience"
                        name="experience"
                        onChange={handleChangeAtomicValue}
                        label="Số năm kinh nghiệm tối thiểu"
                        type="number"
                    />
                    <FormControl>
                        <InputLabel id="contract">Loại hợp đồng</InputLabel>
                        <Select
                            required
                            labelId="contract"
                            label="Loại hợp đồng"
                            className="min-w-full"
                            name="contract"
                            value={newJob.contract}
                            onChange={handleChangeAtomicValue}
                        >
                            {Object.keys(Contract).map((key, index) => (
                                <MenuItem key={index} value={key}>
                                    {Contract[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="level">Cấp bậc</InputLabel>
                        <Select
                            required
                            labelId="level"
                            label="Cấp bậc"
                            className="min-w-full"
                            name="level"
                            value={newJob.level}
                            onChange={handleChangeAtomicValue}
                        >
                            {Object.keys(Level).map((key, index) => (
                                <MenuItem key={index} value={key}>
                                    {Level[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="type">Hình thức làm việc</InputLabel>
                        <Select
                            required
                            labelId="type"
                            label="Hình thức làm việc"
                            className="min-w-full"
                            name="type"
                            value={newJob.type}
                            onChange={handleChangeAtomicValue}
                        >
                            {Object.keys(Type).map((key, index) => (
                                <MenuItem key={index} value={key}>
                                    {Type[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="-ml-2 mr-2">
                        <Autocomplete
                            sx={{ m: 1, width: "100%" }}
                            multiple
                            id="tags-standard"
                            options={tags}
                            getOptionLabel={(option) => option.name}
                            disableCloseOnSelect
                            value={newJob.tags}
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
                                <TextField {...params} variant="outlined" label="Kỹ thuật sử dụng" />
                            )}
                        />
                    </FormControl>
                    <TextField
                        name="description"
                        id="description"
                        label="Mô tả công việc"
                        value={newJob.description}
                        onChange={handleChangeAtomicValue}
                        multiline
                        minRows={5}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
                <Typography className="font-bold text-lg">Thông tin công việc</Typography>
                <div className="flex flex-col gap-2">
                    {newJob.work.map((value, index) => (
                        <TextField
                            key={`work-${index}`}
                            variant="outlined"
                            label={`Công việc ${index + 1}`}
                            value={value}
                            id={`work-${index}`}
                            onChange={(e) => handleOnChangeField("WORK", e.target.value, index)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="error" onClick={() => handleDeleteField("WORK", index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))}
                    <Button color="success" onClick={() => handleAddField("WORK")}>
                        <ControlPointIcon />
                    </Button>
                </div>
                <Typography className="font-bold text-lg">Thông tin phỏng vấn</Typography>
                <div className="flex flex-col gap-2">
                    {newJob.interview.map((value, index) => (
                        <TextField
                            key={`interview-${index}`}
                            variant="outlined"
                            label={`Vòng phỏng vấn ${index + 1}`}
                            value={value}
                            id={`interview-${index}`}
                            onChange={(e) => handleOnChangeField("INTERVIEW", e.target.value, index)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="error" onClick={() => handleDeleteField("INTERVIEW", index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))}
                    <Button color="success" onClick={() => handleAddField("INTERVIEW")}>
                        <ControlPointIcon />
                    </Button>
                </div>
                <Typography className="font-bold text-lg">Thông tin kỹ năng</Typography>
                <div className="flex flex-col gap-2">
                    {newJob.skill.map((value, index) => (
                        <TextField
                            key={`skill-${index}`}
                            variant="outlined"
                            label={`Kỹ năng ${index + 1}`}
                            value={value}
                            id={`skill-${index}`}
                            onChange={(e) => handleOnChangeField("SKILL", e.target.value, index)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="error" onClick={() => handleDeleteField("SKILL", index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))}
                    <Button color="success" onClick={() => handleAddField("SKILL")}>
                        <ControlPointIcon />
                    </Button>
                </div>
                <Typography className="font-bold text-lg">Thông tin đãi ngộ</Typography>
                <div className="flex flex-col gap-2">
                    {newJob.welfare.map((value, index) => (
                        <TextField
                            key={`welfare-${index}`}
                            variant="outlined"
                            label={`Đãi ngộ ${index + 1}`}
                            value={value}
                            id={`welfare-${index}`}
                            onChange={(e) => handleOnChangeField("WELFARE", e.target.value, index)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="error" onClick={() => handleDeleteField("WELFARE", index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))}
                    <Button color="success" onClick={() => handleAddField("WELFARE")}>
                        <ControlPointIcon />
                    </Button>
                </div>
                <Button color="primary" variant="contained" onClick={handleCreateNewJob}>
                    Đăng công việc mới
                </Button>
            </div>
        </Container>
    );
};

export default NewJob;
