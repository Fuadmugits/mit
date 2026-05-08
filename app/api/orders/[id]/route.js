import { query } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const orders = await query('SELECT * FROM orders WHERE id = ?', [id]);
    if (orders.length === 0) {
      return Response.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    const items = await query('SELECT * FROM order_items WHERE order_id = ?', [id]);
    return Response.json({ success: true, data: { ...orders[0], items } });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { order_status, payment_status } = await request.json();
    await query(
      'UPDATE orders SET order_status = ?, payment_status = ? WHERE id = ?',
      [order_status, payment_status, id]
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
