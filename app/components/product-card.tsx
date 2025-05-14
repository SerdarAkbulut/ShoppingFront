import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { slugify } from "../utils/slugify";

interface productCard {
  productId: number;
  name: string;
  price: number;
  productImages?: productImages[];
}
interface productImages {
  imageUrl: string;
}

const ProductCard: React.FC<productCard> = ({
  name,
  price,
  productImages,
  productId,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-2xl rounded-2xl p-5 h-full">
      <div className="border-b border-gray-200">
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper h-full"
        >
          {productImages?.map((item) => (
            <SwiperSlide
              key={item.imageUrl}
              className="h-[200px] flex items-center justify-center"
            >
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-[400px] object-cover border-b hover:scale-110 "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link href={`/urun/${productId}-${slugify(name)}`} className="flex mt-4">
        {name}
      </Link>
      <div className="mt-4 flex justify-between">
        <div>{price} ₺</div>
      </div>
    </div>
  );
};

export default ProductCard;
