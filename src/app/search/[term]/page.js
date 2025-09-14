'use client';

import { useParams } from 'next/navigation';
import products from '../../../../prisma/data/product';
import { useCart } from '../../context/cartcontext';
import Image from 'next/image';

export default function SearchPage() {
  const { term } = useParams();
  const { addToCart } = useCart();
  const searchTerm = decodeURIComponent(term).toLowerCase();

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Results for <span className="text-blue-600">{term}</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((product) => (
            <li
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
            >
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
        <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-lg transition duration-200"
          >
            Add to Cart
          </button>
            </li>
          ))}
       
        </ul>
      )}
    </div>
  );
}
