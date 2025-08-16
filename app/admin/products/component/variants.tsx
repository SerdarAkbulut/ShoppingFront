import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getColors, getSizes } from "app/hooks/products/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { setOrder } from "app/store/order/orderSlice";

interface Size {
  id: number;
  name: string;
}

interface Color {
  id: number;
  name: string;
}

interface Variant {
  sizeId: number;
  colorId: number;
  stock: number;
}

const ProductVariantsTable: React.FC = () => {
  const { data: sizes } = getSizes();
  const { data: colors } = getColors();
  const orderVariants = useSelector((state: RootState) => state.order.variants);
  const dispatch = useDispatch();
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [expandedSizeId, setExpandedSizeId] = useState<number | null>(null);

  const handleSizeToggle = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.some((s) => s.id === size.id)
        ? prev.filter((s) => s.id !== size.id)
        : [...prev, size]
    );
  };
  useEffect(() => {
    if (!colors || selectedSizes.length === 0) {
      setVariants([]);
      return;
    }

    const newVariants: Variant[] = [];
    selectedSizes.forEach((size) => {
      colors.forEach((color: Color) => {
        const existing = variants.find(
          (v) => v.sizeId === size.id && v.colorId === color.id
        );
        newVariants.push({
          sizeId: size.id,
          colorId: color.id,
          stock: existing ? existing.stock : 0,
        });
      });
    });

    setVariants(newVariants);
  }, [selectedSizes, colors]);
  const handleStockChange = (
    sizeId: number,
    colorId: number,
    value: number
  ) => {
    setVariants((prev) => {
      const updated = prev.map((v) =>
        v.sizeId === sizeId && v.colorId === colorId
          ? { ...v, stock: value }
          : v
      );
      dispatch(setOrder({ variants: updated }));
      return updated;
    });
  };

  return (
    <>
      <div className="flex gap-5 flex-wrap">
        {sizes?.map((size: Size) => (
          <label
            key={size.id}
            className="cursor-pointer flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selectedSizes.some((s) => s.id === size.id)}
              onChange={() => handleSizeToggle(size)}
            />
            {size.name}
          </label>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        {selectedSizes.length > 0 && variants.length > 0 && (
          <Paper style={{ marginTop: 20, padding: 10 }}>
            {selectedSizes.map((size) => (
              <Accordion
                key={size.id}
                expanded={expandedSizeId === size.id}
                onChange={() =>
                  setExpandedSizeId(expandedSizeId === size.id ? null : size.id)
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <Typography>{size.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="grid grid-cols-2 gap-4 font-bold border-b pb-2 mb-2">
                    <span>Renk</span>
                    <span>Stok</span>
                  </div>

                  {variants
                    .filter((v) => v.sizeId === size.id)
                    .map((variant) => {
                      const colorName =
                        colors?.find((c: any) => c.id === variant.colorId)
                          ?.name || "";
                      return (
                        <div
                          key={`${variant.sizeId}-${variant.colorId}`}
                          className="grid grid-cols-2 gap-4 items-center mb-2"
                        >
                          <Typography>{colorName}</Typography>
                          <TextField
                            size="small"
                            value={variant.stock}
                            onChange={(e) =>
                              handleStockChange(
                                variant.sizeId,
                                variant.colorId,
                                Number(e.target.value)
                              )
                            }
                          />
                        </div>
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        )}
      </div>
    </>
  );
};

export default ProductVariantsTable;
