import React from "react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getSliders } from "../hooks/slider/useSlider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function MainSlider() {
  const { data } = getSliders();
  const role = useSelector((state: RootState) => state.role.role);
  console.log(role, "role");
  return (
    <>
      {role === "Admin" ? (
        <>
          <a className="text-2xl hover:cursor-pointer" href="/admin/add-slider">
            Slider Değiş
          </a>
        </>
      ) : (
        ""
      )}
      <Swiper
        effect="flip"
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {data?.map((item: any) => (
          <SwiperSlide key={item.imageUrl}>
            <img src={item.imageUrl} className="object-cover w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default MainSlider;
