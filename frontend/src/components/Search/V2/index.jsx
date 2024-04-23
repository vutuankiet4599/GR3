import {
    Autocomplete,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import job from "../../../constants/job";
import City from "../../../constants/City";
import { useEffect, useState } from "react";
import useCustomSearchParams from "../../../hooks/RouteParamHook";
import TagService from "../../../services/Tag/TagService";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";

const SearchV2 = () => {
    const { Contract, Level, Type } = job;
    const [param, setParam] = useState({
        query: "",
        city: "",
        contract: "",
        level: "",
        type: "",
        tags: [],
    });
    const [tags, setTags] = useState([]);
    const [searchParam, setSearchParam] = useCustomSearchParams();

    const handleOnChangeTextForm = (e) => {
        setParam({
            ...param,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeTags = (e, value) => {
        console.log(value);
        setParam({
            ...param,
            tags: value,
        });
    };

    const handleOnClickSearch = (e) => {
        e.preventDefault();
        setSearchParam({
            ...searchParam,
            query: param.query,
            city: param.city,
            contract: param.contract,
            level: param.level,
            type: param.type,
            tags: param.tags.map((tag) => tag.id),
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
    return (
        <Container maxWidth="xl" className="bg-white border p-4 py-16 w-full shadow">
            <div className="flex flex-col justify-center mx-24 gap-3">
                <Typography className="text-2xl font-bold uppercase">Tìm kiếm việc làm</Typography>
                <div className="relative rounded border-2 border-solid bg-white p-2 shadow-sm ">
                    <div className="flex items-center gap-2">
                        <TextField
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                            }}
                            variant="standard"
                            className="border-none outline-none"
                            placeholder="Tìm kiếm theo tên, vị trí ..."
                            name="query"
                            value={param.query}
                            onChange={handleOnChangeTextForm}
                        />
                        <Button
                            variant="contained"
                            onClick={handleOnClickSearch}
                            startIcon={<SearchIcon />}
                            className="min-w-40"
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-3 mt-3">
                    <FormControl>
                        <InputLabel id="city">Địa điểm làm việc</InputLabel>
                        <Select
                            labelId="city"
                            label="Địa điểm làm việc"
                            className="min-w-44"
                            name="city"
                            value={param.city}
                            onChange={handleOnChangeTextForm}
                        >
                            {City.map((value, index) => (
                                <MenuItem key={index} value={value.id}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="contract">Loại hợp đồng</InputLabel>
                        <Select
                            labelId="contract"
                            label="Loại hợp đồng"
                            className="min-w-40"
                            name="contract"
                            value={param.contract}
                            onChange={handleOnChangeTextForm}
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
                            labelId="level"
                            label="Cấp bậc"
                            className="min-w-40"
                            name="level"
                            value={param.level}
                            onChange={handleOnChangeTextForm}
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
                            labelId="type"
                            label="Hình thức làm việc"
                            className="min-w-48"
                            name="type"
                            value={param.type}
                            onChange={handleOnChangeTextForm}
                        >
                            {Object.keys(Type).map((key, index) => (
                                <MenuItem key={index} value={key}>
                                    {Type[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="-ml-2 -mt-2">
                        <Autocomplete
                            sx={{ m: 1, width: 500 }}
                            multiple
                            id="tags-standard"
                            options={tags}
                            getOptionLabel={(option) => option.name}
                            value={param.tags}
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
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Công nghệ" />}
                        />
                    </FormControl>
                </div>
                <div></div>
            </div>
        </Container>
    );
};

export default SearchV2;
