import { Button, TextField } from "@mui/material";
import { addDiscount } from "app/hooks/products/useProducts";
import React from "react";

function Discount({ productId }: { productId: any }) {
  const [discount, setDiscount] = React.useState<string>("");

  const { mutate } = addDiscount();

  return (
    <div className="flex gap-4">
      <TextField
        variant="standard"
        label="İndirim Fiyatı"
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => mutate({ productId, discount })}
      >
        İndirimi Uygula
      </Button>
      <Button variant="contained" size="small">
        İndirimi Kaldır
      </Button>
    </div>
  );
}

export default Discount;
