'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCartStore } from '@/lib/cartStore';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

const PAYMENT_METHODS = [
  { id: 'cod', icon: '💵', label: 'COD (Bayar di Tempat)', desc: 'Bayar saat barang tiba' },
  { id: 'gopay', icon: '💚', label: 'GoPay', desc: 'Transfer ke nomor GoPay kami' },
  { id: 'ovo', icon: '💜', label: 'OVO', desc: 'Transfer ke nomor OVO kami' },
  { id: 'dana', icon: '💙', label: 'DANA', desc: 'Transfer ke nomor DANA kami' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
    city: '',
    payment_method: 'cod',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className={styles.empty}>
          <h2>Keranjang kosong</h2>
          <Link href="/#products" className="btn-primary"><span>Belanja Sekarang</span></Link>
        </div>
        <Footer />
      </>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.customer_name.trim()) e.customer_name = 'Nama wajib diisi';
    if (!form.phone.trim()) e.phone = 'Nomor HP wajib diisi';
    if (!form.address.trim()) e.address = 'Alamat wajib diisi';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            qty: i.qty,
            price: i.price,
          })),
          total,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        router.push(`/order/${data.data.id}?method=${data.data.payment_method}&code=${data.data.order_code}`);
      } else {
        alert('Gagal membuat pesanan: ' + data.error);
      }
    } catch {
      alert('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/cart" className={styles.backBtn}>← Kembali ke Keranjang</Link>
            <h1 className={styles.title}>Checkout <em>Pesanan</em></h1>
          </div>

          <form className={styles.layout} onSubmit={handleSubmit} id="checkout-form">
            {/* Left: Form */}
            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>📦 Data Pengiriman</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="customer_name">Nama Lengkap *</label>
                  <input
                    id="customer_name"
                    name="customer_name"
                    type="text"
                    className={`form-input ${errors.customer_name ? styles.inputError : ''}`}
                    placeholder="Masukkan nama lengkap"
                    value={form.customer_name}
                    onChange={handleChange}
                  />
                  {errors.customer_name && <span className={styles.errorMsg}>{errors.customer_name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Nomor HP / WhatsApp *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? styles.inputError : ''}`}
                    placeholder="Contoh: 08123456789"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Alamat Lengkap *</label>
                  <textarea
                    id="address"
                    name="address"
                    className={`form-input ${errors.address ? styles.inputError : ''}`}
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    placeholder="Nama jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
                    value={form.address}
                    onChange={handleChange}
                  />
                  {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="city">Kota / Kabupaten</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Jakarta Selatan"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">Catatan Pesanan</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-input"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                    placeholder="Contoh: Tolong bungkus kado, warna tali biru"
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>💳 Metode Pembayaran</h3>
                <div className={styles.paymentList}>
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`${styles.paymentOption} ${form.payment_method === m.id ? styles.paymentSelected : ''}`}
                      htmlFor={`pay-${m.id}`}
                    >
                      <input
                        type="radio"
                        id={`pay-${m.id}`}
                        name="payment_method"
                        value={m.id}
                        checked={form.payment_method === m.id}
                        onChange={handleChange}
                        className={styles.paymentRadio}
                      />
                      <span className={styles.paymentIcon}>{m.icon}</span>
                      <div>
                        <span className={styles.paymentLabel}>{m.label}</span>
                        <span className={styles.paymentDesc}>{m.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Ringkasan Pesanan</h3>
                <div className={styles.summaryItems}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.summaryItem}>
                      <div className={styles.summaryItemImg}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="60px" />
                      </div>
                      <div className={styles.summaryItemInfo}>
                        <span className={styles.summaryItemName}>{item.name}</span>
                        <span className={styles.summaryItemQty}>×{item.qty}</span>
                      </div>
                      <span className={styles.summaryItemPrice}>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryDivider}></div>

                <div className={styles.totalRow}>
                  <span>Total Pembayaran</span>
                  <span className={styles.totalAmt}>{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  className={styles.orderBtn}
                  disabled={loading}
                  id="place-order-btn"
                >
                  {loading ? (
                    <span className={styles.loadingText}>Memproses... ⏳</span>
                  ) : (
                    <>✦ Buat Pesanan</>
                  )}
                </button>

                <p className={styles.secureNote}>
                  🔒 Data kamu aman dan terlindungi
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
