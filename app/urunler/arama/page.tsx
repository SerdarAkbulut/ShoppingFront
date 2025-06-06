"use client";
import SearchComponent from "./component/searchComponent";
import { useSearchParams } from "next/navigation";

const Arama = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  if (!q) {
    return (
      <div className="flex justify-center items-center h-screen">
        Arama terimi giriniz.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5 mx-8 2xl:mx-52 xl:mx-44 lg:mx-32 md:mx-24 sm:mx-16">
      <SearchComponent q={q} />
    </div>
  );
};

export default Arama;
