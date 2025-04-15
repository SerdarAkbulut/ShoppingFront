"use client";
import React, { useEffect } from "react";
import { Button, MenuItem, Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  const token = useSelector((state: RootState) => state.token.token);
  const role = useSelector((state: RootState) => state.role.role);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const itemCount = cart?.cartItems?.length || 0;
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
          <div className="relative w-10 h-10 flex items-center justify-center">
            <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:cursor-pointer" />

            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                {itemCount}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
