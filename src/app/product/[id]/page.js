'use client';

import { useParams } from 'next/navigation';
import products from '../../../../prisma/data/product';
import { useCart } from '@/app/context/cartcontext';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        {/* Product not found. */}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded shadow"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-green-700 font-semibold mb-4">
              ${product.price}
            </p>
            <p className="text-white-700 leading-relaxed">{product.description}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-lg transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
