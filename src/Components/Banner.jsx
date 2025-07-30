// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Slide from './Slide';

import bgimg1 from '../assets/images/carousel1.jpg';
import bgimg2 from '../assets/images/carousel2.jpg';
import bgimg3 from '../assets/images/carousel3.jpg';

const allSlides = [
    { image: bgimg1, text: "Welcome to HSTU Job Portal!" },
    { image: bgimg2, text: "Find Your Perfect Match!" },
    { image: bgimg3, text: "Hire the Best Experts!" }
];

const Banner = () => {
    return (
        <div className='container px-6 mx-auto '>
            <Swiper
                className='mt-0 text-center border-2 '
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
            >
                {allSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Slide image={slide.image} text={slide.text} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;