export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">Sayfa Bulunamadı</h1>
      <p className="text-lg mt-4">Üzgünüz, aradığınız sayfa mevcut değil.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Ana Sayfaya Dön
      </a>
    </div>
  );
}
