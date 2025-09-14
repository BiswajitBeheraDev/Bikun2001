'use client'

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white ">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>

        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/About" className="text-sm hover:underline">
            About
          </Link>
          <Link href="/Contact" className="text-sm hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}