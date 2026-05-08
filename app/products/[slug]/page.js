'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCartStore } from '@/lib/cartStore';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return <div className="toast">🌸 {message}</div>;
}

function NoteTag({ label }) {
  return <span className={styles.noteTag}>{label}</span>;
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (slug) {
      fetch(`/api/products/${slug}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setProduct(d.data);
          else router.push('/');
          setLoading(false);
        })
        .catch(() => { setLoading(false); router.push('/'); });
    }
  }, [slug, router]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      slug: product.slug,
    }, qty);
    setToast(`${product.name} (x${qty}) ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      slug: product.slug,
    }, qty);
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) return null;

  const topNotes = product.top_notes?.split(',').map((n) => n.trim()) || [];
  const middleNotes = product.middle_notes?.split(',').map((n) => n.trim()) || [];
  const baseNotes = product.base_notes?.split(',').map((n) => n.trim()) || [];

  return (
    <>
      <Navbar />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className={styles.breadcrumb}>
        <Link href="/">Beranda</Link>
        <span>/</span>
        <Link href="/#products">Produk</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <main className={styles.main}>
        {/* Product Image */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrap}>
            <div className={styles.imageCard}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
            <div className={styles.imageBadge}>
              <span>✦ {product.sensation}</span>
            </div>
          </div>
          <div className={styles.imageDecoLeft}></div>
          <div className={styles.imageDecoRight}></div>
        </div>

        {/* Product Info */}
        <div className={styles.infoSection}>
          <div className={styles.productMeta}>
            <span className="section-badge">Extrait de Parfum</span>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              <span className={styles.priceNote}>/ 50ml & 100ml</span>
            </div>
            <div className={styles.goldDivider}>
              <span>✦</span>
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Character & Durability */}
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>👤</span>
              <div>
                <span className={styles.metaLabel}>Karakter</span>
                <span className={styles.metaValue}>{product.character}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>⏳</span>
              <div>
                <span className={styles.metaLabel}>Ketahanan</span>
                <span className={styles.metaValue}>{product.durability}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>💡</span>
              <div>
                <span className={styles.metaLabel}>Cocok Untuk</span>
                <span className={styles.metaValue}>{product.suitable_for}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className={styles.notesSection}>
            <h3>Komposisi Wewangian</h3>
            <div className={styles.notesGrid}>
              <div className={styles.noteGroup}>
                <span className={styles.noteLabel}>🌿 Top Notes</span>
                <div className={styles.noteTags}>
                  {topNotes.map((n, i) => <NoteTag key={i} label={n} />)}
                </div>
              </div>
              <div className={styles.noteGroup}>
                <span className={styles.noteLabel}>🌸 Middle Notes</span>
                <div className={styles.noteTags}>
                  {middleNotes.map((n, i) => <NoteTag key={i} label={n} />)}
                </div>
              </div>
              <div className={styles.noteGroup}>
                <span className={styles.noteLabel}>🪵 Base Notes</span>
                <div className={styles.noteTags}>
                  {baseNotes.map((n, i) => <NoteTag key={i} label={n} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Qty & Actions */}
          <div className={styles.buySection}>
            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                id="qty-decrease"
              >−</button>
              <span className={styles.qtyNum}>{qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty((q) => q + 1)}
                id="qty-increase"
              >+</button>
            </div>

            <div className={styles.buyActions}>
              <button
                className={styles.addCartBtn}
                onClick={handleAddToCart}
                id="add-to-cart-detail"
              >
                🛍️ Tambah ke Keranjang
              </button>
              <button
                className={styles.buyNowBtn}
                onClick={handleBuyNow}
                id="buy-now-btn"
              >
                ✨ Beli Sekarang
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>✓ COD Tersedia</div>
            <div className={styles.trustItem}>✓ E-Wallet Diterima</div>
            <div className={styles.trustItem}>✓ Gratis Ongkir*</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
