'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

const STATUS_COLORS = {
  pending: '#F0C870',
  confirmed: '#80CBC4',
  shipped: '#90CAF9',
  delivered: '#A5D6A7',
  cancelled: '#EF9A9A',
};

const STATUS_LABELS = {
  pending: '⏳ Pending',
  confirmed: '✅ Dikonfirmasi',
  shipped: '🚚 Dikirim',
  delivered: '✓ Terkirim',
  cancelled: '✗ Dibatalkan',
};

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setOrders(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (orderId, order_status, payment_status) => {
    setUpdating(orderId);
    await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_status, payment_status }),
    });
    fetchOrders();
    setUpdating(null);
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.order_status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.order_status === 'pending').length,
    confirmed: orders.filter((o) => o.order_status === 'confirmed').length,
    revenue: orders.filter((o) => o.order_status !== 'cancelled').reduce((s, o) => s + parseFloat(o.total), 0),
  };

  return (
    <div className={styles.admin}>
      {/* Header */}
      <header className={styles.adminHeader}>
        <div className={styles.adminHeaderInner}>
          <div className={styles.adminLogo}>
            <span>MYKONOS</span>
            <em>Admin</em>
          </div>
          <nav className={styles.adminNav}>
            <Link href="/" target="_blank" className={styles.adminNavLink}>
              🏠 Lihat Website
            </Link>
          </nav>
        </div>
      </header>

      <div className={styles.adminBody}>
        <h1 className={styles.adminTitle}>Dashboard <em>Pesanan</em></h1>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📦</span>
            <div>
              <div className={styles.statNum}>{stats.total}</div>
              <div className={styles.statLabel}>Total Pesanan</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>⏳</span>
            <div>
              <div className={styles.statNum}>{stats.pending}</div>
              <div className={styles.statLabel}>Menunggu</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>✅</span>
            <div>
              <div className={styles.statNum}>{stats.confirmed}</div>
              <div className={styles.statLabel}>Dikonfirmasi</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>💰</span>
            <div>
              <div className={styles.statNum}>{formatPrice(stats.revenue)}</div>
              <div className={styles.statLabel}>Total Pendapatan</div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className={styles.filterBar}>
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Semua' : STATUS_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className={styles.loadingWrap}><div className="spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyMsg}>Tidak ada pesanan untuk kategori ini.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Kode Order</th>
                  <th>Pelanggan</th>
                  <th>Produk</th>
                  <th>Pembayaran</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className={styles.orderCode}>{order.order_code}</span>
                      <div className={styles.orderDate}>
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td>
                      <div className={styles.customerName}>{order.customer_name}</div>
                      <div className={styles.customerPhone}>{order.phone}</div>
                    </td>
                    <td className={styles.productsCell}>{order.products}</td>
                    <td>
                      <span className={styles.payBadge}>{order.payment_method?.toUpperCase()}</span>
                      <div className={`${styles.payStatus} ${order.payment_status === 'paid' ? styles.paid : ''}`}>
                        {order.payment_status === 'paid' ? '✓ Lunas' : '⏳ Belum Bayar'}
                      </div>
                    </td>
                    <td className={styles.totalCell}>{formatPrice(order.total)}</td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        style={{ background: STATUS_COLORS[order.order_status] + '40', color: '#333' }}
                      >
                        {STATUS_LABELS[order.order_status]}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        {order.order_status === 'pending' && (
                          <button
                            className={styles.actionBtn}
                            style={{ background: '#80CBC4' }}
                            onClick={() => handleStatusUpdate(order.id, 'confirmed', 'paid')}
                            disabled={updating === order.id}
                          >
                            ✅ Konfirmasi
                          </button>
                        )}
                        {order.order_status === 'confirmed' && (
                          <button
                            className={styles.actionBtn}
                            style={{ background: '#90CAF9' }}
                            onClick={() => handleStatusUpdate(order.id, 'shipped', 'paid')}
                            disabled={updating === order.id}
                          >
                            🚚 Kirim
                          </button>
                        )}
                        {order.order_status === 'shipped' && (
                          <button
                            className={styles.actionBtn}
                            style={{ background: '#A5D6A7' }}
                            onClick={() => handleStatusUpdate(order.id, 'delivered', 'paid')}
                            disabled={updating === order.id}
                          >
                            ✓ Selesai
                          </button>
                        )}
                        {order.order_status !== 'cancelled' && order.order_status !== 'delivered' && (
                          <button
                            className={styles.actionBtn}
                            style={{ background: '#EF9A9A' }}
                            onClick={() => handleStatusUpdate(order.id, 'cancelled', 'failed')}
                            disabled={updating === order.id}
                          >
                            ✗ Batalkan
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
