"use client";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { MuiTelInput } from "mui-tel-input";
import { InputMask } from "primereact/inputmask";
import { getUserDetails, updateUserDetails } from "app/hooks/user/useUser";

function UserInfo() {
  const { mutate } = updateUserDetails();

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Geçersiz e-posta adresi"),
      userName: Yup.string().min(6, "En az 3 karakter olmalıdır."),
      phoneNumber: Yup.string()
        .transform(
          (value) => value.replace(/\D/g, "") // Tüm rakam dışı karakterleri temizle
        )
        .matches(/^[0-9]{10}$/, "Telefon numarası 10 haneli olmalıdır.")
        .required(),
    }),
    onSubmit: (values) => {
      mutate(values);
      refetch();
      formik.resetForm();
      localStorage.setItem("userName", values.userName);
    },
  });
  const { data, refetch } = getUserDetails();
  return (
    <div className="flex justify-center">
      <div className="my-20">
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex flex-col mb-4">
              <label>Ad Soyad</label>
              <TextField
                type="text"
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                placeholder={data?.userName || "Ad Soyad"}
              />
              {formik.errors.userName && formik.touched.userName && (
                <div>{formik.errors.userName}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label id="email" htmlFor="email">
                E-posta
              </label>
              <TextField
                type="text"
                name="email"
                id="email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder={data?.email || "E-posta"}
              />
              {formik.errors.email && formik.touched.email && (
                <div>{formik.errors.email}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label>Telefon Numarası</label>
            <InputMask
              name="phone"
              mask="(999) 999-9999"
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("phoneNumber", e.value)}
              placeholder={data?.phoneNumber || "Telefon numarası"}
              style={{ width: "100%" }}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="text-red-600">{formik.errors.phoneNumber}</span>
            )}
          </div>

          <div>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => formik.handleSubmit()}
            >
              güncelle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
