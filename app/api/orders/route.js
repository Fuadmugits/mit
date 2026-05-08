import { query } from '@/lib/db';
import { generateOrderCode } from '@/lib/utils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer_name, phone, address, city, payment_method, notes, items, total } = body;

    if (!customer_name || !phone || !address || !payment_method || !items?.length) {
      return Response.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 });
    }

    const orderCode = generateOrderCode();

    // Insert order
    const result = await query(
      `INSERT INTO orders (order_code, customer_name, phone, address, city, payment_method, total, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderCode, customer_name, phone, address, city || '', payment_method, total, notes || '']
    );

    const orderId = result.insertId;

    // Insert order items
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, product_name, qty, price, subtotal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.id, item.name, item.qty, item.price, item.price * item.qty]
      );
    }

    return Response.json({
      success: true,
      data: { id: orderId, order_code: orderCode, payment_method },
    });
  } catch (error) {
    console.error('Order Error:', error);
    return Response.json({ success: false, error: 'Gagal membuat pesanan' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await query(
      `SELECT o.*, GROUP_CONCAT(oi.product_name SEPARATOR ', ') as products
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       GROUP BY o.id
       ORDER BY o.created_at DESC`
    );
    return Response.json({ success: true, data: orders });
  } catch (error) {
    console.error('DB Error:', error);
    return Response.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}
