'use client';
import { useCart } from "../context/cartcontext";
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, clearCart, removeFromCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleBuyNow = () => {
    clearCart();
    router.push('/BuyNow');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded mb-4 flex flex-col md:flex-row gap-4 md:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-24 h-40 md:h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>

              <div className="self-end md:self-auto">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
