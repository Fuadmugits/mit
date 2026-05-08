import { query } from '@/lib/db';

const FALLBACK_PRODUCTS = [
  { id: 1, name: 'Mykonos Vanilla Clouds', slug: 'vanilla-clouds', price: 89000, sensation: 'Warm & Flirty', image: '/assets/vanilla-clouds.jpg', character: 'Sangat feminin (Wanita)', durability: '6–8 jam' },
  { id: 2, name: 'Mykonos Satin Blanc', slug: 'satin-blanc', price: 99000, sensation: 'Clean, Elegant, & Sophisticated', image: '/assets/satin-blanc.jpg', character: 'Unisex leaning Female', durability: '7–9 jam' },
  { id: 3, name: 'Mykonos Sparkling Rosé', slug: 'sparkling-rose', price: 89000, sensation: 'Fresh, Bright, & Sparkling', image: '/assets/sparkling-rose.jpg', character: 'Feminin (Wanita)', durability: '5–7 jam' },
  { id: 4, name: 'Mykonos Royal Ispahan', slug: 'royal-ispahan', price: 119000, sensation: 'Bold, Exotic, & Mysterious', image: '/assets/royal-ispahan.jpg', character: 'Unisex', durability: '10–12 jam+' },
];

export async function GET() {
  try {
    const products = await query(
      'SELECT * FROM products WHERE is_active = 1 ORDER BY id ASC'
    );
    
    // If database is empty, use fallback
    if (!products || products.length === 0) {
      return Response.json({ success: true, data: FALLBACK_PRODUCTS, fallback: true });
    }
    
    return Response.json({ success: true, data: products });
  } catch (error) {
    console.error('DB Error (using fallback):', error.code);
    return Response.json({ success: true, data: FALLBACK_PRODUCTS, fallback: true });
  }
}
