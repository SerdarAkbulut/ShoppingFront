"use client";

export default function ProductDetailClient({ product }: { product: any }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div>
        {product.images?.map((img: any, i: number) => (
          <img key={i} src={img.imageUrl} alt={product.name} />
        ))}
      </div>
    </div>
  );
}
