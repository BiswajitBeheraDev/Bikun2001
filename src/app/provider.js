"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/cartcontext";
import { Suspense } from "react";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <Suspense>{children}</Suspense>
      </CartProvider>
    </SessionProvider>
  );
}
