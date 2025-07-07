"use client";
import { Button, TextField } from "@mui/material";
import { updateUserDetails } from "app/hooks/user/useUser";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type ErrorItem = {
  code: string;
  description: string;
};

type ErrorResponse = {
  message: string;
  errors: ErrorItem[];
};
function UserPassword() {
  const { mutate, error, isError } = updateUserDetails();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().min(6, "En az 6 karakter olmalıdır."),
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
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Şifreler eşleşmiyor"
      ),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });
  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errors = axiosError.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          toast.error(err.description); // burada `.description` var `.message` değil!
        });
      } else {
        // Eğer sadece genel mesaj geldiyse onu göster:
        const message = axiosError.response?.data?.message;
        if (message) {
          toast.error(message);
        }
      }
    }
  }, [isError, error]);

  return (
    <div className="flex justify-center">
      <div className="mt-20">
        <form>
          <div>
            <div className="flex flex-col mb-4">
              <label id="sifre">Şu Anki Şifre</label>
              <TextField
                id="sifre"
                type="password"
                name="oldPassword"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
                onBlur={formik.handleBlur}
                placeholder="Şu Anki Şifre"
              />
              {formik.errors.oldPassword && formik.touched.oldPassword && (
                <div>{formik.errors.oldPassword}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label id="newPassword">Yeni Şifre</label>
              <TextField
                id="newPassword"
                type="password"
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                placeholder="Yeni Şifre"
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div>{formik.errors.newPassword}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label id="confirmPassword">Yeni Şifre Tekrar</label>
              <TextField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                placeholder="Yeni Şifre Tekrar"
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div>{formik.errors.confirmPassword}</div>
                )}
            </div>
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

export default UserPassword;
