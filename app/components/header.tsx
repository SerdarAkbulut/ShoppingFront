"use client";
import React, { useEffect, useState } from "react";
import { Button, MenuItem, Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import SearchProduct from "./search";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./sidebar";
import Navbar from "./navbar";

function Header() {
  const token = useSelector((state: RootState) => state.token.token);
  const role = useSelector((state: RootState) => state.role.role);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openSidebar, setOpenSidebar] = useState(false);
  const itemCount =
    cart?.cartItems.reduce((total, item) => total + item.quantity, 0) || 0;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
    setAnchorEl(null);
  };
  const toggleDrawer = (open: boolean) => () => {
    setOpenSidebar(open);
  };

  return (
    <div className="w-full  2xl:px-52 xl:px-40 lg:px-32 md:px-20 sm:px-10 py-5 flex justify-between">
      <div className="lg:hidden block">
        <a onClick={() => setOpenSidebar(!openSidebar)}>
          <MenuIcon />
        </a>
      </div>
      <SideBar open={openSidebar} toggleDrawer={toggleDrawer} />
      <div className="flex self-center">
        <Button
          LinkComponent={"a"}
          href="/"
          className="!text-[#FFD700] !font-bold !bg-white !rounded-xl !border-2 !border-[#FFD700] hover:!bg-[#FFD700] hover:!text-white transition-all duration-500 ease-in-out"
        >
          famelinmodayazici
        </Button>
      </div>
      <Navbar />
      <div className="lg:flex hidden  lg:self-center">
        <SearchProduct />
      </div>
      {token === null ? (
        <div className="flex justify-end gap-4 self-center">
          <div>
            <a href="/login">Giriş</a>
          </div>
          <div>
            <a href="/register">Kaydol</a>
          </div>
        </div>
      ) : role === "Admin" ? (
        <div className="flex gap-5 self-center">
          <a href="/admin/products/add-product">Ürün Ekle</a>
          <a href="/admin/products/product-list">Ürünler</a>
          <a onClick={handleOut} className="hover:cursor-pointer">
            Çıkış
          </a>
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
            <div className="border-b-2 flex items-center justify-center ">
              <span className="text-xl font-bold">
                {localStorage.getItem("userName")}
              </span>
            </div>

            <Link href="/user/settings">
              <MenuItem onClick={handleClose}>Hesap Ayarları</MenuItem>
            </Link>
            <Link href="/user/gecmis-siparisler">
              <MenuItem onClick={handleClose}>Geçmiş Siparişlerim</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>Değerlendirmelerim</MenuItem>
            <MenuItem onClick={handleOut}>Çıkış</MenuItem>
          </Menu>
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Link href="/checkoutPage">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:cursor-pointer" />
            </Link>

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
