"use client";
import { useQuery } from "@tanstack/react-query";

import request from "./api/client/request";
import MainSlider from "./components/mainSlider";
import LastProducts from "./components/lastProducts";
import BestSeller from "./components/bestSeller";

export default function Home() {
  return (
    <div className="2xl:px-52 xl:px-40 lg:px-32 md:px-20 sm:px-10">
      <div className="flex justify-center ">
        <div className="w-full h-[800px] ">
          <MainSlider />
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
