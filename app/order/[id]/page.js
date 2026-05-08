'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

const EWALLET_INFO = {
  gopay: { name: 'GoPay', number: '08123456789', icon: '💚' },
  ovo: { name: 'OVO', number: '08234567890', icon: '💜' },
  dana: { name: 'DANA', number: '08345678901', icon: '💙' },
};

export default function OrderPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const method = searchParams.get('method');
  const code = searchParams.get('code');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setOrder(d.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className="spinner"></div>
      </div>
    );
  }

  const ewalletInfo = EWALLET_INFO[method];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.successIcon}>✨</div>
          <h1 className={styles.title}>Pesanan <em>Berhasil Dibuat!</em></h1>
          <p className={styles.subtitle}>
            Terima kasih sudah memesan di Mykonos! 🌸<br />
            Kode pesananmu adalah <strong className={styles.orderCode}>{code || (order?.order_code)}</strong>
          </p>

          {/* Payment Instructions */}
          {method === 'cod' ? (
            <div className={styles.paymentCard}>
              <div className={styles.paymentHeader}>
                <span>💵</span>
                <h3>Pembayaran COD</h3>
              </div>
              <p className={styles.paymentDesc}>
                Kamu akan membayar saat barang tiba di depan pintu. Pastikan uang sudah siap sesuai nominal.
              </p>
              <div className={styles.paymentTotal}>
                Total: <strong>{order ? formatPrice(order.total) : '-'}</strong>
              </div>
            </div>
          ) : ewalletInfo ? (
            <div className={styles.paymentCard}>
              <div className={styles.paymentHeader}>
                <span>{ewalletInfo.icon}</span>
                <h3>Transfer {ewalletInfo.name}</h3>
              </div>
              <p className={styles.paymentDesc}>
                Silakan transfer ke nomor berikut:
              </p>
              <div className={styles.accountBox}>
                <div className={styles.accountInfo}>
                  <span className={styles.accountLabel}>{ewalletInfo.name}</span>
                  <span className={styles.accountNum}>{ewalletInfo.number}</span>
                  <span className={styles.accountName}>a/n Mykonos Parfum Official</span>
                </div>
              </div>
              <div className={styles.paymentTotal}>
                Nominal Transfer: <strong>{order ? formatPrice(order.total) : '-'}</strong>
              </div>
              <p className={styles.paymentNote}>
                ⚠️ Setelah transfer, kirim bukti pembayaran ke WhatsApp kami untuk konfirmasi pesanan.
              </p>
            </div>
          ) : null}

          {/* Order Details */}
          {order && (
            <div className={styles.orderDetails}>
              <h3 className={styles.detailTitle}>Detail Pesanan</h3>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Nama</span>
                  <span className={styles.detailValue}>{order.customer_name}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>No. HP</span>
                  <span className={styles.detailValue}>{order.phone}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Alamat</span>
                  <span className={styles.detailValue}>{order.address}{order.city ? `, ${order.city}` : ''}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Status</span>
                  <span className={`${styles.detailValue} ${styles.statusBadge}`}>⏳ Menunggu Konfirmasi</span>
                </div>
              </div>

              {/* Items */}
              {order.items?.length > 0 && (
                <div className={styles.orderItems}>
                  <h4 className={styles.itemsTitle}>Produk yang Dipesan</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className={styles.orderItem}>
                      <span>{item.product_name} × {item.qty}</span>
                      <span>{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                  <div className={styles.orderItemTotal}>
                    <span>Total</span>
                    <strong>{formatPrice(order.total)}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <a
              href={`https://wa.me/6281234567890?text=Halo%20Mykonos!%20Saya%20sudah%20pesan%20dengan%20kode%20${code || order?.order_code}.%20Saya%20ingin%20konfirmasi%20pesanan.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
              id="wa-confirm-btn"
            >
              💬 Konfirmasi via WhatsApp
            </a>
            <Link href="/" className="btn-secondary" id="back-home-btn">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
