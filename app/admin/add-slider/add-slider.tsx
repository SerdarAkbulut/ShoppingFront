import { Button, styled } from "@mui/material";
import { addSlider } from "app/hooks/slider/useSlider";
import { convertToBase64 } from "app/utils/slugify";
import React, { useState } from "react";

function AddSlider() {
  const [Images, setImages] = useState<{ ImageUrl: string }[]>([]);
  const { mutate } = addSlider();
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const hadleClick = () => {
    mutate(Images);
    setImages([]);
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-center">
          <Button component="label" variant="contained" fullWidth={false}>
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={async (event) => {
                const files = event.target.files;
                if (files) {
                  const base64Files = await Promise.all(
                    Array.from(files).map((file) => convertToBase64(file))
                  );
                  setImages((prev) => [
                    ...(prev || []),
                    ...base64Files.map((b64) => ({ ImageUrl: b64 })),
                  ]);
                }
              }}
            />
            Görsel Yükle
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                hadleClick();
              }}
            >
              Ekle
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Images.map((img, index) => (
          <div className="flex flex-col" key={index}>
            <span
              className="text-center inline hover:cursor-pointer text-red-500"
              onClick={() => {
                const updated = [...Images];
                updated.splice(index, 1);
                setImages(updated);
              }}
            >
              X
            </span>
            <img
              key={index}
              src={img.ImageUrl}
              alt={`Yüklenen görsel ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md border"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default AddSlider;
