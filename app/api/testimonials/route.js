import { query } from '@/lib/db';

const FALLBACK_TESTIMONIALS = [
  { id: 1, name: 'Siti Rahayu', rating: 5, comment: 'Wanginya bikin nagih banget! Vanilla Clouds tuh literally smells like a warm hug. Udah beli 3x dan nggak ada niat berhenti 💕', product: 'Vanilla Clouds', avatar: '🌸' },
  { id: 2, name: 'Putri Maharani', rating: 5, comment: 'Satin Blanc cocok banget buat ke kantor. Wanginya elegan, nggak overwhelming, dan tahan lama banget. Banyak yang nanya parfum apa yang aku pake!', product: 'Satin Blanc', avatar: '✨' },
  { id: 3, name: 'Dewi Kusuma', rating: 5, comment: 'Sparkling Rosé vibesnya summer banget! Segar, ceria, dan bikin mood langsung happy. Perfect buat hangout!', product: 'Sparkling Rosé', avatar: '🌹' },
  { id: 4, name: 'Amanda Fitri', rating: 5, comment: 'Royal Ispahan is THE ONE. Wanginya mewah banget, berasa kayak lagi di luxury hotel. Sillage-nya kuat, banyak yang compliment!', product: 'Royal Ispahan', avatar: '👑' },
  { id: 5, name: 'Nadia Santoso', rating: 5, comment: 'Packaging cantik, wangi tahan lama, harga terjangkau. Mykonos emang nggak pernah mengecewakan! Highly recommend buat semua perempuan.', product: 'Vanilla Clouds', avatar: '🌺' },
  { id: 6, name: 'Risa Wulandari', rating: 4, comment: 'Satin Blanc bikin aku keliatan lebih classy dan profesional. Teman-teman di kantor langsung notice dan minta tau merknya haha', product: 'Satin Blanc', avatar: '💼' },
];

export async function GET() {
  try {
    const testimonials = await query(
      'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY id ASC'
    );
    
    // If database is empty, use fallback
    if (!testimonials || testimonials.length === 0) {
      return Response.json({ success: true, data: FALLBACK_TESTIMONIALS, fallback: true });
    }
    
    return Response.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('DB Error (using fallback):', error.code);
    return Response.json({ success: true, data: FALLBACK_TESTIMONIALS, fallback: true });
  }
}
