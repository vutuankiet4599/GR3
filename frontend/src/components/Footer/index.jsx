import { Box, Container, Divider, Typography } from "@mui/material";
import logoImg from "../../assets/img/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <div className="bg-gray-200 w-full h-fit text-base p-4 py-16 text-gray-600">
            <Container maxWidth="xl" className="flex flex-col gap-2">
                <div className="flex">
                    <div className="grow">
                        <Box
                            component="img"
                            src={logoImg}
                            height={50}
                            width={150}
                        />
                    </div>
                    <Typography className="text-black font-bold text-lg ml-5 hover:text-blue-500" component="a" href="/test">Về Chúng Tôi</Typography>
                    <Typography className="text-black font-bold text-lg ml-5 hover:text-blue-500" component="a" href="/test">Ứng viên</Typography>
                    <Typography className="text-black font-bold text-lg ml-5 hover:text-blue-500" component="a" href="/test">Nhà tuyển dụng</Typography>
                </div>
                <Divider className="bg-black" />
                <div className="flex">
                    <div className="grow">
                        <Typography>@ 2024 DevJob. All rights reserved</Typography>
                    </div>
                    <FacebookIcon className="ml-5" />
                    <TwitterIcon className="ml-5" />
                    <InstagramIcon className="ml-5" />
                    <LinkedInIcon className="ml-5" />
                </div>
            </Container>
        </div>
    );
};

export default Footer;
