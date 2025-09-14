'use client'
import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded hover:shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
      <p>${product.price}</p>
      <Link href={`/product/${product.id}`} passHref>
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
          View
        </button>
      </Link>
      
    </div>
  )
}