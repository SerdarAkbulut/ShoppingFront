import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ConditionalLayout from "./conditionalLayout";

export const metadata: Metadata = {
  title: {
    default: "Famelin Moda Yazıcı | Özel Tasarımlar",
    template: "%s | Famelin Moda Yazıcı",
  },
  description:
    "Famelin Moda Yazıcı ile kendi moda ürünlerinizi tasarlayın. Moda dünyasında fark yaratın!",
  keywords: ["Famelin", "moda yazıcı", "moda", "giyim", "kadın giyim"],
  authors: [{ name: "Famelin", url: "https://www.famelinmodayazici.com.tr/" }],
  creator: "Famelin Yazılım Ekibi",
  publisher: "Famelin",
  openGraph: {
    title: "Famelin Moda Yazıcı | Kendi Moda Ürününü Tasarla",
    description:
      "Kendi giyim ürünlerinizi tasarlayabileceğiniz özel bir moda yazıcısı.",
    url: "https://www.famelinmodayazici.com.tr/",
    siteName: "Famelin",
    images: [
      {
        url: "https://famelin.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Famelin Moda Yazıcı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Famelin Moda Yazıcı",
    description: "Kendi tarzınızı yaratın – Famelin Moda Yazıcı ile!",
    site: "@famelinresmi",
    creator: "@famelinresmi",
    images: ["https://famelin.com/twitter-image.jpg"],
  },
  metadataBase: new URL("https://www.famelinmodayazici.com.tr/"),
  alternates: {
    canonical: "https://www.famelinmodayazici.com.tr/",
    languages: {
      tr: "https://www.famelinmodayazici.com.tr/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body className=" min-h-screen">
        <ConditionalLayout>{children}</ConditionalLayout>

        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
      </body>
    </html>
  );
}
