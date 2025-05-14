import React from "react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface productImages {
  images: {
    imageUrl: string;
  }[];
}
function MainSlider({ images }: productImages) {
  return (
    <>
      <Swiper
        effect="flip"
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {images.map((item) => (
          <SwiperSlide key={item.imageUrl}>
            <img src={item.imageUrl} className="object-fill h-full   w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default MainSlider;
