import { IconButton, InputBase, Paper } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, useEffect, useState } from "react";

function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/urunler/arama/1?q=${searchTerm}`);
    }
  };
  const onClickSearch = () => {
    router.push(`/urunler/arama/1?q=${searchTerm}`);
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        className=" w-1/2 sm:w-1/2 xl:w-1/2 flex  "
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ara"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ p: "10px" }} onClick={onClickSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default SearchProduct;
