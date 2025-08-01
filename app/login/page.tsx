"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import request from "../api/client/request";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../store/token/tokenSlice";
import { setRole } from "../store/role/roleSlice";
import { toast } from "react-toastify";

function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      request.User.login(values),

    onSuccess: (data) => {
      localStorage.removeItem("anonToken");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userName", data.user.userName);
      dispatch(setToken(data.token));
      dispatch(setRole(data.user.role));
      router.push("/");
    },
    onError: () => {
      toast.error("E-posta veya şifre hatalı");
    },
  });

  // Formik kullanımı
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Geçersiz e-posta adresi")
        .required("E-posta zorunludur."),
      password: Yup.string().required("Şifre zorunludur."),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="flex w-full items-center justify-center h-screen ">
      <div>
        <form onSubmit={formik.handleSubmit} className="w-96    p-12">
          <div className="flex flex-col mb-4">
            <label htmlFor="email">E-posta:</label>
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

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div className="flex justify-between">
            <a
              className="bg-red-500 text-white p-2 rounded hover:cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Şifremi Unuttum
            </a>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
