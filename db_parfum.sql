-- =============================================
-- DATABASE: db_parfum
-- Mykonos Parfum - Point of Sales System
-- =============================================

CREATE DATABASE IF NOT EXISTS db_parfum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_parfum;

-- ----------------------------
-- Table: products
-- ----------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `price` DECIMAL(12,2) NOT NULL,
  `description` TEXT,
  `sensation` VARCHAR(255),
  `character` VARCHAR(255),
  `durability` VARCHAR(255),
  `suitable_for` TEXT,
  `top_notes` VARCHAR(255),
  `middle_notes` VARCHAR(255),
  `base_notes` VARCHAR(255),
  `image` VARCHAR(255),
  `stock` INT DEFAULT 100,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------
-- Table: orders
-- ----------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) UNIQUE,
  `customer_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(100),
  `payment_method` ENUM('cod', 'gopay', 'ovo', 'dana') NOT NULL,
  `payment_status` ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  `order_status` ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  `total` DECIMAL(12,2) NOT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------
-- Table: order_items
-- ----------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(255),
  `qty` INT NOT NULL DEFAULT 1,
  `price` DECIMAL(12,2) NOT NULL,
  `subtotal` DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ----------------------------
-- Table: testimonials
-- ----------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `rating` TINYINT NOT NULL DEFAULT 5,
  `comment` TEXT NOT NULL,
  `product` VARCHAR(255),
  `avatar` VARCHAR(10) DEFAULT '🌸',
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------
-- Seed: Products
-- ----------------------------
INSERT INTO `products` (`name`, `slug`, `price`, `description`, `sensation`, `character`, `durability`, `suitable_for`, `top_notes`, `middle_notes`, `base_notes`, `image`) VALUES
(
  'Mykonos Vanilla Clouds',
  'vanilla-clouds',
  89000,
  'The ultimate tempting, velvety vanilla fragrance, a staple in every girl''s wardrobe. Perpaduan gourmand vanilla dengan marshmallow yang manis dan musk yang segar, menghadirkan nuansa hangat dan nyaman, seolah kamu sedang melayang di antara awan yang paling lembut.',
  'Warm & Flirty',
  'Sangat feminin (Wanita)',
  '6–8 jam (tergantung aktivitas)',
  'Kamu yang suka tampil manis, menggemaskan, dan ingin memberikan kesan huggable.',
  'Vanilla, heliotrope, white floral accord',
  'Vanilla, marshmallow, iris',
  'Caramel, white musk, vanilla',
  '/assets/vanilla-clouds.jpg'
),
(
  'Mykonos Satin Blanc',
  'satin-blanc',
  99000,
  'Wewangian yang memancarkan aura kemewahan yang murni dan bersih. Satin Blanc menggabungkan kelembutan bunga putih dengan sentuhan apel segar dan amber yang hangat. Wanginya memberikan kesan selembut kain satin yang menyentuh kulit, memberikan efek clean-girl aesthetic yang sangat berkelas.',
  'Clean, Elegant, & Sophisticated',
  'Feminin, namun bisa digunakan pria yang suka aroma clean (Unisex leaning Female)',
  '7–9 jam',
  'Wanita karir atau mahasiswi yang ingin terlihat rapi, profesional, dan "mahal".',
  'Bergamot, Apple, Green Tea',
  'White Floral, Jasmine, Magnolia',
  'Amber, Musk, Vanilla',
  '/assets/satin-blanc.jpg'
),
(
  'Mykonos Sparkling Rosé',
  'sparkling-rose',
  89000,
  'Deskripsi dari sebuah kegembiraan dalam botol. Sparkling Rosé adalah aroma mawar yang modern, segar, dan bercahaya. Bayangkan mawar merah yang baru mekar terkena tetesan embun pagi dan percikan buah-buahan asam yang segar. Sangat energik dan memberikan kesan ceria bagi siapa pun yang menciumnya.',
  'Fresh, Bright, & Sparkling',
  'Feminin (Wanita)',
  '5–7 jam',
  'Kamu yang berkepribadian ceria, suka pesta kebun, atau ingin aroma bunga yang tidak membuat pusing.',
  'Damask Rose, Orange, Red Berries',
  'Rose, Jasmine, Geranium',
  'Patchouli, Musk, Amber',
  '/assets/sparkling-rose.jpg'
),
(
  'Mykonos Royal Ispahan',
  'royal-ispahan',
  119000,
  'Sebuah mahakarya yang terinspirasi dari kemegahan istana Timur Tengah. Royal Ispahan adalah perpaduan berani antara mawar yang intens, saffron yang eksotis, dan oud yang memberikan kedalaman aroma yang misterius. Ini adalah aroma yang meninggalkan jejak kuat (sillage) dan menunjukkan dominasi.',
  'Bold, Exotic, & Mysterious',
  'Unisex (Bisa untuk Wanita maupun Pria)',
  'Sangat tahan lama, 10–12 jam+',
  'Acara formal malam hari atau special date di mana kamu ingin menjadi pusat perhatian.',
  'Saffron, Berry, Blackcurrant',
  'Rose, Jasmine, Floral Notes',
  'Oud, Amber, Musk, Vanilla',
  '/assets/royal-ispahan.jpg'
);

-- ----------------------------
-- Seed: Testimonials
-- ----------------------------
INSERT INTO `testimonials` (`name`, `rating`, `comment`, `product`, `avatar`) VALUES
('Siti Rahayu', 5, 'Wanginya bikin nagih banget! Vanilla Clouds tuh literally smells like a warm hug. Udah beli 3x dan nggak ada niat berhenti 💕', 'Vanilla Clouds', '🌸'),
('Putri Maharani', 5, 'Satin Blanc cocok banget buat ke kantor. Wanginya elegan, nggak overwhelming, dan tahan lama banget. Banyak yang nanya parfum apa yang aku pake!', 'Satin Blanc', '✨'),
('Dewi Kusuma', 5, 'Sparkling Rosé vibesnya summer banget! Segar, ceria, dan bikin mood langsung happy. Perfect buat hangout!', 'Sparkling Rosé', '🌹'),
('Amanda Fitri', 5, 'Royal Ispahan is THE ONE. Wanginya mewah banget, berasa kayak lagi di luxury hotel. Sillage-nya kuat, banyak yang compliment!', 'Royal Ispahan', '👑'),
('Nadia Santoso', 5, 'Packaging cantik, wangi tahan lama, harga terjangkau. Mykonos emang nggak pernah mengecewakan! Highly recommend buat semua perempuan.', 'Vanilla Clouds', '🌺'),
('Risa Wulandari', 4, 'Satin Blanc bikin aku keliatan lebih classy dan profesional. Teman-teman di kantor langsung notice dan minta tau merknya haha', 'Satin Blanc', '💼');
