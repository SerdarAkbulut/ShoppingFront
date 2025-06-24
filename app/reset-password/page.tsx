"use client";
import React, { useEffect } from "react";
import { checktoken, resetPassword } from "../hooks/user/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  const {
    mutate,
    isError: reset,
    error: resett,
    isSuccess: resetSucc,
  } = resetPassword();
  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email");
  const token = params.get("token");
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      email: email,
      token: token,
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Şifre girmelisiniz")
        .min(6, "En az 6 karakter olmalıdır.")
        .matches(/[A-Z]/, "Şifre en az bir büyük harf (A-Z) içermelidir.")
        .matches(/[a-z]/, "Şifre en az bir küçük harf (a-z) içermelidir.")
        .matches(/\d/, "Şifre en az bir rakam (0-9) içermelidir.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>_\-+=]/,
          "Şifre en az bir özel karakter içermelidir."
        ),
      confirmPassword: Yup.string()
        .required("Şifre tekrarı girmelisiniz")
        .oneOf([Yup.ref("newPassword")], "Şifreler eşleşmiyor")
        .min(6, "En az 6 karakter olmalıdır."),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });
  useEffect(() => {
    if (resetSucc) {
      router.push("/");
    }
  }, [resetSucc]);
  const { data, isLoading, error, isError } = checktoken(email, token);
  if (data?.code === 400) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        Bağlantınızın süresi dolmuş lütfen yeni bir bağlantı talep edin
        <a href="/">
          <Button variant="contained">Ana Sayfa</Button>
        </a>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen bg-amber-50">
      <form className="flex flex-col gap-4 shadow-2xl border-2 p-12 rounded-2xl">
        <div className="block">
          <TextField
            id="standard-basic"
            label="Şifre"
            name="newPassword"
            variant="standard"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div>{formik.errors.newPassword}</div>
          )}
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Şifre Tekrar"
            name="confirmPassword"
            variant="standard"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div>{formik.errors.confirmPassword}</div>
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => formik.handleSubmit()}>Kaydet</Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
