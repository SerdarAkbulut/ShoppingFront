import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useDispatch, useSelector } from "react-redux";

import { setOrder } from "@/app/store/order/orderSlice";
import { getInstallmentOptions } from "@/app/hooks/products/useProducts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function Payment() {
  const dispatch = useDispatch();

  const [CardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [expireMonth, expireYear] = expiryDate.split("/");
  const bin = cardNumber.replace(/\s/g, "").substring(0, 6);

  const { data, isLoading, error } = getInstallmentOptions(bin, "1000");
  useEffect(() => {
    dispatch(
      setOrder({
        orderPayment: {
          CardHolderName,
          cardNumber,
          expireYear,
          expireMonth,
          cvc,
        },
      })
    );
  }, [CardHolderName, cardNumber, expireYear, expireMonth, cvc]);
  const [installment, setInstallment] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setInstallment(event.target.value as string);
  };
  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-10">
        <div className="flex gap-4">
          <InputText
            placeholder="Kart Sahibi"
            value={CardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            className="p-inputtext"
          />
          <InputText
            type="number"
            placeholder="Kart Numarası"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="p-inputtext"
          />
        </div>
        <div className="flex gap-4 items-end">
          <InputMask
            mask="99/99"
            placeholder="Son Kullanma Tarihi"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="p-inputtext"
          />
          <InputText
            type="number"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            maxLength={3}
            className="p-inputtext"
          />
        </div>
        {data?.installmentDetails.map((items: any, index: number) => (
          <>
            <div className="grid grid-cols-4" key={index}>
              <div>
                {(items.cardAssociation === "MASTER_CARD" && (
                  <>
                    <svg className="flex justify-end " width="100" height="100">
                      <image
                        href="/images/master.png"
                        className="flex justify-end"
                        width="100"
                        height="100"
                      />
                    </svg>
                  </>
                )) ||
                  (items.cardAssociation === "VISA" && (
                    <>
                      <svg
                        className="flex justify-end "
                        width="100"
                        height="100"
                      >
                        <image
                          href="/images/visa.png"
                          className="flex justify-end"
                          width="100"
                          height="100"
                        />
                      </svg>
                    </>
                  ))}
              </div>
              <div className="col-span-3 justify-end ">
                <div className="flex justify-end">
                  {items?.installmentPrices?.length > 1 && (
                    <FormControl className="w-1/3 " variant="standard">
                      <InputLabel id="demo-simple-select">Taksit</InputLabel>
                      <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        value={installment}
                        onChange={handleChange}
                      >
                        {items.installmentPrices.map(
                          (item: any, index: number) => (
                            <MenuItem
                              value={item.installmentNumber}
                              key={index}
                            >
                              {item.installmentNumber === 1
                                ? "Tek Çekim"
                                : item.installmentNumber}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </form>
    </div>
  );
}

export default Payment;
