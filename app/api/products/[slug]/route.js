import { query } from '@/lib/db';

const FALLBACK_PRODUCTS = {
  'vanilla-clouds': { id: 1, name: 'Mykonos Vanilla Clouds', slug: 'vanilla-clouds', price: 89000, description: "The ultimate tempting, velvety vanilla fragrance, a staple in every girl's wardrobe. Perpaduan gourmand vanilla dengan marshmallow yang manis dan musk yang segar, menghadirkan nuansa hangat dan nyaman, seolah kamu sedang melayang di antara awan yang paling lembut.", sensation: 'Warm & Flirty', character: 'Sangat feminin (Wanita)', durability: '6–8 jam (tergantung aktivitas)', suitable_for: 'Kamu yang suka tampil manis, menggemaskan, dan ingin memberikan kesan huggable.', top_notes: 'Vanilla, heliotrope, white floral accord', middle_notes: 'Vanilla, marshmallow, iris', base_notes: 'Caramel, white musk, vanilla', image: '/assets/vanilla-clouds.jpg' },
  'satin-blanc': { id: 2, name: 'Mykonos Satin Blanc', slug: 'satin-blanc', price: 99000, description: 'Wewangian yang memancarkan aura kemewahan yang murni dan bersih. Satin Blanc menggabungkan kelembutan bunga putih dengan sentuhan apel segar dan amber yang hangat. Wanginya memberikan kesan selembut kain satin yang menyentuh kulit, memberikan efek clean-girl aesthetic yang sangat berkelas.', sensation: 'Clean, Elegant, & Sophisticated', character: 'Feminin, namun bisa digunakan pria yang suka aroma clean (Unisex leaning Female)', durability: '7–9 jam', suitable_for: 'Wanita karir atau mahasiswi yang ingin terlihat rapi, profesional, dan "mahal".', top_notes: 'Bergamot, Apple, Green Tea', middle_notes: 'White Floral, Jasmine, Magnolia', base_notes: 'Amber, Musk, Vanilla', image: '/assets/satin-blanc.jpg' },
  'sparkling-rose': { id: 3, name: 'Mykonos Sparkling Rosé', slug: 'sparkling-rose', price: 89000, description: 'Deskripsi dari sebuah kegembiraan dalam botol. Sparkling Rosé adalah aroma mawar yang modern, segar, dan bercahaya. Bayangkan mawar merah yang baru mekar terkena tetesan embun pagi dan percikan buah-buahan asam yang segar.', sensation: 'Fresh, Bright, & Sparkling', character: 'Feminin (Wanita)', durability: '5–7 jam', suitable_for: 'Kamu yang berkepribadian ceria, suka pesta kebun, atau ingin aroma bunga yang tidak membuat pusing.', top_notes: 'Damask Rose, Orange, Red Berries', middle_notes: 'Rose, Jasmine, Geranium', base_notes: 'Patchouli, Musk, Amber', image: '/assets/sparkling-rose.jpg' },
  'royal-ispahan': { id: 4, name: 'Mykonos Royal Ispahan', slug: 'royal-ispahan', price: 119000, description: 'Sebuah mahakarya yang terinspirasi dari kemegahan istana Timur Tengah. Royal Ispahan adalah perpaduan berani antara mawar yang intens, saffron yang eksotis, dan oud yang memberikan kedalaman aroma yang misterius.', sensation: 'Bold, Exotic, & Mysterious', character: 'Unisex (Bisa untuk Wanita maupun Pria)', durability: 'Sangat tahan lama, 10–12 jam+', suitable_for: 'Acara formal malam hari atau special date di mana kamu ingin menjadi pusat perhatian.', top_notes: 'Saffron, Berry, Blackcurrant', middle_notes: 'Rose, Jasmine, Floral Notes', base_notes: 'Oud, Amber, Musk, Vanilla', image: '/assets/royal-ispahan.jpg' },
};

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const products = await query(
      'SELECT * FROM products WHERE slug = ? AND is_active = 1',
      [slug]
    );
    if (products.length === 0) {
      return Response.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ success: true, data: products[0] });
  } catch (error) {
    const { slug } = await params;
    console.error('DB Error (using fallback):', error.code);
    const fallback = FALLBACK_PRODUCTS[slug];
    if (fallback) return Response.json({ success: true, data: fallback, fallback: true });
    return Response.json({ success: false, error: 'Product not found' }, { status: 404 });
  }
}
