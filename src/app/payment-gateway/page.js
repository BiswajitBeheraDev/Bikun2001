// app/payment-gateway/page.js

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentGatewayPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/Thankyou');
    }, 3000); 

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>💳 Redirecting to Payment Gateway...</h1>
      <p>Please wait while we process your payment.</p>
    </div>
  );
}
