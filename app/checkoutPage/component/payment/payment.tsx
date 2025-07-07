import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { RootState } from "app/store/store";
import { getInstallmentOptions } from "app/hooks/products/useProducts";
import { setOrder } from "app/store/order/orderSlice";

function Payment() {
  const dispatch = useDispatch();

  const [CardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [expireMonth, expireYear] = expiryDate.split("/");
  const [installment, setInstallment] = useState("1");
  const bin = cardNumber.replace(/\s/g, "").substring(0, 6);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = cart?.cartItems.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  const { data, isLoading, error } = getInstallmentOptions(
    bin,
    totalPrice?.toString() || ""
  );
  const handleChange = (event: SelectChangeEvent) => {
    setInstallment(event.target.value as string);
  };
  useEffect(() => {
    dispatch(
      setOrder({
        orderPayment: {
          CardHolderName,
          cardNumber,
          expireYear,
          expireMonth,
          cvc,
          installment: installment,
        },
      })
    );
  }, [CardHolderName, cardNumber, expireYear, expireMonth, cvc, installment]);
  console.log(installment);

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
            onChange={(e) => setExpiryDate(e.target.value || "")}
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
        {data?.installmentDetails?.map((items: any, index: number) => (
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
                (items?.cardAssociation === "VISA" && (
                  <>
                    <svg className="flex justify-end " width="100" height="100">
                      <image
                        href="/images/visa.png"
                        className="flex justify-end"
                        width="100"
                        height="100"
                      />
                    </svg>
                  </>
                )) ||
                (items?.cardAssociation === "TROY" && (
                  <>
                    <svg className="flex justify-end " width="100" height="100">
                      <image
                        href="/images/troy.png"
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
                            value={item.installmentNumber.toString()}
                            key={index}
                          >
                            {item.installmentNumber === 1
                              ? "Tek Çekim"
                              : `${
                                  item.installmentNumber
                                } Taksit - Aylık ${parseFloat(
                                  item.InstallmentPrice
                                ).toFixed(2)} TL`}
                          </MenuItem>
                        )
                      )}
                    </Select>

                    {installment && (
                      <div className="mt-2 text-sm text-gray-700">
                        {items.installmentPrices.map((item: any) =>
                          item.installmentNumber.toString() === installment ? (
                            <div key={item.installmentNumber}>
                              Toplam Ödenecek Tutar:{" "}
                              <strong>
                                {parseFloat(item.totalPrice).toFixed(2)} TL
                              </strong>
                            </div>
                          ) : null
                        )}
                      </div>
                    )}
                  </FormControl>
                )}
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Payment;
