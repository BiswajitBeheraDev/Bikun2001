'use client';

import products from '../../../../prisma/data/product';
import ProductCard from '../../components/productcard';
import { useParams } from 'next/navigation';
import { useCart } from '../../context/cartcontext';

export default function CatagoryPage() {
  const params = useParams();
  const catagory = params.catagory;

  const { addToCart } = useCart(); // 💡 use the cart context

  const filteredProducts = products.filter(
    (product) => product.category?.toLowerCase() === catagory.toLowerCase()
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">Category: {catagory}</h1>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow">
              <ProductCard product={product} />

              {/* Add to Cart button */}
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
