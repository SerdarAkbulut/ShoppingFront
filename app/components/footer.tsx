import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Icon } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
function Footer() {
  return (
    <div className="w-full bg-amber-300 p-5 mt-5 md:grid md:grid-cols-3 flex-col">
      <div className="">
        <h1 className="text-center font-bold">Sosyal Medya Hesaplarımız</h1>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.instagram.com/famelinmodayazici/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={InstagramIcon} />
          </a>
        </div>
      </div>
      <div>
        <h1 className="text-center font-bold">Adresimiz </h1>
      </div>
      <div>
        <h1 className="text-center font-bold">İletişim Bilgileri</h1>
        <div className="flex flex-col  gap-2 mt-4">
          <div className="flex justify-center">
            <Icon component={PhoneIcon} /> 0535 339 86 28
          </div>
          <div className="flex justify-center">
            <a
              href="mailto:yazicifamelinmoda@gmail.com"
              className="flex items-center gap-2 font-bold"
            >
              <Icon component={AlternateEmailIcon} />
              yazicifamelinmoda@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
