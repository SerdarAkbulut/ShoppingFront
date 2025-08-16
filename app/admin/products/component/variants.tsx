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

interface ProductVariantsTableProps {
  productVariants?: any[];
}

const ProductVariantsTable: React.FC<ProductVariantsTableProps> = ({
  productVariants,
}) => {
  const { data: sizes } = getSizes();
  const { data: colors } = getColors();
  const dispatch = useDispatch();

  // productVariants gelmese bile boş array kullan
  const sizesOnly = Array.from(
    new Map(productVariants?.map((v) => [v.size?.id, v.size]) || []).values()
  );
  console.log(productVariants, "productVariants");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(sizesOnly);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [expandedSizeId, setExpandedSizeId] = useState<number | null>(null);

  const handleSizeToggle = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.some((s) => s.id === size.id)
        ? prev.filter((s) => s.id !== size.id)
        : [...prev, size]
    );
  };

  // variants oluşturma
  useEffect(() => {
    if (!colors?.length || !selectedSizes.length) {
      setVariants([]);
      return;
    }

    const newVariants: Variant[] = [];

    selectedSizes.forEach((size) => {
      colors.forEach((color: Color) => {
        const existing = productVariants?.find(
          (v) => v.size?.id === size.id && v.color?.id === color.id
        );
        newVariants.push({
          sizeId: size.id,
          colorId: color.id,
          stock: existing?.stock || 0,
        });
      });
    });

    setVariants((prev) => {
      const isEqual =
        prev.length === newVariants.length &&
        prev.every(
          (v, i) =>
            v.sizeId === newVariants[i].sizeId &&
            v.colorId === newVariants[i].colorId &&
            v.stock === newVariants[i].stock
        );
      return isEqual ? prev : newVariants;
    });
  }, [selectedSizes, colors]);

  const handleStockChange = (
    sizeId: number,
    colorId: number,
    value: number
  ) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.sizeId === sizeId && v.colorId === colorId
          ? { ...v, stock: value }
          : v
      )
    );
  };

  // Redux dispatch, variants değiştiğinde
  useEffect(() => {
    dispatch(setOrder({ variants }));
  }, [variants, dispatch]);

  return (
    <>
      {/* Size Checkbox */}
      <div className="flex gap-5 flex-wrap">
        {sizes?.length > 0 &&
          sizes.map((size: Size) => (
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

      {/* Variants Table */}
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
                            type="number"
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
