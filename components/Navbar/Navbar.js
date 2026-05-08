'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/cartStore';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCartStore((s) => s.getCount());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {!scrolled && (
        <div className={styles.promoBar}>
          <span>✨ Gratis Ongkir ke Seluruh Indonesia • Gunakan Kode: <strong>MYKFREE</strong> ✨</span>
        </div>
      )}
      <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>MYKONOS</span>
          <span className={styles.logoCursive}>Parfum</span>
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><Link href="/#products" onClick={() => setMenuOpen(false)}>Produk</Link></li>
          <li><Link href="/#benefits" onClick={() => setMenuOpen(false)}>Manfaat</Link></li>
          <li><Link href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimoni</Link></li>
          <li><Link href="/#contact" onClick={() => setMenuOpen(false)}>Kontak</Link></li>
        </ul>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartBtn} id="cart-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && <span className={styles.cartBadge}>{count}</span>}
          </Link>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? styles.cross : ''}></span>
            <span className={menuOpen ? styles.crossHide : ''}></span>
            <span className={menuOpen ? styles.cross2 : ''}></span>
          </button>
        </div>
      </div>
      </nav>
    </header>
  );
}
