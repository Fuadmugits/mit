import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.floralBg}></div>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoText}>MYKONOS</span>
            <span className={styles.logoCursive}>Parfum</span>
          </div>
          <p className={styles.tagline}>
            Setiap wewangian menceritakan sebuah kisah.<br />
            Apa kisah milikmu?
          </p>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/officialmykonos?igsh=ZXBxajF0M3ozMGQ5"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              id="instagram-link"
              aria-label="Instagram Mykonos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@mykonosofficial?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              id="tiktok-link"
              aria-label="TikTok Mykonos"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.12z"/>
              </svg>
              TikTok
            </a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Navigasi</h4>
            <ul>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/#products">Produk</Link></li>
              <li><Link href="/#benefits">Manfaat</Link></li>
              <li><Link href="/#testimonials">Testimoni</Link></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h4>Transaksi</h4>
            <ul>
              <li><Link href="/cart">Keranjang</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
              <li><span className={styles.info}>COD Tersedia ✓</span></li>
              <li><span className={styles.info}>E-Wallet Tersedia ✓</span></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h4>Hubungi Kami</h4>
            <ul>
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 WhatsApp
                </a>
              </li>
              <li><a href="https://www.instagram.com/officialmykonos?igsh=ZXBxajF0M3ozMGQ5" target="_blank" rel="noopener noreferrer">📸 Instagram</a></li>
              <li><a href="https://www.tiktok.com/@mykonosofficial?lang=en" target="_blank" rel="noopener noreferrer">🎵 TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.dividerLine}></div>
        <p>© 2026 Mykonos Parfum. All rights reserved. Made with 🌸 for every woman.</p>
      </div>
    </footer>
  );
}
