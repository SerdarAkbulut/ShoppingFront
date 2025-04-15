import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "http://localhost:3000"; // Localhost

  // API'den tüm ürünleri çek (sitemap'a koyacağız)
  const res = await fetch("http://localhost:5034/api/products");
  const products = await res.json();

  const urls = products
    .map((product: any) => {
      return `
        <url>
          <loc>${baseUrl}/product/${product.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
