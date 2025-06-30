import { deleteSlider, getSliders } from "@/app/hooks/slider/useSlider";
import React from "react";

function GetSliders() {
  const { data } = getSliders();
  const { mutate } = deleteSlider();
  return (
    <div className="flex flex-wrap gap-2">
      {data?.map((img: any, index: any) => (
        <div className="flex flex-col" key={index}>
          <span
            className="text-center inline hover:cursor-pointer text-red-500"
            onClick={() => mutate(img.id)}
          >
            X
          </span>
          <img
            key={index}
            src={img.imageUrl}
            alt={`Yüklenen görsel ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md border"
          />
        </div>
      ))}
    </div>
  );
}

export default GetSliders;
