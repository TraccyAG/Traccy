import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import img1 from '../../../../assets/images/footer/img1.svg';
import img2 from '../../../../assets/images/footer/img2.svg';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import {Pagination} from 'swiper/modules';

const SimpleCarousel = () => {
    return (
        <Swiper
            pagination={true} modules={[Pagination]} className="mySwiper"
        >
            <SwiperSlide>
                <img src={img1} alt={`Image ${img1}`} style={{width: '260px', height: '76px'}}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={img2} alt={`Image ${img2}`} style={{width: '260px', height: '104px'}}/>
            </SwiperSlide>
        </Swiper>
    );
};

export default SimpleCarousel;
