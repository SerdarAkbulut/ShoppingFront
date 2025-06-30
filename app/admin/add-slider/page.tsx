"use client";

import React, { useState } from "react";
import AddSlider from "./add-slider";
import GetSliders from "./get-sliders";

function Page() {
  return (
    <div className="flex justify-between px-8 gap-5 ">
      <div className="w-1/2 flex justify-center flex-col ">
        <h1>Slider Ekle</h1>
        <div className="p-20 bg-gray-300 rounded-3xl">
          <AddSlider />
        </div>
      </div>
      <div className="w-1/2 flex  flex-col">
        <h1>Sliderlar</h1>
        <div className="p-20 bg-gray-300 rounded-3xl w-full ">
          <GetSliders />
        </div>
      </div>
    </div>
  );
}

export default Page;
