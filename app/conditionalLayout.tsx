"use client";

import { usePathname } from "next/navigation";
import ClientProviders from "./provaider";
import Header from "./components/header";
import Footer from "./components/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noLayoutPages = ["/forgot-password"]; // burada istediğin route'ları ekleyebilirsin

  if (noLayoutPages.includes(pathname)) {
    return <ClientProviders>{children}</ClientProviders>; // sadece içerik göster, layout yok
  }

  return (
    <ClientProviders>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ClientProviders>
  );
}
