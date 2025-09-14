'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import products from '../../../prisma/data/product';
import { useCart } from '../context/cartcontext';
import Image from 'next/image';

export default function HeaderContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [storeOpen, setStoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();

  const categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Food-Drink', value: 'food-drink' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Home-Office', value: 'home-office' },
    { label: 'Kitchen-Dining', value: 'kitchen-dining' },
    { label: 'Home-Decor', value: 'home-decor' },
    { label: 'Sports-Fitness', value: 'sports-fitness' },
    { label: 'Toys-Games', value: 'toys-games' },
    { label: 'Apparel', value: 'apparel' },
    { label: 'Hobbies-Music', value: 'hobbies-music' },
    { label: 'Art-Hobbies', value: 'art-hobbies' },
    { label: 'Outdoor-Sports', value: 'outdoor-sports' },
    { label: 'Books', value: 'books' },
  ];

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) setUsername(storedName);
  }, []);

  useEffect(() => {
    if (!pathname.startsWith('/search')) setSearchTerm('');
  }, [pathname]);

  useEffect(() => {
  const checkScreen = () => setIsMobile(window.innerWidth < 768);
  checkScreen();
  window.addEventListener('resize', checkScreen);
  return () => window.removeEventListener('resize', checkScreen);
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) router.push(`/search/${encodeURIComponent(trimmed)}`);
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0 && !pathname.startsWith('/search')) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
    router.push(`/search/${encodeURIComponent(name)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <header className="bg-sky-600 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} />
          <span className="text-white text-xl font-bold">MyShop</span>
        </div>

        {/* Middle Section: Search Bar (desktop only) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 justify-center relative"
        >
          <div className="w-full max-w-xl flex bg-white rounded-full overflow-hidden border border-gray-200">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
            <button
              type="submit"
              className="bg-yellow-400 px-4 py-2 text-white font-semibold hover:bg-yellow-500"
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-md z-50">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(product.name)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Right Section: Navigation */}
       <div className="flex items-center justify-between gap-4 text-white text-sm w-full md:w-auto mt-2 md:mt-0">
          <Link href="/Herofile" className="hover:text-gray-200">
            Home
          </Link>

          {/* Store Dropdown */}
         <div
  className="relative"
  onMouseEnter={!isMobile ? () => setStoreOpen(true) : undefined}
  onMouseLeave={!isMobile ? () => setStoreOpen(false) : undefined}
>
  <button
    className="hover:text-gray-200"
    onClick={isMobile ? () => setStoreOpen(!storeOpen) : undefined}
  >
    Store ▾
  </button>

  {storeOpen && (
    <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
      {categories.map((cat) => (
        <Link
  key={cat.value}
  href={`/Catagory/${cat.value}`}
  className="block px-4 py-2 text-sm hover:bg-gray-100"
  onClick={() => {
    if (isMobile) {
      setStoreOpen(false); // 👈 Close dropdown on mobile
    }
  }}
>
  {cat.label}
</Link>
      ))}
    </div>
  )}
</div>


          {/* Cart */}
          <Link href="/cart" className="relative hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.3 1.3a1 1 0 000 1.4L7 17h10l1.3-1.3a1 1 0 000-1.4L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative"
           onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span>{username}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (separate row under nav) */}
      <div className="flex justify-center px-4 mt-2 mb-4 md:hidden">
        <form onSubmit={handleSearch} className="relative w-full max-w-xl">
          <div className="flex bg-white rounded-full overflow-hidden border border-gray-200 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
              className="flex-1 px-4 py-2 text-gray-700 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-yellow-400 px-4 py-2 text-white font-semibold hover:bg-yellow-500"
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-md z-50">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(product.name)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </header>
  );
}
