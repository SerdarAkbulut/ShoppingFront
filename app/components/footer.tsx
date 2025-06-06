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
    <div className="w-full bg-amber-300 p-5 mt-5 grid grid-cols-3">
      <div className="">
        <h1 className="text-center">Sosyal Medya Hesaplarımız</h1>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.instagram.com/famelinmodayazici/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={InstagramIcon} />
          </a>
          <a
            href="https://www.instagram.com/famelinmodayazici/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={FacebookIcon} />
          </a>
          <a
            href="https://www.instagram.com/famelinmodayazici/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={XIcon} />
          </a>
          <a
            href="https://www.instagram.com/famelinmodayazici/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={PinterestIcon} />
          </a>
        </div>
      </div>
      <div>
        <h1 className="text-center">Adresimiz </h1>
      </div>
      <div>
        <h1 className="text-center">İletişim Bilgileri</h1>
        <div className="flex flex-col  gap-2 mt-4">
          <div className="flex justify-center">
            <Icon component={PhoneIcon} /> 0535 339 86 28
          </div>
          <div className="flex justify-center">
            <Icon component={AlternateEmailIcon} />
            merve_ozturk34@hotmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
