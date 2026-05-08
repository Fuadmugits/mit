'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCartStore } from '@/lib/cartStore';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛍️</div>
          <h2>Keranjang Kosong</h2>
          <p>Belum ada produk yang ditambahkan ke keranjang.</p>
          <Link href="/#products" className="btn-primary" id="browse-products-btn">
            <span>Jelajahi Produk</span>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Keranjang <em>Belanja</em></h1>
            <button className={styles.clearBtn} onClick={clearCart} id="clear-cart-btn">
              Kosongkan Keranjang
            </button>
          </div>

          <div className={styles.layout}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem} id={`cart-item-${item.id}`}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="120px"
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                    <div className={styles.itemControls}>
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >−</button>
                        <span className={styles.qtyNum}>{item.qty}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >+</button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label="Hapus produk"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemSubtotal}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className={styles.summary}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Ringkasan Pesanan</h3>

                <div className={styles.summaryRows}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.summaryRow}>
                      <span>{item.name} ×{item.qty}</span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryDivider}></div>

                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>{formatPrice(total)}</span>
                </div>

                <div className={styles.shipping}>
                  <span>🚚 Ongkir</span>
                  <span className={styles.shippingFree}>Dihitung saat checkout</span>
                </div>

                <button
                  className={styles.checkoutBtn}
                  onClick={() => router.push('/checkout')}
                  id="checkout-btn"
                >
                  Lanjut ke Checkout ✦
                </button>

                <Link href="/#products" className={styles.continueBtn} id="continue-shopping-btn">
                  ← Lanjut Belanja
                </Link>

                <div className={styles.paymentMethods}>
                  <p>Metode Pembayaran:</p>
                  <div className={styles.paymentIcons}>
                    <span>💵 COD</span>
                    <span>💚 GoPay</span>
                    <span>💜 OVO</span>
                    <span>💙 DANA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
