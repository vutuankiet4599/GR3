import { Button, Container, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleOnSearch = (e) => {
        e.preventDefault();
        navigate(`/jobs?query=${query}`);
    };

    return (
        <Container maxWidth="xl" className="from-blue-600 bg-gradient-to-br p-4 py-16">
            <div className="flex flex-col justify-center mx-24 gap-3">
                <Typography className="text-2xl font-bold uppercase text-slate-50">Tìm kiếm việc làm</Typography>
                <div className="relative rounded border border-solid border-white bg-white p-2 shadow-sm ">
                    <form onSubmit={handleOnSearch}>
                        <div className="flex items-center gap-2">
                            <TextField
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                variant="standard"
                                className="border-none outline-none"
                                placeholder="Tìm kiếm theo tên, vị trí ..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={handleOnSearch}
                                startIcon={<SearchIcon />}
                                className="min-w-40"
                            >
                                Tìm kiếm
                            </Button>
                        </div>
                    </form>
                </div>
                {/* <div className="flex flex-row text-base gap-3">
                    <Typography className="font-bold text-slate-50">Một số lựa chọn cho bạn:</Typography>
                    <Chip label="PHP" clickable className="bg-white rounded-none" style={{ color: "#292929" }} />
                    <Chip label="PHP" clickable className="bg-white rounded-none" style={{ color: "#292929" }} />
                    <Chip label="PHP" clickable className="bg-white rounded-none" style={{ color: "#292929" }} />
                    <Chip label="PHP" clickable className="bg-white rounded-none" style={{ color: "#292929" }} />
                    <Chip label="PHP" clickable className="bg-white rounded-none" style={{ color: "#292929" }} />
                </div> */}
            </div>
        </Container>
    );
};

export default Search;
