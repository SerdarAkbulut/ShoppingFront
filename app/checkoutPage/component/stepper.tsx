"use client";
import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import CartPage from "@/app/checkoutPage/component/cart/cart";
import Address from "./address/address";
import Payment from "./payment/payment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useMutation } from "@tanstack/react-query";
import request from "@/app/api/client/request";
import { toast } from "react-toastify";

function StepperComponent() {
  const stepperRef = useRef<any>(null);
  const order = useSelector((state: RootState) => state.order);
  const cart = useSelector((state: RootState) => state.cart.cart?.cartItems);

  const { mutate } = useMutation({
    mutationFn: ({ adressId, card, orderItems }: any) =>
      request.Order.createOrder({ adressId, card, orderItems }),
    onSuccess: (data) => {
      toast.success("Siparişiniz başarıyla oluşturuldu.");
    },

    onError: (error: any) => {
      const message = error?.response?.data.error;
      toast.error(message);
    },
  });

  const handleCreateOrder = () => {
    mutate({
      adressId: order.orderAddress,
      card: order.orderPayment,
      orderItems: cart,
    });
  };

  return (
    <div className="card flex">
      <Stepper ref={stepperRef} className="w-[700px]" linear>
        <StepperPanel header="Sipariş Bilgileri">
          <div className="h-[400px] w-full">
            <CartPage />
          </div>
          <div className="flex pt-4 justify-end">
            <Button
              label="İleri"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current?.nextCallback()}
            />
          </div>
        </StepperPanel>

        <StepperPanel header="Sipariş Adresi">
          <div className="flex flex-column">
            <Address />
          </div>
          <div className="flex pt-4 justify-between">
            <Button
              label="Geri"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current?.prevCallback()}
            />
            <Button
              label="İleri"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current?.nextCallback()}
              disabled={!order.orderAddress}
            />
          </div>
        </StepperPanel>

        <StepperPanel header="Ödeme">
          <div className="flex justify-center">
            <Payment />
          </div>
          <div className="flex pt-4 justify-between mt-10">
            <Button
              label="Geri"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current?.prevCallback()}
            />
            <Button
              label="Siparişi Ver"
              severity="success"
              icon="pi pi-check"
              onClick={handleCreateOrder}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}

export default StepperComponent;
