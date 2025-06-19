import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { formatToCurrency, slugify } from "../utils/slugify";

interface productCard {
  productId: number;
  name: string;
  price: number;
  productImages?: productImages[];
  discount?: number;
}
interface productImages {
  imageUrl: string;
}
const ProductCard: React.FC<productCard> = ({
  name,
  price,
  productImages,
  productId,
  discount,
}) => {
  console.log(discount);
  return (
    <div className="flex flex-col bg-white shadow-lg border border-gray-500 rounded-2xl p-5 h-full">
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
                className="w-full h-[400px] object-cover border-b hover:scale-110 rounded-lg "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link
        href={`/urun/${productId}-${slugify(name)}`}
        className="flex mt-4 font-bold text-xl"
      >
        {name}
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        {discount !== null ? (
          <>
            <div className="line-through">{formatToCurrency(price)} </div>
            <div className="font-bold">{formatToCurrency(discount)} </div>
          </>
        ) : (
          <div>{formatToCurrency(price)} </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
