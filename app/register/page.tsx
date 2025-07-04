"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import request from "../api/client/request";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";

const RegisterPage = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
        .required("Kullanıcı adı zorunludur"),
      email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta zorunludur"),
      password: Yup.string()
        .required("Şifre girmelisiniz")
        .min(6, "En az 6 karakter olmalıdır.")
        .matches(/[A-Z]/, "Şifre en az bir büyük harf (A-Z) içermelidir.")
        .matches(/[a-z]/, "Şifre en az bir küçük harf (a-z) içermelidir.")
        .matches(/\d/, "Şifre en az bir rakam (0-9) içermelidir.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>_\-+=]/,
          "Şifre en az bir özel karakter içermelidir."
        ),
      phone: Yup.string()
        .transform(
          (value) => value.replace(/\D/g, "") // Tüm rakam dışı karakterleri temizle
        )
        .matches(/^[0-9]{10}$/, "Telefon numarası 10 haneli olmalıdır.")
        .required(),
    }),
    onSubmit: (values, { setErrors }) => {
      mutate(values, {
        onError: (error: any) => {
          if (error.response?.data) {
            const errorsArray = error.response.data; // Backend'den gelen hata dizisi
            const newErrors: Record<string, string> = {};

            errorsArray.forEach(
              (err: { code: string; description: string }) => {
                if (err.code === "PasswordRequiresNonAlphanumeric") {
                  newErrors.password =
                    "Şifre en az bir özel karakter içermelidir.";
                }
                if (err.code === "PasswordRequiresDigit") {
                  newErrors.password = "Şifre en az bir rakam içermelidir.";
                }
                if (err.code === "PasswordRequiresUpper") {
                  newErrors.password =
                    "Şifre en az bir büyük harf içermelidir.";
                }
              }
            );

            setErrors(newErrors);
          }
        },
        onSuccess: () => {
          router.push("/login");
        },
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: (values: {
      userName: string;
      password: string;
      email: string;
    }) => request.User.register(values),
  });

  return (
    <div className="flex  items-center justify-center   ">
      <form
        onSubmit={formik.handleSubmit}
        className="w-96 bg-gray-100 mt-64 p-12"
      >
        <div className="flex flex-col mb-4">
          <label>Ad Soyad</label>
          <InputText
            type="text"
            name="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName && formik.touched.userName && (
            <div>{formik.errors.userName}</div>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label>E-posta:</label>
          <InputText
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <InputMask
            name="phone"
            mask="(999) 999-9999"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={(e) => formik.setFieldValue("phone", e.value)}
            style={{ width: "100%", background: "transparent" }}
            className="border-2"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div>{formik.errors.phone}</div>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>Şifre:</label>
          <InputText
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>

        <Button type="submit" variant="outlined">
          Kayıt Ol
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
