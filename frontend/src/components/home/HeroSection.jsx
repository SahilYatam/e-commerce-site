import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import LazyImage from "../common/LazyImage";
import "swiper/css"
import "swiper/css/pagination";

import hero1 from '../../assets/hero_section_img/hero1.jpg';
import hero2 from "../../assets/hero_section_img/hero2.png"
import hero3 from '../../assets/hero_section_img/hero6.jpg';
import hero4 from '../../assets/hero_section_img/hero4.jpg';

const heroImages = [hero1, hero2, hero3, hero4];

const HeroSection = () => {


    return (
        <section className="hero-wrapper w-full h-64 md:h-72 lg:h-[65vh]">
            <Swiper 
                modules={[Autoplay, Pagination]}
                autoplay={{delay: 4000, disableOnInteraction: false}}
                pagination={{clickable: true}}
                loop
                className="hero-swiper h-full"
            >
                {heroImages.map((src, i) => (
                    <SwiperSlide key={src}>
                        <img
                            src={src}
                            alt={`Hero slide ${i + 1}`}
                            className="hero-image object-fill w-full h-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default HeroSection