"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../hooks/user/useUser";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const router = useRouter();
  const { mutate } = forgotPassword();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Geçersiz e-posta adresi")
        .required("E-posta zorunludur."),
    }),
    onSubmit: (values) => {
      mutate(values);
      router.push("/");
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div>
          <h1>Şifre sıfırlama işlemi için e-posta adresinizi giriniz</h1>
        </div>
        <div>
          <label htmlFor="email">E-posta:</label>
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="border border-gray-300 p-2 rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
