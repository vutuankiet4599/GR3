import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logoImage from "../../../assets/img/logo.png";
import userImage from "../../../assets/img/user.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import tokenSlice from "../../../redux/slices/tokenSlice";
import companySlice from "../../../redux/slices/companySlice";
import { companySelector } from "../../../redux/selectors";
import CompanyAuthService from "../../../services/Auth/Company/CompanyAuthService";

const pages = [["Ứng viên tiềm năng", "/company/candidates"]];

const Header = () => {
    const company = useSelector(companySelector);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        let response = await CompanyAuthService.logout();
        if (response.isError) {
            return toast.error(response.message);
        }
        dispatch(companySlice.actions.resetCompany());
        dispatch(tokenSlice.actions.resetToken());
        navigate("/");
        toast.success(response.message);
    };

    return (
        <AppBar position="static" className="bg-white border shadow-md">
            <CssBaseline />
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Box
                            component="img"
                            src={logoImage}
                            height={50}
                            width={150}
                            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
                        />
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page, i) => (
                                <Link key={i} to={page[1]}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page[0]}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Link to="/">
                        <Box
                            component="img"
                            src={logoImage}
                            height={50}
                            width={150}
                            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                        />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} className="gap-5 ml-5">
                        {pages.map((page, i) => (
                            <Link key={i} to={page[1]}>
                                <Button
                                    className="font-bold text-base border-none outline-none text-black hover:text-blue-500"
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page[0]}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={company.logo ? company.logo : userImage} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link to="/company/dashboad">
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Bảng điều khiển</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem
                                onClick={(e) => {
                                    handleCloseUserMenu(e);
                                    handleLogout();
                                }}
                            >
                                <Typography textAlign="center">Đăng xuất</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
