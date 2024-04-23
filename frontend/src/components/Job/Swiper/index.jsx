import { Container } from "@mui/material"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import JobCard from "../Card";

const JobSwiper = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '</span>';
        },
    };
    
    return (
        <Container maxWidth="xl" className="px-4 py-16 flex items-center justify-center">
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={40}
                loop={true}
                className="mySwiper"
            >
                <SwiperSlide><JobCard /></SwiperSlide>
                <SwiperSlide><JobCard /></SwiperSlide>
                <SwiperSlide><JobCard /></SwiperSlide>
                <SwiperSlide><JobCard /></SwiperSlide>
            </Swiper>
        </Container>
    );
};

export default JobSwiper;
