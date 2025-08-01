"use client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import SearchComponent from "../component/searchComponent";

const Arama = () => {
  const searchParams = useSearchParams();
  const params = useParams(); // Dinamik route segmentlerini alırsın
  const router = useRouter();

  const q = searchParams.get("q") ?? "";
  const sayfa = params.sayfa; // URL'deki dinamik segment

  if (!q) {
    return (
      <div className="flex justify-center items-center h-screen">
        Arama terimi giriniz.
      </div>
    );
  }
  return (
    <div>
      <SearchComponent q={q} page={sayfa} />
    </div>
  );
};

export default Arama;
