import {
  anonOrderSlice,
  setAnonOrder,
} from "app/store/anonOrder/anonOrderSlice";
import { RootState } from "app/store/store";
import { useFormik } from "formik";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

function AnonAddress() {
  const dispatch = useDispatch();
  const anonOrder = useSelector((state: RootState) => state.anonOrderSlice);

  const formik = useFormik({
    initialValues: {
      ad: anonOrder.anonAddress?.ad || "",
      soyad: anonOrder.anonAddress?.soyad || "",
      phone: anonOrder.anonAddress?.phone || "",
      sehir: anonOrder.anonAddress?.sehir || "",
      email: anonOrder.anonAddress?.email || "",
      ilce: anonOrder.anonAddress?.ilce || "",
      sokak: anonOrder.anonAddress?.sokak || "",
      cadde: anonOrder.anonAddress?.cadde || "",
      apartmanNo: anonOrder.anonAddress?.apartmanNo || "",
      daireNo: anonOrder.anonAddress?.daireNo || "",
      fullAddress: anonOrder.anonAddress?.fullAddress || "",
    },
    validationSchema: Yup.object({
      sehir: Yup.string().required("Şehir zorunludur"),
      ilce: Yup.string().required("İlçe zorunludur"),
      sokak: Yup.string().required("Sokak zorunludur"),
      cadde: Yup.string().required("Cadde zorunludur"),
      ad: Yup.string().required("Ad Soyad zorunludur"),
      soyad: Yup.string().required("Soyad zorunludur"),
      phone: Yup.string().required("Telefon zorunludur"),
      apartmanNo: Yup.string().required("Apartman No zorunludur"),
      daireNo: Yup.number().required("Daire No zorunludur"),
      fullAddress: Yup.string().required("Açık adresi giriniz"),
      email: Yup.string()
        .required("Email zorunludur")
        .email("Geçerli bir email giriniz"),
    }),

    onSubmit: () => {},
  });
  useEffect(() => {
    // Belirli alanlar doluysa gönder (örneğin sehir, ilce vs. boşsa göndermeyebilirsin)
    if (
      formik.values.sehir &&
      formik.values.ilce &&
      formik.values.ad &&
      formik.values.soyad &&
      formik.values.email &&
      formik.values.phone
    ) {
      dispatch(
        setAnonOrder({
          anonAddress: {
            ad: formik.values.ad,
            soyad: formik.values.soyad,
            phone: formik.values.phone,
            sehir: formik.values.sehir,
            ilce: formik.values.ilce,
            sokak: formik.values.sokak,
            cadde: formik.values.cadde,
            fullAddress: formik.values.fullAddress,
            apartmanNo: formik.values.apartmanNo,
            daireNo: formik.values.daireNo,
            email: formik.values.email,
          },
        })
      );
    }
  }, [formik.values]);
  return (
    <div>
      <div className=" h-full  flex justify-center items-center p-20  ">
        <form
          className="grid grid-cols-2 gap-5 "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="ad">Alıcı Ad</label>
            <InputText
              name="ad"
              variant="outlined"
              type="text"
              value={formik.values.ad}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.ad && formik.errors.ad && (
              <span className="text-red-600">{formik.errors.ad}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="soyad">Alıcı Soyad</label>
            <InputText
              name="soyad"
              variant="outlined"
              type="text"
              value={formik.values.soyad}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.soyad && formik.errors.soyad && (
              <span className="text-red-600">{formik.errors.soyad}</span>
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
            <label htmlFor="email">Alıcı Email</label>
            <InputText
              type="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-600">{formik.errors.email}</span>
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
        </form>
      </div>
    </div>
  );
}

export default AnonAddress;
