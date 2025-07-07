// "use client";
// import React from "react";
// import {
//   getProducts,
//   getProductsByCategory,
// } from "../hooks/products/useProducts";
// import { slugify } from "../utils/slugify";

// export const JsonLdProductList = (page: any) => {
//   const { data } = getProducts(page);

//   if (!data || data.length === 0) return null;

//   const structuredData = data?.products?.map((product: any) => ({
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product.name,
//     image: product.images.map((item: any) => item.imageUrl.replace(" ", "")),

//     description: product.description || "Açıklama bulunmamaktadır.",
//     offers: {
//       "@type": "Offer",
//       priceCurrency: "TRY",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//       shippingDetails: {
//         "@type": "OfferShippingDetails",
//       },
//       hasMerchantReturnPolicy: {
//         "@type": "MerchantReturnPolicy",
//       },
//     },
//     brand: {
//       "@type": "Brand",
//       name: "Famelin",
//     },
//   }));

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{
//         __html: JSON.stringify(structuredData),
//       }}
//     />
//   );
// };

// export const JsonLdProductsByCategory = ({
//   props,
// }: {
//   props: { catId: number; page: number };
// }) => {
//   const { catId, page } = props;

//   const { data } = getProductsByCategory(catId, page);

//   if (!data || !data.length) return null;

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@graph": data.map((product: any) => ({
//       "@type": "Product",
//       name: product.name,
//       brand: {
//         "@type": "Brand",
//         name: "Famelin",
//       },
//       image: product.images?.map((item: any) =>
//         item.imageUrl.replace(/\s/g, "")
//       ),
//       description: product.description || "Açıklama bulunmamaktadır.",
//       offers: {
//         "@type": "Offer",
//         priceCurrency: "TRY",
//         price: product.price,
//         availability: "https://schema.org/InStock",
//         url: `https://www.famelinmodayazici.com/urun/${product.id}-${slugify(
//           product.name
//         )}`,
//         seller: {
//           "@type": "Organization",
//           name: "Famelin Moda Yazıcı",
//           url: "https://www.famelinmodayazici.com",
//         },
//       },
//     })),
//   };

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{
//         __html: JSON.stringify(structuredData),
//       }}
//     />
//   );
// };
