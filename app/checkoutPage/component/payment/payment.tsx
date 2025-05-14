import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useDispatch, useSelector } from "react-redux";

import { setOrder } from "@/app/store/order/orderSlice";

function Payment() {
  const dispatch = useDispatch();

  const [CardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [expireMonth, expireYear] = expiryDate.split("/");

  console.log(expireMonth, "ay");
  console.log(expireYear, "yil");
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
      </form>
    </div>
  );
}

export default Payment;
