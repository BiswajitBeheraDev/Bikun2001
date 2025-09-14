'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuyNowPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    productId: '',
    quantity: 1,
    paymentMethod: 'cod',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    productId: parseInt(form.productId, 10),
    quantity: parseInt(form.quantity, 10),
  };

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    if (form.paymentMethod === 'online') {
      router.push('/payment-gateway');
    } else {
      router.push('/Thankyou');
    }
  } else {
    const errorData = await res.json();
    alert(errorData.error || 'Error placing order. Please try again.');
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍️ Buy Now</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Address</label>
          <textarea
            style={styles.textarea}
            name="address"
            required
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            style={styles.input}
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Product ID</label>
          <input
            style={styles.input}
            type="text"
            name="productId"
            required
            value={form.productId}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Quantity</label>
          <input
            style={styles.input}
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Payment Method</label>
          <select
            style={styles.select}
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Buy Now</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.4rem',
    fontWeight: '500',
    color: '#444',
  },
  input: {
    padding: '0.6rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.6rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
    minHeight: '80px',
  },
  select: {
    padding: '0.6rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
