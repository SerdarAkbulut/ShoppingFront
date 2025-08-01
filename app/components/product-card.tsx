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
  return (
    <Link href={`/urun/${productId}-${slugify(name)}`}>
      <div className="flex flex-col bg-white shadow-lg border border-gray-500 rounded-2xl p-2 h-full">
        <div className="border-b border-gray-200 h-42 md:h-56 lg:h-64   flex  justify-center">
          {productImages?.[0] && (
            <img
              src={productImages[0].imageUrl}
              alt=""
              className=" object-cover h-full border-b  rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-center font-semibold text-xl">{name}</div>
        <div className="mt-4 flex flex-col gap-1">
          {discount !== null ? (
            <>
              <div className="line-through">{formatToCurrency(price)} </div>
              <div className="font-bold">
                {formatToCurrency(discount || 0)}{" "}
              </div>
            </>
          ) : (
            <div>{formatToCurrency(price)} </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
