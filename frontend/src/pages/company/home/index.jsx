import { Typography, Button } from "@mui/material";
import firstHandImg from "../../../assets/img/firsthand.svg";
import secondHandImg from "../../../assets/img/secondhand.svg";
import thirdHandImg from "../../../assets/img/thirdhand.svg";
import companyHomeImg from "../../../assets/img/companyhome.webp";
import { Link } from "react-router-dom";
import "./style.css";

const HomePage = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center bg-white">
            <div className="flex gap-0 py-28 px-10 items-center justify-center bg-gradient-to-br to-cyan-500 from-blue-950 w-full text-white">
                <div className="flex flex-col gap-10 text">
                    <Typography variant="h2" component="p" className="text-wrap">
                        Trang web tuyển dụng dành cho IT tại Việt Nam
                    </Typography>
                    <Typography className="text-wrap">
                        Chúng tôi có thể giúp bạn tìm kiếm được ứng viên phù hợp nhất với công việc hiện tại của bạn
                    </Typography>
                    <Link to="/company/dashboard">
                        <Button variant="contained" color="primary" size="large" className="w-1/3 py-4 text-lg">
                            Đến bảng điều khiển ngay!
                        </Button>
                    </Link>
                </div>
                <div>
                    <img src={companyHomeImg} className="pl-10" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center pt-20 w-full">
                <Typography variant="h3" component="p" gutterBottom className="font-bold mb-10">
                    Một số dữ liệu về trang web
                </Typography>
                <Typography component="p" className="mb-3 text-lg">
                    Dữ liệu chỉ mang tính tham khảo
                </Typography>
                <div className="background flex gap-3 items-center justify-around w-full py-28">
                    <div className="bg-white rounded flex flex-col w-[428px] relative shadow-md items-center justify-center py-10">
                        <Typography variant="h4" component="p" gutterBottom className="text-blue-500 text-shadow">
                            1000+
                        </Typography>
                        <Typography component="p" className="font-bold">
                            Công ty IT và doanh nghiệp
                        </Typography>
                        <img src={firstHandImg} className="w-20 h-20 absolute -top-10 left-[174px]" />
                    </div>
                    <div className="bg-white rounded flex flex-col w-[428px] relative shadow-md items-center justify-center py-10">
                        <Typography variant="h4" component="p" gutterBottom className="text-blue-500 text-shadow">
                            15,000+
                        </Typography>
                        <Typography component="p" className="font-bold">
                            CV được gửi
                        </Typography>
                        <img src={secondHandImg} className="w-20 h-20 absolute -top-10 left-[174px]" />
                    </div>
                    <div className="bg-white rounded flex flex-col w-[428px] relative shadow-md items-center justify-center py-10">
                        <Typography variant="h4" component="p" gutterBottom className="text-blue-500 text-shadow">
                            10,000+
                        </Typography>
                        <Typography component="p" className="font-bold">
                            Hồ sơ IT phù hợp
                        </Typography>
                        <img src={thirdHandImg} className="w-20 h-20 absolute -top-10 left-[174px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
