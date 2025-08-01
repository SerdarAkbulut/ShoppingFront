"use client";
import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import Address from "./address/address";
import Payment from "./payment/payment";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { RootState } from "app/store/store";
import CartPage from "./cart/cart";
import request from "app/api/client/request";
import AnonAddress from "./anonAddress/anonAddress";

function StepperComponent() {
  const stepperRef = useRef<any>(null);
  const order = useSelector((state: RootState) => state.order);
  const anonOrder = useSelector((state: RootState) => state.anonOrderSlice);
  const cart = useSelector((state: RootState) => state.cart.cart?.cartItems);
  const anontoken = localStorage.getItem("anonToken");
  const { mutate: anonOrderMutate } = useMutation({
    mutationFn: () => request.Order.createAnonOrder(anonOrder),
    onSuccess: () => {
      toast.success(" siparişiniz başarıyla oluşturuldu.");
      stepperRef.current?.nextCallback();
    },
    onError: (error: any) => {
      const message = error?.response?.data.message;
      toast.error(message);
    },
  });
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
  const isAddressValid = () => {
    const address = anonOrder.anonAddress;
    return Object.values(address).every((val) => val !== "" && val !== null);
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
        {anontoken ? (
          <StepperPanel header="Sipariş Adresi">
            <div className="flex flex-column">
              <AnonAddress />
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
                disabled={!isAddressValid()}
              />
            </div>
          </StepperPanel>
        ) : (
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
        )}

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
            {anontoken ? (
              <>
                <Button
                  label="Siparişi Ver"
                  severity="success"
                  icon="pi pi-check"
                  onClick={() => anonOrderMutate()}
                />
              </>
            ) : (
              <>
                <Button
                  label="Siparişi Ver"
                  severity="success"
                  icon="pi pi-check"
                  onClick={handleCreateOrder}
                />
              </>
            )}
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}

export default StepperComponent;
