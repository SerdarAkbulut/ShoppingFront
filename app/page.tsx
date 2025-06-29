"use client";
import { useQuery } from "@tanstack/react-query";

import request from "./api/client/request";
import MainSlider from "./components/mainSlider";
import LastProducts from "./components/lastProducts";
import BestSeller from "./components/bestSeller";

export default function Home() {
  const dummyProductImages = [
    {
      imageUrl:
        "https://sysrqmts.com/images/games/counter-strike-global-offensive.jpg",
    },
    {
      imageUrl:
        "https://yt3.googleusercontent.com/ytc/AIdro_k7Kew6C0Xwv1GBr16JrKKDlzyRkHX7OW5Y2JhbSDYuh2A=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUfwqO9H99Y1w4BKbmnKWkE0vlySsHtQ8tvQ&s",
    },
  ];

  return (
    <div className="px-52">
      <div className="flex justify-center ">
        <div className="w-full h-[800px] ">
          <MainSlider images={dummyProductImages} />
        </div>
      </div>
      <div className="mt-5 ">
        <h1 className="font-extrabold text-2xl ml-5">Yeni Ürünler</h1>

        <LastProducts></LastProducts>
        <div>
          <h1 className="font-extrabold text-2xl ml-5 mt-5">Sevilen Ürünler</h1>
          <BestSeller />
        </div>
      </div>
    </div>
  );
}
