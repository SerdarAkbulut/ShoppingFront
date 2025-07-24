import MainSlider from "./components/mainSlider";
import LastProducts from "./components/lastProducts";
import BestSeller from "./components/bestSeller";
import { Metadata } from "next";

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
export default function Home() {
  return (
    <div className="2xl:px-52 xl:px-40 lg:px-32 md:px-20 sm:px-10">
      <div className="flex justify-center ">
        <div className="w-full h-36 md:h-56 lg:h-72 xl:h-96 ">
          <MainSlider />
        </div>
      </div>
      <div className="mt-5 px-2">
        <h1 className="font-extrabold text-2xl ml-5">Yeni Ürünler</h1>

        <LastProducts></LastProducts>
        <div>
          <h1 className="font-extrabold text-2xl ml-5 mt-5">Sevilen Ürünler</h1>
          <BestSeller />
        </div>
      </div>
    </div>
  );
}
