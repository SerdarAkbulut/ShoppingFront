import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCategories } from "../hooks/products/useProducts";
import SearchProduct from "./search";
import { useRouter } from "next/navigation";
import { slugify } from "../utils/slugify";
function SideBar({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}) {
  const { data, isLoading } = useCategories();
  const router = useRouter();

  const handleSelectCategory = (id?: number, catName?: string) => {
    if (id === undefined && catName === undefined) {
      router.push(`/urunler?sayfa=${1}`);
    } else {
      router.push(`/urunler/${slugify(catName ?? "")}-${id}/sayfa/${1}`);
    }
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Button
            LinkComponent={"a"}
            href="/"
            className="!text-[#FFD700] !font-bold !bg-white !rounded-xl !border-2 !border-[#FFD700] hover:!bg-[#FFD700] hover:!text-white transition-all duration-500 ease-in-out"
          >
            famelinmodayazici
          </Button>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <SearchProduct />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              toggleDrawer(false)();
              handleSelectCategory();
            }}
          >
            <ListItemText primary="Tüm Ürünler" />
          </ListItemButton>
        </ListItem>
        {data?.map((item: any) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => {
                toggleDrawer(false)();
                handleSelectCategory(item.id, item.name);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}

export default SideBar;
