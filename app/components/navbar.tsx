"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import request from "../api/client/request";
import { Button } from "@mui/material";

function Navbar() {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => request.Category.list(),
  });
  return (
    <div className="bg-amber-300 flex gap-5 justify-center p-3">
      {data?.map((item: any) => {
        return (
          <Button
            variant="text"
            color="inherit"
            className="flex gap-5 text-base"
            sx={{
              ":hover": { backgroundColor: "wheat" },
              textTransform: "none",
            }}
            key={item.id}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}

export default Navbar;
