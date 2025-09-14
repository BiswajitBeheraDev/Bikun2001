"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data); 
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  if (products.length === 0) {
    // return <p className="p-6">No products found 😕</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 shadow">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{p.name}</h2>
          <p className="text-sm text-gray-600">{p.description}</p>
          <p className="text-blue-600 font-semibold mt-2">${p.price}</p>
          <p className="text-xs text-gray-500">Category: {p.category}</p>
        </div>
      ))}
    </div>
  );
}
