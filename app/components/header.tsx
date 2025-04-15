"use client";
import React from "react";
import { Button, MenuItem, Menu } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  const token = useSelector((state: RootState) => state.token.token);
  const role = useSelector((state: RootState) => state.role.role);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full bg-[#FFC0CB] p-7 flex justify-between">
      <div>
        <Button
          LinkComponent={"a"}
          href="/products"
          className="!text-[#FFD700] !font-bold !bg-white !rounded-xl !border-2 !border-[#FFD700] hover:!bg-[#FFD700] hover:!text-white transition-all duration-500 ease-in-out"
        >
          famelinmodayazici
        </Button>
      </div>
      <div>arama</div>
      {token === null ? (
        <div className="flex justify-end gap-4">
          <div>
            <a href="/login">Giriş</a>
          </div>
          <div>
            <a href="/register">Kaydol</a>
          </div>
        </div>
      ) : role === "Admin" ? (
        <div className="flex gap-5">
          <a href="/admin/products/add-product">Ürün Ekle</a>
          <a href="/admin/products/product-list">Ürünler</a>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <a onClick={handleClick}>
            <PersonIcon fontSize="large" className="hover:cursor-pointer" />
          </a>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Ayarlar</MenuItem>
            <MenuItem onClick={handleClose}>Geçmiş Siparişlerim</MenuItem>
            <MenuItem onClick={handleClose}>Değerlendirmelerim</MenuItem>
            <MenuItem onClick={handleClose}>Çıkış</MenuItem>
          </Menu>
          <ShoppingCartIcon className="hover:cursor-pointer" />
        </div>
      )}
    </div>
  );
}

export default Header;
