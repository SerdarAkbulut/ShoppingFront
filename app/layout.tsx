import "./globals.css";
import { ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ConditionalLayout from "./conditionalLayout";
import Footer from "./components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full mh-h-screen">
      <body className=" min-h-screen flex flex-col max-w-screen">
        <ConditionalLayout>{children}</ConditionalLayout>

        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <Footer />
      </body>
    </html>
  );
}
