export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD") // Türkçe karakterleri dönüştürmeye hazırlar
    .replace(/[\u0300-\u036f]/g, "") // aksanları kaldırır
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ğ/g, "g")
    .replace(/[^a-z0-9 -]/g, "") // harf, rakam ve boşluk dışındakileri kaldır
    .replace(/\s+/g, "-") // boşlukları tire ile değiştir
    .replace(/-+/g, "-") // birden fazla tire varsa teke indir
    .replace(/^-+|-+$/g, ""); // baştaki/sondaki tireleri kaldır
}
