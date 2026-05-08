'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCartStore } from '@/lib/cartStore';
import { formatPrice } from '@/lib/utils';
import { useScrollReveal } from '@/lib/useScrollReveal';
import styles from './page.module.css';

// Toast notification component
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return <div className="toast">🌸 {message}</div>;
}

// Product Card Component
function ProductCard({ product, index }) {
  const addItem = useCartStore((s) => s.addItem);
  const [toast, setToast] = useState(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      slug: product.slug,
    });
    setToast(`${product.name} ditambahkan!`);
  };

  const delayClass = `reveal-delay-${Math.min(index + 1, 6)}`;

  return (
    <>
      <Link
        href={`/products/${product.slug}`}
        className={`${styles.productCard} reveal ${delayClass}`}
        id={`product-${product.slug}`}
      >
        <div className={styles.productImageWrap}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.productOverlay}>
            <span className={styles.viewDetail}>Lihat Detail ↗</span>
          </div>
          {product.slug === 'royal-ispahan' && (
            <span className={styles.bestseller}>Best Seller</span>
          )}
          {product.slug === 'vanilla-clouds' && (
            <span className={styles.bestseller}>Favorit</span>
          )}
        </div>
        <div className={styles.productBody}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productSensation}>✦ {product.sensation}</p>
          <p className={styles.productPrice}>{formatPrice(product.price)}</p>
          <button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            id={`add-to-cart-${product.slug}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Tambah ke Keranjang
          </button>
        </div>
      </Link>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}

// Benefits Section
function BenefitsSection() {
  const sectionRef = useScrollReveal();
  const benefits = [
    { icon: '🌸', title: 'Bahan Premium', desc: 'Diformulasikan dengan bahan-bahan pilihan berkualitas tinggi dari seluruh dunia.' },
    { icon: '⏳', title: 'Long-Lasting', desc: 'Ketahanan wewangian hingga 12 jam agar kamu tetap wangi sepanjang hari.' },
    { icon: '💧', title: 'Alcohol-Friendly', desc: 'Aman untuk kulit sensitif dengan formula yang lembut dan tidak iritatif.' },
    { icon: '✨', title: 'Eksklusif & Unik', desc: 'Setiap varian memiliki karakter unik yang disesuaikan dengan berbagai kepribadian.' },
    { icon: '🌿', title: 'Cruelty Free', desc: 'Tidak diuji pada hewan. Mykonos berkomitmen pada produk yang etis dan bertanggung jawab.' },
    { icon: '🎁', title: 'Packaging Cantik', desc: 'Kemasan premium siap sebagai hadiah istimewa untuk orang-orang terkasih.' },
  ];

  return (
    <section className={styles.benefitsSection} id="benefits" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} reveal`}>
          <span className="section-badge">Mengapa Mykonos?</span>
          <h2 className="section-title">Keunggulan <em>Kami</em></h2>
          <p className="section-subtitle">
            Mykonos bukan sekadar parfum — ini adalah ekspresi diri yang paling jujur,
            dibalut dalam setiap tetes wewangian eksklusif kami.
          </p>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`${styles.benefitCard} reveal reveal-delay-${i + 1}`}
            >
              <div className={styles.benefitIcon}>{b.icon}</div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const sectionRef = useScrollReveal({}, [testimonials]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((d) => { if (d.success) setTestimonials(d.data); });
  }, []);

  return (
    <section className={styles.testimonialsSection} id="testimonials" ref={sectionRef}>
      <div className={styles.testimonialsBg}></div>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} reveal`}>
          <span className="section-badge">Kata Mereka</span>
          <h2 className="section-title">Ribuan Wanita <em>Mempercayai Kami</em></h2>
          <p className="section-subtitle">
            Bergabunglah bersama ribuan perempuan yang telah menemukan wewangian sempurna mereka.
          </p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`${styles.testimonialCard} reveal reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}>{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <p className={styles.testimonialProduct}>— {t.product}</p>
                </div>
              </div>
              <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className={styles.testimonialComment}>"{t.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Category Section
function CategorySection() {
  const sectionRef = useScrollReveal();
  const categories = [
    { title: 'Sweet & Warm', desc: 'Sentuhan vanilla dan amber yang menenangkan.', color: '#F4C6B8' },
    { title: 'Fresh & Airy', desc: 'Aroma laut dan citrus yang menyegarkan hari.', color: '#C8967E' },
    { title: 'Bold & Elegant', desc: 'Karakter oud dan rose yang penuh kemewahan.', color: '#8B5E6E' },
  ];

  return (
    <section className={styles.categorySection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.categoryGrid}>
          {categories.map((cat, i) => (
            <div key={i} className={`${styles.categoryCard} reveal reveal-delay-${i + 1}`}>
              <div className={styles.categoryCircle} style={{ background: cat.color }}></div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const sectionRef = useScrollReveal();

  return (
    <section className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.ctaBg}></div>
      <div className={`${styles.ctaContent} reveal`}>
        <span className="section-badge">Penawaran Terbatas</span>
        <h2 className={styles.ctaTitle}>Temukan Wewangian<br /><em>Sempurna Milikmu</em></h2>
        <p className={styles.ctaDesc}>
          Gratis ongkos kirim untuk pembelian pertama! Gunakan kode <strong>MYKFIRST</strong>
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/#products" className="btn-primary">
            <span>🛍️ Belanja Sekarang</span>
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Mykonos!%20Saya%20ingin%20bertanya%20tentang%20produk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            id="wa-cta-link"
          >
            💬 Tanya via WhatsApp
          </a>
        </div>
        <div className={styles.ctaSocials}>
          <a href="https://www.instagram.com/officialmykonos?igsh=ZXBxajF0M3ozMGQ5" target="_blank" rel="noopener noreferrer" id="cta-instagram">
            📸 @officialmykonos
          </a>
          <span>•</span>
          <a href="https://www.tiktok.com/@mykonosofficial?lang=en" target="_blank" rel="noopener noreferrer" id="cta-tiktok">
            🎵 @mykonosofficial
          </a>
        </div>
      </div>
    </section>
  );
}


// About Section
function AboutSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={`${styles.aboutImage} reveal`}>
            <Image
              src="/assets/vanilla-clouds.jpg"
              alt="Mykonos Process"
              width={500}
              height={600}
              style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
            />
          </div>
          <div className={`${styles.aboutText} reveal reveal-delay-2`}>
            <span className="section-badge">Our Story</span>
            <h2 className="section-title">The Art of <em>Perfection</em></h2>
            <p>
              Mykonos lahir dari keinginan untuk membawa kemewahan wewangian kelas dunia ke tangan setiap orang.
              Kami percaya bahwa parfum bukan hanya sekadar aroma, melainkan identitas yang melekat pada setiap momen berharga.
            </p>
            <p>
              Setiap botol Mykonos dirancang melalui proses kurasi bahan terbaik, memastikan ketahanan dan karakter yang unik
              yang tidak akan Anda temukan di tempat lain.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.aboutFeature}>
                <span>300+</span>
                <p>Uji Coba Formula</p>
              </div>
              <div className={styles.aboutFeature}>
                <span>100%</span>
                <p>Pure Essence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  return (
    <section className={styles.newsletterSection}>
      <div className={styles.container}>
        <div className={styles.newsletterCard}>
          <div className={styles.newsletterInfo}>
            <h3>Dapatkan Info Promo Eksklusif</h3>
            <p>Berlangganan newsletter kami dan dapatkan diskon 10% untuk pesanan berikutnya.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Alamat email Anda..." required />
            <button type="submit">Berlangganan</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsSectionRef = useScrollReveal({}, [products]);
  const videoSectionRef = useScrollReveal();

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          src="/assets/hero-video.mp4"
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>✦ Extrait de Parfum ✦</div>
          <h1 className={styles.heroTitle}>
            <span>MYKONOS</span>
            <em>Parfum</em>
          </h1>
          <p className={styles.heroSubtitle}>
            Temukan wewangian yang menceritakan kisahmu.<br />
            Mewah. Tahan Lama. Tak Terlupakan.
          </p>
          <div className={styles.heroActions}>
            <Link href="/#products" className="btn-primary" id="hero-shop-btn">
              <span>✦ Jelajahi Koleksi</span>
            </Link>
            <Link href="/#benefits" className="btn-ghost">
              Pelajari Lebih Lanjut
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>10K+</span>
              <span className={styles.statLabel}>Pelanggan Puas</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>Varian Eksklusif</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNum}>12H+</span>
              <span className={styles.statLabel}>Ketahanan Parfum</span>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot}></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <CategorySection />

      {/* PRODUCTS SECTION */}
      <section className={styles.productsSection} id="products" ref={productsSectionRef}>
        <div className={styles.container}>
          {/* Section header with reveal animation */}
          <div className={`${styles.sectionHeader} reveal`}>
            <span className="section-badge">Koleksi Kami</span>
            <h2 className="section-title">Pilihan <em>Wewangian</em></h2>
            <p className="section-subtitle">
              Setiap varian Mykonos adalah sebuah perjalanan aroma yang dirancang
              untuk menemani setiap momen hidupmu.
            </p>
          </div>

          {loading ? (
            <div className={styles.loadingWrap}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}

          <div className={`${styles.productsCTA} reveal`}>
            <Link href="/cart" className="btn-secondary" id="view-cart-btn">
              Lihat Keranjang →
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <BenefitsSection />

      {/* VIDEO SHOWCASE */}
      <section className={styles.videoShowcase} ref={videoSectionRef}>
        <video
          className={styles.showcaseVideo}
          autoPlay
          muted
          loop
          playsInline
          src="/assets/hero-video-2.mp4"
        />
        <div className={styles.showcaseOverlay}>
          <h2 className={`${styles.showcaseTitle} reveal`}>The Art of <em>Fragrance</em></h2>
          <p className="reveal reveal-delay-1">Setiap tetes adalah sebuah mahakarya</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />

      {/* ABOUT */}
      <AboutSection />

      {/* NEWSLETTER */}
      <NewsletterSection />

      <Footer />
    </>
  );
}
