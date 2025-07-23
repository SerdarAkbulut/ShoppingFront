"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Dialog } from "@mui/material";

interface productImages {
  images: {
    imageUrl: string;
  }[];
}

function ProductImage({ images }: productImages) {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [open, setOpen] = useState(false);
  const handleClickOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
    setZoomed(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [zoomed, setZoomed] = useState(false);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation(); // Dialog'u kapatmaması için
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;

    setTransformOrigin(`${originX}% ${originY}%`);
    setZoomed((prev) => !prev);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      handleClose();
    }
  };

  return (
    <div className="w-full max-w-screen mx-auto overflow-hidden">
      <Swiper
        effect="flip"
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {images.map((item) => (
          <SwiperSlide key={item.imageUrl}>
            <img
              src={item.imageUrl}
              alt="Product"
              className="h-96 w-full  object-cover rounded-3xl cursor-pointer"
              onClick={() => handleClickOpen(item.imageUrl)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        onClick={handleClickOutside}
      >
        <div className="flex justify-end mr-5 ">
          <button
            className="text-red-600 p-2 text-2xl hover:cursor-pointer"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className="flex justify-center h-screen ">
          <div ref={containerRef} className="w-7/12">
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Zoomable"
              onClick={handleImageClick}
              className="transition-transform duration-300 ease-in-out cursor-zoom-in object-cover max-w-full "
              style={{
                transform: zoomed ? "scale(2)" : "scale(1)",
                transformOrigin: transformOrigin,
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductImage;
