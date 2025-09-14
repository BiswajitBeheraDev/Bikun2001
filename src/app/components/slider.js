'use client';

import { useState, useEffect } from 'react';
import products from '../../../prisma/data/product';
import Link from 'next/link';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = products[currentSlide];

  return (
 <section className="w-full h-screen bg-gray-100">
  <div className="w-full h-full flex flex-col md:flex-row">
    
    <div className="w-full md:w-1/2 h-1/2 md:h-full">
      <img
        src={currentProduct.image}
        alt={currentProduct.name}
        className="w-full h-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold  text-black mb-4 text-gray-600 ">{currentProduct.name}</h2>
          <p className="text-gray-600 mb-4">{currentProduct.description}</p>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            ${currentProduct.price.toFixed(2)}
          </p>
          <Link href={`/product/${currentProduct.id}`}>
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Arrows */}
      {/* <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % products.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        aria-label="Next"
      >
        →
      </button> */}

      {/* Dots */}
       {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default Slider;
