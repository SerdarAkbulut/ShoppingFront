"use client";
import { Button, Dialog, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import request from "app/api/client/request";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}
function AddUserAdress({ open, onClose }: SimpleDialogProps) {
  const { mutate } = useMutation({
    mutationFn: (values: any) => request.Address.addAddress(values),
    onSuccess: () => {
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      sehir: "",
      ilce: "",
      sokak: "",
      cadde: "",
      fullAddress: "",
      adSoyad: "",
      phone: "",
      apartmanNo: "",
      daireNo: "",
    },
    validationSchema: Yup.object({
      sehir: Yup.string().required("Şehir zorunludur"),
      ilce: Yup.string().required("İlçe zorunludur"),
      sokak: Yup.string().required("Sokak zorunludur"),
      cadde: Yup.string().required("Cadde zorunludur"),
      adSoyad: Yup.string().required("Ad Soyad zorunludur"),
      phone: Yup.string().required("Telefon zorunludur"),
      apartmanNo: Yup.string().required("Apartman No zorunludur"),
      daireNo: Yup.string().required("Daire No zorunludur"),
      fullAddress: Yup.string().required("Açık adresi giriniz"),
    }),

    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <div className=" h-full  flex justify-center items-center p-5 lg:p-20  ">
        <form
          className="grid grid-cols-2 gap-5 "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="adSoyad">Alıcı Ad Soyad</label>
            <InputText
              name="adSoyad"
              variant="outlined"
              type="text"
              value={formik.values.adSoyad}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.adSoyad && formik.errors.adSoyad && (
              <span className="text-red-600">{formik.errors.adSoyad}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Alıcı Telefon</label>
            <InputMask
              name="phone"
              mask="(999) 999-9999"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("phone", e.value)}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-600">{formik.errors.phone}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="sehir">Şehir</label>

            <InputText
              name="sehir"
              variant="outlined"
              type="text"
              value={formik.values.sehir}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.sehir && formik.errors.sehir && (
              <span className="text-red-600">{formik.errors.sehir}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="ilce">İlçe</label>

            <InputText
              name="ilce"
              variant="outlined"
              type="text"
              value={formik.values.ilce}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.ilce && formik.errors.ilce && (
              <span className="text-red-600">{formik.errors.ilce}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="sokak">Sokak</label>
            <InputText
              name="sokak"
              variant="outlined"
              type="text"
              value={formik.values.sokak}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.sokak && formik.errors.sokak && (
              <span className="text-red-600">{formik.errors.sokak}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cadde">Cadde</label>
            <InputText
              name="cadde"
              variant="outlined"
              type="text"
              value={formik.values.cadde}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.cadde && formik.errors.cadde && (
              <span className="text-red-600">{formik.errors.cadde}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="apartmanNo">Apartman No</label>
            <InputText
              name="apartmanNo"
              variant="outlined"
              type="text"
              value={formik.values.apartmanNo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.apartmanNo && formik.errors.apartmanNo && (
              <span className="text-red-600">{formik.errors.apartmanNo}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="daireNo">Daire No</label>
            <InputText
              name="daireNo"
              variant="outlined"
              type="text"
              value={formik.values.daireNo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.daireNo && formik.errors.daireNo && (
              <span className="text-red-600">{formik.errors.daireNo}</span>
            )}
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="fullAddress">Açık Adres</label>
            <InputTextarea
              name="fullAddress"
              variant="outlined"
              value={formik.values.fullAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.fullAddress && formik.errors.fullAddress && (
              <span className="text-red-600">{formik.errors.fullAddress}</span>
            )}
          </div>
          <div className="col-start-2 flex justify-center">
            <Button type="submit">Adres Ekle</Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default AddUserAdress;
