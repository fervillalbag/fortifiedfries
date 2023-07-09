import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface HeaderGalleryProps {
  data: any[];
}

const HeaderGallery: React.FC<HeaderGalleryProps> = ({ data }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      modules={[Pagination]}
      className="mySwiper"
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="h-56">
            <img
              src={item.image}
              alt=""
              className={`rounded-2xl w-full h-full object-cover`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderGallery;
