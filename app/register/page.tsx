"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import request from "../api/client/request";
import { Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import UyelikSozlesmesi from "app/components/uyelikSozlesme";
import { useState } from "react";
import AydinlatmaMetniDialog from "app/components/aydinlatmaMetni";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      surName: "",
      email: "",
      password: "",
      phone: "",
      uyelikSozlesmesi: false,
      aydinlatmaMetni: false,
    },
    validationSchema: Yup.object().shape({
      uyelikSozlesmesi: Yup.boolean()
        .oneOf([true], "Üyelik sözleşmesini kabul etmelisiniz")
        .required("Üyelik sözleşmesini kabul etmelisiniz"),
      aydinlatmaMetni: Yup.boolean()
        .oneOf([true], "Aydınlatma metnini kabul etmelisiniz")
        .required("Aydınlatma metnini kabul etmelisiniz"),
      name: Yup.string()
        .min(3, "Ad  en az 3 karakter olmalıdır")
        .required("Ad   zorunludur"),
      surName: Yup.string()
        .min(3, "Soyad  en az 3 karakter olmalıdır")
        .required("Soyad zorunludur"),
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
        .required("Telefon numarası zorunludur"),
    }),
    onSubmit: (values, { setErrors }) => {
      mutate(values, {
        onError: (error: any) => {
          if (error.response?.data) {
            const errorsArray = error.response.data;
            const newErrors: Record<string, string> = {};
            toast.error(
              error.response.data.message || "Kayıt işlemi başarısız oldu."
            );
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
  const [showUyelikSozlesmesi, setShowUyelikSozlesmesi] = useState(false);
  const [showAydinlatmaMetni, setShowAydinlatmaMetni] = useState(false);
  const { mutate } = useMutation({
    mutationFn: (values: {
      name: string;
      surName: string;
      phone: string;
      uyelikSozlesmesi: boolean;
      aydinlatmaMetni: boolean;
      password: string;
      email: string;
    }) => request.User.register(values),
  });

  return (
    <div className="flex  items-center justify-center   ">
      <form onSubmit={formik.handleSubmit} className=" mt-64 p-12">
        <div className="flex flex-col mb-4">
          <label>Ad </label>
          <InputText
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label> Soyad</label>
          <InputText
            type="text"
            name="surName"
            onChange={formik.handleChange}
            value={formik.values.surName}
            onBlur={formik.handleBlur}
          />
          {formik.errors.surName && formik.touched.surName && (
            <div className="text-red-500">{formik.errors.surName}</div>
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
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>Telefon:</label>

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
            <div className="text-red-500">{formik.errors.phone}</div>
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
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <div className="font-light text-sm">
            <Checkbox
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="uyelikSozlesmesi"
            />
            <span
              className="underline hover:cursor-pointer"
              onClick={() => setShowUyelikSozlesmesi(true)}
            >
              Üyelik sözleşmesini kabul ediyorum.
            </span>
            {formik.errors.uyelikSozlesmesi &&
              formik.touched.uyelikSozlesmesi && (
                <div className="text-red-500">
                  {" "}
                  {formik.errors.uyelikSozlesmesi}
                </div>
              )}
          </div>
          <div className="font-light text-sm">
            <Checkbox
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="aydinlatmaMetni"
            />
            <span
              className="underline hover:cursor-pointer"
              onClick={() => setShowAydinlatmaMetni(true)}
            >
              Kişisel verilerin işlenmesine ilişkin Aydınlatma Metnini okudum.
            </span>
            {formik.errors.aydinlatmaMetni &&
              formik.touched.aydinlatmaMetni && (
                <div className="text-red-500">
                  {formik.errors.aydinlatmaMetni}
                </div>
              )}
          </div>
        </div>
        <div className="mt-12 flex justify-end w-full">
          <Button type="submit" variant="outlined">
            Kayıt Ol
          </Button>
        </div>
        <UyelikSozlesmesi
          visible={showUyelikSozlesmesi}
          setVisible={setShowUyelikSozlesmesi}
        />
        <AydinlatmaMetniDialog
          visible={showAydinlatmaMetni}
          onHide={() => setShowAydinlatmaMetni(false)}
        />
      </form>
    </div>
  );
};

export default RegisterPage;
