import { Container } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CompanyCard from "../Card";
import PropTypes from "prop-types";

const CompanySwiper = ({ companies }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "</span>";
        },
    };

    return (
        <Container maxWidth="xl" className="px-4 py-10 -mb-8 flex items-center justify-center">
            {companies && (
                <Swiper
                    pagination={pagination}
                    modules={[Pagination, Autoplay]}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    loop={true}
                    className="mySwiper"
                    autoplay={true}
                >
                    {companies.map((company, index) => (
                        <SwiperSlide key={index}>
                            <CompanyCard company={company} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </Container>
    );
};

CompanySwiper.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CompanySwiper;
