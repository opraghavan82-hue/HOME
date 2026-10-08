/* ==========================================================================
   ZENVORA PRO & OWNER ADMIN PANEL - JAVASCRIPT CORE ENGINE
   Engineered for seamless e-commerce browsing & exclusive backoffice control
   ========================================================================== */
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB7UTQIR6A7yFaPMESTIReUgbnOmELyuZw",
    authDomain: "zenvora-af958.firebaseapp.com",
    projectId: "zenvora-af958",
    storageBucket: "zenvora-af958.firebasestorage.app",
    messagingSenderId: "804069260886",
    appId: "1:804069260886:web:1ed318047932f73f4d05f7",
    measurementId: "G-DM14X2J1Y3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
(function () {
  'use strict';

  // ===== UTILITY HELPERS =====
  const $ = id => document.getElementById(id);
  const IC = (n, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const money = n => '₹' + Number(n).toLocaleString('en-IN');
  const offPercent = (price, mrp) => Math.round((1 - price / mrp) * 100);

  const store = {
    get(key, fallback) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.error('Storage get error:', e);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Storage set error:', e);
        return false;
      }
    }
  };

  // Helper for Unsplash curated product images
  const unsplashImg = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

  // ===== DEFAULT ZENVORA CATALOG (16 Premium Items) =====
  const DEFAULT_PRODUCTS = [
    {
      id: 1,
      name: "Apple iPhone 15 (Blue, 128 GB)",
      category: "Mobiles",
      brand: "Apple",
      price: 69999,
      mrp: 79900,
      stock: 45,
      rating: 4.6,
      reviewsCount: 32410,
      image: unsplashImg("photo-1695048133142-1a20484428d0"),
      images: [unsplashImg("photo-1695048133142-1a20484428d0"), unsplashImg("photo-1592890288564-76628a0b0506")],
      assured: true,
      badge: "Best Seller",
      desc: "Dynamic Island, 48MP Main camera with 2x Telephoto, USB-C and all-day battery in aerospace-grade aluminum.",
      specs: { "Display": "6.1-inch Super Retina XDR OLED", "Chip": "A16 Bionic", "Camera": "48MP Dual Rear", "Battery": "Up to 20 hours video", "Warranty": "1 Year Apple" }
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 5G (Onyx Black, 256 GB)",
      category: "Mobiles",
      brand: "Samsung",
      price: 74999,
      mrp: 89999,
      stock: 32,
      rating: 4.5,
      reviewsCount: 18750,
      image: unsplashImg("photo-1610945415295-d9bbf067e59c"),
      images: [unsplashImg("photo-1610945415295-d9bbf067e59c")],
      assured: true,
      badge: "Flagship",
      desc: "Galaxy AI smartphone with stunning display, pro-grade camera and all-day intelligent battery.",
      specs: { "Display": "6.2-inch Dynamic AMOLED 2X", "Chip": "Snapdragon 8 Gen 3", "Camera": "50MP Triple", "Battery": "4000 mAh", "Warranty": "1 Year" }
    },
    {
      id: 3,
      name: "OnePlus 12 5G (Flowy Emerald, 16GB + 512GB)",
      category: "Mobiles",
      brand: "OnePlus",
      price: 64999,
      mrp: 69999,
      stock: 28,
      rating: 4.7,
      reviewsCount: 15300,
      image: unsplashImg("photo-1592890288564-76628a0b0506"),
      images: [unsplashImg("photo-1592890288564-76628a0b0506")],
      assured: true,
      badge: "Flagship",
      desc: "Snapdragon 8 Gen 3, Hasselblad cameras, 2K 120Hz display and 100W SUPERVOOC charging.",
      specs: { "Display": "6.82-inch 2K 120Hz AMOLED", "Chip": "Snapdragon 8 Gen 3", "Camera": "50MP Hasselblad", "Battery": "5400 mAh 100W", "Warranty": "1 Year" }
    },
    {
      id: 4,
      name: "Redmi Note 13 Pro 5G (Coral Purple, 8GB + 256GB)",
      category: "Mobiles",
      brand: "Redmi",
      price: 25999,
      mrp: 29999,
      stock: 60,
      rating: 4.3,
      reviewsCount: 42100,
      image: unsplashImg("photo-1511707171634-5f897ff02aa9"),
      images: [unsplashImg("photo-1511707171634-5f897ff02aa9")],
      assured: true,
      badge: "Value Pick",
      desc: "200MP camera, AMOLED 120Hz display and fast charging at a mid-range price.",
      specs: { "Display": "6.67-inch AMOLED 120Hz", "Chip": "Snapdragon 7s Gen 2", "Camera": "200MP", "Battery": "5100 mAh 67W", "Warranty": "1 Year" }
    },
    {
      id: 5,
      name: "Apple MacBook Air M2 (13.6-inch, 8GB, 256GB)",
      category: "Electronics",
      brand: "Apple",
      price: 89990,
      mrp: 114900,
      stock: 22,
      rating: 4.7,
      reviewsCount: 18920,
      image: unsplashImg("photo-1517336714731-489689fd1ca8"),
      images: [unsplashImg("photo-1517336714731-489689fd1ca8"), unsplashImg("photo-1496181133206-80ce9b88a853")],
      assured: true,
      badge: "Top Rated",
      desc: "Strikingly thin MacBook Air with M2 chip, Liquid Retina display and all-day battery.",
      specs: { "Screen": "13.6-inch Liquid Retina", "Chip": "Apple M2", "Memory": "8GB Unified / 256GB SSD", "Battery": "Up to 18 hours", "Warranty": "1 Year" }
    },
    {
      id: 6,
      name: "Sony WH-1000XM5 Wireless ANC Headphones",
      category: "Electronics",
      brand: "Sony",
      price: 26990,
      mrp: 34990,
      stock: 35,
      rating: 4.8,
      reviewsCount: 14120,
      image: unsplashImg("photo-1505740420928-5e560c06d30e"),
      images: [unsplashImg("photo-1505740420928-5e560c06d30e"), unsplashImg("photo-1484704849700-f032a568e944")],
      assured: true,
      badge: "Super Deal",
      desc: "Industry-leading noise cancellation with 30-hour battery and multipoint Bluetooth.",
      specs: { "Driver": "30mm", "Battery": "30 hours", "Connectivity": "Bluetooth 5.2", "ANC": "Yes", "Warranty": "1 Year" }
    },
    {
      id: 7,
      name: "Sony PlayStation 5 DualSense Controller (Midnight Black)",
      category: "Electronics",
      brand: "Sony",
      price: 5299,
      mrp: 6390,
      stock: 45,
      rating: 4.8,
      reviewsCount: 28400,
      image: unsplashImg("photo-1606144042614-b2417e99c4e3"),
      images: [unsplashImg("photo-1606144042614-b2417e99c4e3")],
      assured: true,
      badge: "Gaming",
      desc: "Haptic feedback, adaptive triggers and built-in mic for immersive PS5 gaming.",
      specs: { "Haptics": "Dual actuators", "Triggers": "Adaptive", "Battery": "USB-C rechargeable", "Compatibility": "PS5 / PC", "Warranty": "1 Year" }
    },
    {
      id: 8,
      name: "boAt Airdopes 141 True Wireless Earbuds",
      category: "Electronics",
      brand: "boAt",
      price: 999,
      mrp: 4490,
      stock: 120,
      rating: 4.1,
      reviewsCount: 156000,
      image: unsplashImg("photo-1590658268037-6bf12165a8df"),
      images: [unsplashImg("photo-1590658268037-6bf12165a8df")],
      assured: true,
      badge: "Best Seller",
      desc: "42 hours playback, IPX4 sweat resistance and immersive boAt Signature Sound.",
      specs: { "Playback": "42 hours", "Driver": "8mm", "Bluetooth": "5.1", "Water": "IPX4", "Warranty": "1 Year" }
    },
    {
      id: 9,
      name: "JBL Flip 6 Portable Bluetooth Speaker",
      category: "Electronics",
      brand: "JBL",
      price: 9999,
      mrp: 12999,
      stock: 40,
      rating: 4.6,
      reviewsCount: 9800,
      image: unsplashImg("photo-1608043152269-423dbba4e7e1"),
      images: [unsplashImg("photo-1608043152269-423dbba4e7e1")],
      assured: true,
      badge: "Party Ready",
      desc: "Bold JBL Original Pro Sound, IP67 waterproof and 12 hours of playtime.",
      specs: { "Sound": "Bold Pro Sound", "Battery": "12 hours", "Waterproof": "IP67", "Powerbank": "Yes", "Warranty": "1 Year" }
    },
    {
      id: 10,
      name: "Samsung 55-inch Crystal 4K Ultra HD Smart TV",
      category: "TV & Appliances",
      brand: "Samsung",
      price: 43990,
      mrp: 68900,
      stock: 15,
      rating: 4.4,
      reviewsCount: 9480,
      image: unsplashImg("photo-1593359677879-a4bb92f829d1"),
      images: [unsplashImg("photo-1593359677879-a4bb92f829d1")],
      assured: true,
      badge: "Mega Deal",
      desc: "Crystal Processor 4K, PurColor, Motion Xcelerator and smart Tizen OS.",
      specs: { "Resolution": "4K UHD", "Sound": "20W", "OS": "Tizen", "Refresh": "50Hz", "Warranty": "1 Year + Panel" }
    },
    {
      id: 11,
      name: "LG 7 kg 5 Star Inverter Fully-Automatic Top Load Washing Machine",
      category: "TV & Appliances",
      brand: "LG",
      price: 16490,
      mrp: 21990,
      stock: 18,
      rating: 4.3,
      reviewsCount: 22100,
      image: unsplashImg("photo-1626806787461-608ceaae1f7a"),
      images: [unsplashImg("photo-1626806787461-608ceaae1f7a")],
      assured: true,
      badge: "Energy Saver",
      desc: "Smart Inverter technology, TurboDrum and 5-star energy rating for efficient washes.",
      specs: { "Capacity": "7 kg", "Type": "Fully Automatic Top Load", "Energy": "5 Star", "Motor": "Smart Inverter", "Warranty": "2 Years + 10 Motor" }
    },
    {
      id: 12,
      name: "Philips 750W Mixer Grinder with 4 Jars",
      category: "TV & Appliances",
      brand: "Philips",
      price: 3499,
      mrp: 5999,
      stock: 25,
      rating: 4.4,
      reviewsCount: 16750,
      image: unsplashImg("photo-1585515320310-25999524e4cf"),
      images: [unsplashImg("photo-1585515320310-25999524e4cf")],
      assured: true,
      badge: "Hot Deal",
      desc: "Powerful 750W motor with stainless steel blades for grinding, blending and pureeing.",
      specs: { "Power": "750W", "Jars": "4 Multi-utility", "Speeds": "3 + Pulse", "Body": "ABS", "Warranty": "2 Years + 5 Motor" }
    },
    {
      id: 13,
      name: "Prestige Iris 750W Electric Kettle",
      category: "TV & Appliances",
      brand: "Prestige",
      price: 999,
      mrp: 1495,
      stock: 80,
      rating: 4.2,
      reviewsCount: 45000,
      image: unsplashImg("photo-1565453816113-ce2032f0c1a6"),
      images: [unsplashImg("photo-1565453816113-ce2032f0c1a6")],
      assured: true,
      badge: "Kitchen Essential",
      desc: "Stainless steel body, auto shut-off and 1.5 litre capacity for quick boiling.",
      specs: { "Capacity": "1.5 L", "Power": "750W", "Body": "SS", "Auto Shut-off": "Yes", "Warranty": "1 Year" }
    },
    {
      id: 14,
      name: "Nike Air Max 270 Men's Running Shoes",
      category: "Fashion",
      brand: "Nike",
      price: 11495,
      mrp: 14995,
      stock: 40,
      rating: 4.5,
      reviewsCount: 8120,
      image: unsplashImg("photo-1542291026-7eec264c27ff"),
      images: [unsplashImg("photo-1542291026-7eec264c27ff"), unsplashImg("photo-1608231387042-66d1773070a5")],
      assured: true,
      badge: "Trending",
      desc: "Max Air unit heel cushioning with breathable mesh upper for all-day comfort.",
      specs: { "Material": "Mesh + Synthetic", "Sole": "Rubber Max Air", "Closure": "Lace-up", "Ideal For": "Running / Casual", "Care": "Wipe clean" }
    },
    {
      id: 15,
      name: "Levi's Men's 511 Slim Fit Stretchable Jeans",
      category: "Fashion",
      brand: "Levi's",
      price: 2199,
      mrp: 3999,
      stock: 65,
      rating: 4.3,
      reviewsCount: 22100,
      image: unsplashImg("photo-1542272454315-4c01d7abdf4a"),
      images: [unsplashImg("photo-1542272454315-4c01d7abdf4a")],
      assured: true,
      badge: "Best Seller",
      desc: "Modern slim fit with stretch for mobility in classic indigo wash.",
      specs: { "Fabric": "99% Cotton 1% Elastane", "Fit": "Slim", "Rise": "Mid", "Wash": "Machine cold", "Origin": "Levi Strauss" }
    },
    {
      id: 16,
      name: "Adidas Men's Essentials 3-Stripes T-Shirt",
      category: "Fashion",
      brand: "Adidas",
      price: 1299,
      mrp: 1999,
      stock: 90,
      rating: 4.4,
      reviewsCount: 15600,
      image: unsplashImg("photo-1521572163474-6864f9cf17ab"),
      images: [unsplashImg("photo-1521572163474-6864f9cf17ab")],
      assured: true,
      badge: "Sportswear",
      desc: "Soft cotton tee with iconic 3-Stripes for everyday comfort and style.",
      specs: { "Fabric": "100% Cotton", "Fit": "Regular", "Neck": "Crew", "Care": "Machine wash", "Origin": "Adidas" }
    },
    {
      id: 17,
      name: "American Tourister 28-inch Hard-Sided Trolley",
      category: "Fashion",
      brand: "American Tourister",
      price: 3999,
      mrp: 9500,
      stock: 35,
      rating: 4.4,
      reviewsCount: 19800,
      image: unsplashImg("photo-1565026057447-bc90a3dceb87"),
      images: [unsplashImg("photo-1565026057447-bc90a3dceb87")],
      assured: true,
      badge: "Travel Fest",
      desc: "Durable polycarbonate shell, spinner wheels and TSA lock for stress-free travel.",
      specs: { "Size": "28-inch Check-in", "Material": "Polycarbonate", "Lock": "TSA", "Wheels": "360° Spinner", "Warranty": "3 Years" }
    },
    {
      id: 18,
      name: "Fossil Grant Chronograph Men's Watch",
      category: "Fashion",
      brand: "Fossil",
      price: 8995,
      mrp: 12995,
      stock: 25,
      rating: 4.5,
      reviewsCount: 7200,
      image: unsplashImg("photo-1523275335684-37898b6baf30"),
      images: [unsplashImg("photo-1523275335684-37898b6baf30")],
      assured: true,
      badge: "Premium",
      desc: "Classic chronograph with stainless steel case and genuine leather strap.",
      specs: { "Movement": "Quartz", "Case": "44mm SS", "Strap": "Leather", "Water": "5 ATM", "Warranty": "2 Years" }
    },
    {
      id: 19,
      name: "The Ordinary Niacinamide 10% + Zinc 1% Serum 30ml",
      category: "Beauty",
      brand: "The Ordinary",
      price: 600,
      mrp: 750,
      stock: 80,
      rating: 4.5,
      reviewsCount: 45200,
      image: unsplashImg("photo-1620916569736-6e5ef824fcd6"),
      images: [unsplashImg("photo-1620916569736-6e5ef824fcd6")],
      assured: true,
      badge: "Viral Pick",
      desc: "High-strength niacinamide formula to balance sebum and refine skin texture.",
      specs: { "Volume": "30 ml", "Skin Type": "Oily / Combination", "Actives": "Niacinamide + Zinc", "Vegan": "Yes", "Cruelty Free": "Yes" }
    },
    {
      id: 20,
      name: "Maybelline New York Fit Me Matte + Poreless Foundation",
      category: "Beauty",
      brand: "Maybelline",
      price: 499,
      mrp: 625,
      stock: 100,
      rating: 4.3,
      reviewsCount: 89000,
      image: unsplashImg("photo-1596462502278-27bfdc403348"),
      images: [unsplashImg("photo-1596462502278-27bfdc403348")],
      assured: true,
      badge: "Makeup Staple",
      desc: "Lightweight foundation that controls shine and minimizes pores for a natural finish.",
      specs: { "Type": "Liquid Foundation", "Finish": "Matte", "Coverage": "Medium", "SPF": "No", "Shade Range": "Wide" }
    },
    {
      id: 21,
      name: "Lakme Absolute Skin Natural Mousse Foundation",
      category: "Beauty",
      brand: "Lakme",
      price: 699,
      mrp: 875,
      stock: 70,
      rating: 4.2,
      reviewsCount: 34000,
      image: unsplashImg("photo-1631214524020-7e18db94a8d8"),
      images: [unsplashImg("photo-1631214524020-7e18db94a8d8")],
      assured: true,
      badge: "Indian Favourite",
      desc: "Feather-light mousse texture for a natural, radiant finish that lasts all day.",
      specs: { "Type": "Mousse", "Finish": "Natural", "Coverage": "Medium-Full", "SPF": "8", "Suitable": "All skin types" }
    },
    {
      id: 22,
      name: "Mamaearth Vitamin C Face Wash with Turmeric",
      category: "Beauty",
      brand: "Mamaearth",
      price: 249,
      mrp: 249,
      stock: 150,
      rating: 4.4,
      reviewsCount: 67000,
      image: unsplashImg("photo-1556228720-195a672e8a03"),
      images: [unsplashImg("photo-1556228720-195a672e8a03")],
      assured: true,
      badge: "Clean Beauty",
      desc: "Gentle face wash infused with Vitamin C and turmeric for brighter-looking skin.",
      specs: { "Volume": "100 ml", "Key Ingredients": "Vitamin C, Turmeric", "Skin Type": "All", "Sulfate Free": "Yes", "Toxoid Free": "Yes" }
    },
    {
      id: 23,
      name: "Milton Thermosteel 1000ml Hot/Cold Bottle",
      category: "Home & Kitchen",
      brand: "Milton",
      price: 849,
      mrp: 1199,
      stock: 90,
      rating: 4.5,
      reviewsCount: 31200,
      image: unsplashImg("photo-1602143407151-7111542de6e8"),
      images: [unsplashImg("photo-1602143407151-7111542de6e8")],
      assured: true,
      badge: "Daily Essential",
      desc: "Double-wall vacuum insulation keeps drinks hot or cold for 24 hours.",
      specs: { "Capacity": "1 Litre", "Retention": "24h Hot/Cold", "Material": "304 SS", "Leak Proof": "Yes", "Warranty": "1 Year" }
    },
    {
      id: 24,
      name: "Pigeon by Stovekraft Non-Stick Cookware Set (3 Pieces)",
      category: "Home & Kitchen",
      brand: "Pigeon",
      price: 1499,
      mrp: 2995,
      stock: 55,
      rating: 4.1,
      reviewsCount: 28000,
      image: unsplashImg("photo-1556909114-f6e7ad7d3136"),
      images: [unsplashImg("photo-1556909114-f6e7ad7d3136")],
      assured: true,
      badge: "Kitchen Deal",
      desc: "Non-stick frying pan, kadhai and tawa set for everyday Indian cooking.",
      specs: { "Pieces": "3", "Coating": "Non-stick", "Handles": "Cool-touch", "Induction": "Yes", "Warranty": "1 Year" }
    },
    {
      id: 25,
      name: "AmazonBasics Microfiber Bed Sheet Set (King)",
      category: "Home & Kitchen",
      brand: "AmazonBasics",
      price: 1299,
      mrp: 2499,
      stock: 70,
      rating: 4.3,
      reviewsCount: 41000,
      image: unsplashImg("photo-1522771739845-c6a68e6e1d7f"),
      images: [unsplashImg("photo-1522771739845-c6a68e6e1d7f")],
      assured: true,
      badge: "Soft Touch",
      desc: "Soft microfiber king bedsheet with 2 pillow covers. Wrinkle-resistant and easy care.",
      specs: { "Size": "King", "Material": "Microfiber", "Includes": "1 Sheet + 2 Covers", "Care": "Machine wash", "Color": "Assorted" }
    },
    {
      id: 26,
      name: "Hawkins Contura Black Hard Anodised Pressure Cooker 5L",
      category: "Home & Kitchen",
      brand: "Hawkins",
      price: 2199,
      mrp: 2800,
      stock: 40,
      rating: 4.6,
      reviewsCount: 19000,
      image: unsplashImg("photo-1585515320310-25999524e4cf"),
      images: [unsplashImg("photo-1585515320310-25999524e4cf")],
      assured: true,
      badge: "Kitchen Classic",
      desc: "Hard anodised body for durability and even heat distribution. 5 litre family size.",
      specs: { "Capacity": "5 Litre", "Material": "Hard Anodised", "Base": "Induction Compatible", "Safety": "Pressure Regulator", "Warranty": "5 Years" }
    },
    {
      id: 27,
      name: "Green Soul Ergonomic High-Back Office Chair",
      category: "Furniture",
      brand: "Green Soul",
      price: 8499,
      mrp: 14999,
      stock: 18,
      rating: 4.6,
      reviewsCount: 11200,
      image: unsplashImg("photo-1580480055273-228ff5388ef8"),
      images: [unsplashImg("photo-1580480055273-228ff5388ef8")],
      assured: true,
      badge: "Work From Home",
      desc: "Breathable mesh, lumbar support and multi-tilt mechanism for long work hours.",
      specs: { "Frame": "Nylon", "Seat": "High-density foam", "Adjust": "Height + Recline", "Capacity": "125 kg", "Warranty": "3 Years" }
    },
    {
      id: 28,
      name: "Wakefit Minimalist Solid Wood Coffee Table",
      category: "Furniture",
      brand: "Wakefit",
      price: 3699,
      mrp: 6999,
      stock: 14,
      rating: 4.3,
      reviewsCount: 4210,
      image: unsplashImg("photo-1616486338812-3dadae4b4ace"),
      images: [unsplashImg("photo-1616486338812-3dadae4b4ace")],
      assured: true,
      badge: "Home Style",
      desc: "Engineered wood with teak finish and dual open shelves for living room storage.",
      specs: { "Dimensions": "90x45x42 cm", "Material": "Engineered Wood", "Assembly": "DIY", "Finish": "Teak", "Warranty": "1 Year" }
    },
    {
      id: 29,
      name: "Nilkamal Freedom Mini Plastic Storage Cabinet",
      category: "Furniture",
      brand: "Nilkamal",
      price: 2499,
      mrp: 3999,
      stock: 30,
      rating: 4.2,
      reviewsCount: 8700,
      image: unsplashImg("photo-1595428774223-ef52624120d2"),
      images: [unsplashImg("photo-1595428774223-ef52624120d2")],
      assured: true,
      badge: "Space Saver",
      desc: "Compact multi-purpose plastic cabinet with shelves for organized storage.",
      specs: { "Material": "Virgin Plastic", "Shelves": "Multiple", "Assembly": "Tool-free", "Use": "Home / Office", "Warranty": "1 Year" }
    },
    {
      id: 30,
      name: "Atomic Habits by James Clear (Hardcover)",
      category: "Books",
      brand: "Penguin Random House",
      price: 520,
      mrp: 799,
      stock: 120,
      rating: 4.9,
      reviewsCount: 68900,
      image: unsplashImg("photo-1544947950-fa07a98d237f"),
      images: [unsplashImg("photo-1544947950-fa07a98d237f")],
      assured: true,
      badge: "#1 Best Seller",
      desc: "Proven framework for building good habits and breaking bad ones. 15M+ copies sold.",
      specs: { "Format": "Hardcover", "Pages": "320", "Language": "English", "Publisher": "Random House", "ISBN": "978-1847941831" }
    },
    {
      id: 31,
      name: "The Psychology of Money by Morgan Housel",
      category: "Books",
      brand: "Jaico",
      price: 299,
      mrp: 399,
      stock: 200,
      rating: 4.7,
      reviewsCount: 52000,
      image: unsplashImg("photo-1589829085413-56de8ae18c73"),
      images: [unsplashImg("photo-1589829085413-56de8ae18c73")],
      assured: true,
      badge: "Finance Must-Read",
      desc: "Timeless lessons on wealth, greed and happiness through the lens of human behaviour.",
      specs: { "Format": "Paperback", "Pages": "252", "Language": "English", "Publisher": "Jaico", "Genre": "Personal Finance" }
    },
    {
      id: 32,
      name: "Ikigai: The Japanese Secret to a Long and Happy Life",
      category: "Books",
      brand: "Penguin",
      price: 350,
      mrp: 550,
      stock: 150,
      rating: 4.6,
      reviewsCount: 41000,
      image: unsplashImg("photo-1512820790803-83ca734da794"),
      images: [unsplashImg("photo-1512820790803-83ca734da794")],
      assured: true,
      badge: "Self Help",
      desc: "Discover your reason for being with lessons from the world's longest-living people.",
      specs: { "Format": "Hardcover", "Pages": "208", "Language": "English", "Publisher": "Penguin", "Genre": "Self-Help" }
    },
    {
      id: 33,
      name: "Yonex Mavis 350 Nylon Shuttlecock (Pack of 6)",
      category: "Sports",
      brand: "Yonex",
      price: 599,
      mrp: 750,
      stock: 100,
      rating: 4.5,
      reviewsCount: 28000,
      image: unsplashImg("photo-1626224583764-f87db24c4b9c"),
      images: [unsplashImg("photo-1626224583764-f87db24c4b9c")],
      assured: true,
      badge: "Sports Essential",
      desc: "Durable nylon shuttlecocks designed for intermediate to advanced play.",
      specs: { "Type": "Nylon", "Pack": "6 Pieces", "Speed": "Medium", "Level": "Intermediate+", "Brand": "Yonex" }
    },
    {
      id: 34,
      name: "Nivia Storm Football Size 5",
      category: "Sports",
      brand: "Nivia",
      price: 699,
      mrp: 999,
      stock: 80,
      rating: 4.3,
      reviewsCount: 15000,
      image: unsplashImg("photo-1614632537197-38a17061c2bd"),
      images: [unsplashImg("photo-1614632537197-38a17061c2bd")],
      assured: true,
      badge: "Match Ready",
      desc: "Official size 5 football with durable TPU cover for training and matches.",
      specs: { "Size": "5", "Material": "TPU", "Bladder": "Butyl", "Use": "Training / Match", "Warranty": "6 Months" }
    },
    {
      id: 35,
      name: "Cosco Badminton Racquet Kit (2 Racquets + Cover)",
      category: "Sports",
      brand: "Cosco",
      price: 899,
      mrp: 1499,
      stock: 60,
      rating: 4.2,
      reviewsCount: 9200,
      image: unsplashImg("photo-1626224583764-f87db24c4b9c"),
      images: [unsplashImg("photo-1626224583764-f87db24c4b9c")],
      assured: true,
      badge: "Beginner Set",
      desc: "Lightweight dual racquet set with cover — ideal for casual and beginner play.",
      specs: { "Racquets": "2", "Weight": "Lightweight", "Cover": "Included", "Level": "Beginner", "Brand": "Cosco" }
    },
    {
      id: 36,
      name: "Decathlon Domyos Resistance Bands Set (5 Levels)",
      category: "Sports",
      brand: "Domyos",
      price: 799,
      mrp: 1299,
      stock: 75,
      rating: 4.4,
      reviewsCount: 11000,
      image: unsplashImg("photo-1598289431512-b97b0917affc"),
      images: [unsplashImg("photo-1598289431512-b97b0917affc")],
      assured: true,
      badge: "Home Gym",
      desc: "Five resistance levels for strength training, rehab and full-body workouts at home.",
      specs: { "Bands": "5 Levels", "Material": "Latex", "Carry Bag": "Yes", "Use": "Strength / Rehab", "Brand": "Domyos" }
    },
    {
      id: 37,
      name: "HP 15s Intel Core i5 12th Gen Laptop (16GB, 512GB SSD)",
      category: "Electronics",
      brand: "HP",
      price: 52990,
      mrp: 65990,
      stock: 20,
      rating: 4.3,
      reviewsCount: 8700,
      image: unsplashImg("photo-1496181133206-80ce9b88a853"),
      images: [unsplashImg("photo-1496181133206-80ce9b88a853")],
      assured: true,
      badge: "Work Laptop",
      desc: "Reliable everyday laptop with Intel i5, 16GB RAM and fast SSD for multitasking.",
      specs: { "Processor": "Intel i5 12th Gen", "RAM": "16GB", "Storage": "512GB SSD", "Display": "15.6 FHD", "Warranty": "1 Year" }
    },
    {
      id: 38,
      name: "Noise ColorFit Pro 4 Smart Watch",
      category: "Electronics",
      brand: "Noise",
      price: 2499,
      mrp: 5999,
      stock: 85,
      rating: 4.2,
      reviewsCount: 95000,
      image: unsplashImg("photo-1579586337278-3befd40fd17a"),
      images: [unsplashImg("photo-1579586337278-3befd40fd17a")],
      assured: true,
      badge: "Best Seller",
      desc: "1.78 AMOLED display, Bluetooth calling, 100+ sports modes and 7-day battery.",
      specs: { "Display": "1.78 AMOLED", "Calling": "Bluetooth", "Battery": "Up to 7 days", "Sports": "100+ modes", "Warranty": "1 Year" }
    },
    {
      id: 39,
      name: "Puma Men's Softride Running Shoes",
      category: "Fashion",
      brand: "Puma",
      price: 3499,
      mrp: 5999,
      stock: 50,
      rating: 4.3,
      reviewsCount: 12400,
      image: unsplashImg("photo-1606107557195-0e29a4b5b4aa"),
      images: [unsplashImg("photo-1606107557195-0e29a4b5b4aa")],
      assured: true,
      badge: "Comfort Run",
      desc: "Soft foam midsole and breathable upper designed for everyday runs and walks.",
      specs: { "Upper": "Mesh", "Midsole": "Softride Foam", "Closure": "Lace-up", "Ideal For": "Running", "Care": "Wipe clean" }
    },
    {
      id: 40,
      name: "CeraVe Moisturising Cream 340g",
      category: "Beauty",
      brand: "CeraVe",
      price: 899,
      mrp: 1100,
      stock: 65,
      rating: 4.7,
      reviewsCount: 28000,
      image: unsplashImg("photo-1556228578-0d85b1a4d571"),
      images: [unsplashImg("photo-1556228578-0d85b1a4d571")],
      assured: true,
      badge: "Dermatologist Recommended",
      desc: "Ceramide-rich moisturiser that restores the skin barrier for dry to very dry skin.",
      specs: { "Volume": "340g", "Key": "3 Essential Ceramides", "Skin Type": "Dry", "Fragrance Free": "Yes", "Use": "Face & Body" }
    }
  ];

  // Categories with Icons
  const CATEGORIES = [
    { name: "All Offers", icon: "flame", badge: "Deals" },
    { name: "Mobiles", icon: "smartphone", badge: "Flagship" },
    { name: "Electronics", icon: "laptop", badge: "Gadgets" },
    { name: "TV & Appliances", icon: "tv", badge: "Smart" },
    { name: "Fashion", icon: "shirt", badge: "Trends" },
    { name: "Beauty", icon: "sparkle", badge: "Glow" },
    { name: "Home & Kitchen", icon: "home", badge: "Living" },
    { name: "Furniture", icon: "sofa", badge: "Comfort" },
    { name: "Books", icon: "book", badge: "Top 100" },
    { name: "Sports", icon: "bolt", badge: "Active" }
  ];

  // Default Store & Creator Settings
  const DEFAULT_SETTINGS = {
    creatorName: "Store Creator & Admin",
    creatorTitle: "Lead Software Architect & Store Owner",
    creatorBio: "This premier Zenvora e-commerce platform and executive backoffice administration engine was designed, architected, and engineered from scratch. Fully loaded with product catalog management, real-time sales analytics, simulated checkout gateways, order fulfillment timeline, and live inventory control.",
    creatorPortfolio: "https://github.com",
    showCreatorBadge: true,
    storeName: "Zenvora",
    adminPin: "admin123",
    freeShippingMin: 500,
    deliveryFee: 40
  };

  // Default Coupons
  const DEFAULT_COUPONS = [
    { code: "ZENVORA50", type: "percent", value: 10, minSpend: 1500, active: true },
    { code: "WELCOME200", type: "flat", value: 200, minSpend: 999, active: true },
    { code: "SUPERDEAL", type: "percent", value: 15, minSpend: 5000, active: true }
  ];

  // ===== REACTIVE APPLICATION STATE =====
  let state = {
    products: (function(){
      const CAT_VER = 2;
      const savedVer = Number(localStorage.getItem('zv_catalog_ver') || 0);
      if (savedVer < CAT_VER) {
        localStorage.setItem('zv_catalog_ver', String(CAT_VER));
        store.set('zv_products', DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS.slice();
      }
      return store.get('zv_products', DEFAULT_PRODUCTS);
    })(),
    cart: store.get('zv_cart', []),
    wishlist: store.get('zv_wishlist', []),
    orders: store.get('zv_orders', []),
    coupons: store.get('zv_coupons', DEFAULT_COUPONS),
    settings: store.get('zv_settings', DEFAULT_SETTINGS),
    appliedCoupon: null,
    activeCategory: "All Offers",
    searchQuery: "",
    sortBy: "popularity",
    filters: {
      minPrice: 0,
      maxPrice: 999999,
      assuredOnly: false,
      minRating: 0,
      inStockOnly: true
    },
    wishlistOnly: false,
    profile: store.get('zv_profile', { name: '', phone: '', city: '', email: '' }),
    users: store.get('zv_users', []),
    currentUser: null,
    coins: store.get('zv_coins', { bal: 250, last: '' }),
    activeSlide: 0,
    heroSlideTimer: null,
    countdownSeconds: 27525,
    userLocation: store.get('zv_user_location', { city: 'Mumbai', pincode: '400001' }),
    isAdminLoggedIn: sessionStorage.getItem('zv_admin_auth') === 'true',
    activeAdminPane: 'admPaneDashboard',
    currentPdpProduct: null
  };

  // Toast Timer Reference
  let toastTimer = null;

  // ===== TOAST NOTIFICATION SYSTEM =====
  function showToast(message, icon = 'info') {
    const toast = $('globalToast');
    const toastMsg = $('toastMessage');
    const toastIco = $('toastIcon');
    if (!toast) return;

    toastMsg.textContent = message;
    toastIco.innerHTML = IC(icon);
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }



  // ===== ZENVORA BACKEND CONNECTION =====
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const API_BASE = window.ZENVORA_API || (isLocal ? `${location.protocol}//${location.hostname}:3000/api` : null);
let backendOnline = false;

async function apiRequest(path, options = {}) {
  if (!API_BASE) throw new Error('Backend not available');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (state?.settings?.adminPin) headers['x-admin-pin'] = state.settings.adminPin;

  // Add timeout so it never hangs
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers, signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

  async function loadBackendState() {
    try {
      const data = await apiRequest('/store');
      backendOnline = true;
      if (Array.isArray(data.products) && data.products.length) state.products = data.products;
      if (Array.isArray(data.orders)) state.orders = data.orders;
      if (Array.isArray(data.coupons) && data.coupons.length) state.coupons = data.coupons;
      if (data.settings) state.settings = { ...state.settings, ...data.settings };
      if (Array.isArray(data.users)) state.users = data.users;
      store.set('zv_products', state.products);
      store.set('zv_orders', state.orders);
      store.set('zv_coupons', state.coupons);
      store.set('zv_settings', state.settings);
      store.set('zv_users', state.users);
      return true;
    } catch (err) {
      backendOnline = false;
      console.warn('Zenvora backend unavailable; using browser fallback:', err.message);
      return false;
    }
  }

  async function seedBackendIfNeeded() {
    if (backendOnline) return;
    try {
      const res = await fetch(`${API_BASE}/store`);
      const data = await res.json();
      if (!data.products?.length) {
        await fetch(`${API_BASE}/bootstrap`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ products: state.products, orders: state.orders, coupons: state.coupons, settings: state.settings })
        });
        backendOnline = true;
      }
    } catch (err) {
      console.warn('Backend seed skipped:', err.message);
    }
  }

  async function refreshBackendState(showMessage = false) {
    try {
      const data = await apiRequest('/store');
      backendOnline = true;
      const productsChanged = JSON.stringify(state.products) !== JSON.stringify(data.products || []);
      state.products = data.products || state.products;
      state.orders = data.orders || state.orders;
      state.coupons = data.coupons || state.coupons;
      state.settings = { ...state.settings, ...(data.settings || {}) };
      state.users = data.users || state.users;
      store.set('zv_products', state.products);
      store.set('zv_orders', state.orders);
      store.set('zv_coupons', state.coupons);
      store.set('zv_settings', state.settings);
      store.set('zv_users', state.users);
      renderProducts(); renderFlashDeals(); renderCart(); updateWishlistBadges();
      renderAdminProductsTable(); renderAdminOrdersTable(); renderAdminRecentOrders(); updateAdminKpis();
      renderAdminCustomersTable?.();
      if (showMessage) showToast('Zenvora data synced with server', 'check');
      return productsChanged;
    } catch (err) {
      backendOnline = false;
      return false;
    }
  }

  // ===== PERSISTENCE HELPERS =====
  function saveProducts() {
    if (!store.set('zv_products', state.products)) showToast("Browser storage is full. Remove a product or use fewer/smaller photos.", "warn");
    if (backendOnline) apiRequest('/products', { method: 'PUT', body: JSON.stringify({ products: state.products }) }).catch(err => showToast('Server product sync failed: ' + err.message, 'warn'));
    renderProducts();
    renderFlashDeals();
    renderAdminProductsTable();
    updateAdminKpis();
    if ($('admProductBadge')) $('admProductBadge').textContent = state.products.length;
  }

  function saveCart() {
    store.set('zv_cart', state.cart);
    renderCart();
  }

  function saveWishlist() {
    store.set('zv_wishlist', state.wishlist);
    updateWishlistBadges();
  }

  function saveOrders() {
    store.set('zv_orders', state.orders);
    if (backendOnline) apiRequest('/orders', { method: 'PUT', body: JSON.stringify({ orders: state.orders }) }).catch(err => showToast('Server order sync failed: ' + err.message, 'warn'));
    renderAdminOrdersTable();
    renderAdminRecentOrders();
    updateAdminKpis();
    if ($('admOrderBadge')) $('admOrderBadge').textContent = state.orders.length;
  }

  function saveSettings() {
    store.set('zv_settings', state.settings);
    if (backendOnline) apiRequest('/settings', { method: 'PUT', body: JSON.stringify({ settings: state.settings }) }).catch(err => showToast('Server settings sync failed: ' + err.message, 'warn'));
    applyCreatorSettingsToUI();
  }

  function saveCoupons() {
    store.set('zv_coupons', state.coupons);
    if (backendOnline) apiRequest('/coupons', { method: 'PUT', body: JSON.stringify({ coupons: state.coupons }) }).catch(err => showToast('Server coupon sync failed: ' + err.message, 'warn'));
    renderAdminCouponsTable();
  }

  // ===== UI SYNC: CREATOR SETTINGS =====
  function applyCreatorSettingsToUI() {
    const s = state.settings;
    
    // Header & Creator Banner
    if ($('stripCreatorName')) $('stripCreatorName').textContent = s.creatorName;
    if ($('ftrCreatorName')) $('ftrCreatorName').textContent = s.creatorName;
    if ($('ftrOwnerCopy')) $('ftrOwnerCopy').textContent = s.creatorName;
    if ($('ftrCreatorBio')) $('ftrCreatorBio').textContent = s.creatorBio;
    if ($('spotlightCreatorName')) $('spotlightCreatorName').textContent = s.creatorName;
    if ($('spotlightCreatorTitle')) $('spotlightCreatorTitle').textContent = s.creatorTitle;
    if ($('spotlightCreatorBio')) $('spotlightCreatorBio').textContent = s.creatorBio;
    if ($('admOwnerIdentity')) $('admOwnerIdentity').textContent = s.creatorName;
    if ($('admSidebarCreatorName')) $('admSidebarCreatorName').textContent = s.creatorName;
    if ($('hdrBrandName')) $('hdrBrandName').textContent = s.storeName;
    if ($('ftrBrandCopy')) $('ftrBrandCopy').textContent = s.storeName;
    if ($('admBrandTitle')) $('admBrandTitle').textContent = `${s.storeName} Management Console`;

    // Creator Strip Visibility
    const strip = $('creatorTopStrip');
    if (strip) {
      strip.style.display = s.showCreatorBadge ? 'flex' : 'none';
    }

    // Populate Settings Form Inputs
    if ($('cfgCreatorName')) $('cfgCreatorName').value = s.creatorName;
    if ($('cfgCreatorTitle')) $('cfgCreatorTitle').value = s.creatorTitle;
    if ($('cfgCreatorBio')) $('cfgCreatorBio').value = s.creatorBio;
    if ($('cfgCreatorPortfolio')) $('cfgCreatorPortfolio').value = s.creatorPortfolio;
    if ($('cfgShowCreatorBadge')) $('cfgShowCreatorBadge').value = String(s.showCreatorBadge);
    if ($('cfgStoreName')) $('cfgStoreName').value = s.storeName;
    if ($('cfgFreeShippingMin')) $('cfgFreeShippingMin').value = s.freeShippingMin;
    if ($('cfgDeliveryFee')) $('cfgDeliveryFee').value = s.deliveryFee;
    if ($('cfgAdminPin')) $('cfgAdminPin').value = s.adminPin;
  }

  // ===== CATEGORY STRIP RENDERING =====
  function renderCategories() {
    const container = $('categoryStrip');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
      <div class="cat-item ${state.activeCategory === cat.name ? 'active' : ''}" data-cat="${cat.name}">
        <div class="cat-icon-box">${IC(cat.icon)}</div>
        <span class="cat-title">${cat.name}</span>
      </div>
    `).join('');

    // Category Filter list in sidebar
    const filterList = $('categoryFilterList');
    if (filterList) {
      filterList.innerHTML = CATEGORIES.slice(1).map(cat => `
        <label class="filter-checkbox-label">
          <input type="checkbox" class="cat-checkbox" value="${cat.name}" ${state.activeCategory === cat.name ? 'checked' : ''}>
          <span>${cat.name}</span>
        </label>
      `).join('');
    }

    // Category dropdown for Add Product form
    const formCatSelect = $('prodFormCat');
    if (formCatSelect) {
      formCatSelect.innerHTML = CATEGORIES.slice(1).map(c => `
        <option value="${c.name}">${c.name}</option>
      `).join('');
    }

    // Category filter in Admin products
    const admCatFilter = $('admProductCatFilter');
    if (admCatFilter) {
      admCatFilter.innerHTML = `<option value="ALL">All Categories</option>` + CATEGORIES.slice(1).map(c => `
        <option value="${c.name}">${c.name}</option>
      `).join('');
    }
  }

  // ===== HERO SLIDER CONTROLLER =====
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    if (!slides.length) return;

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      state.activeSlide = (index + slides.length) % slides.length;
      slides[state.activeSlide].classList.add('active');
      if (dots[state.activeSlide]) dots[state.activeSlide].classList.add('active');
    }

    function nextSlide() {
      goToSlide(state.activeSlide + 1);
    }

    function prevSlide() {
      goToSlide(state.activeSlide - 1);
    }

    $('sliderNextBtn')?.addEventListener('click', () => {
      clearInterval(state.heroSlideTimer);
      nextSlide();
      startAutoSlide();
    });

    $('sliderPrevBtn')?.addEventListener('click', () => {
      clearInterval(state.heroSlideTimer);
      prevSlide();
      startAutoSlide();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(state.heroSlideTimer);
        goToSlide(idx);
        startAutoSlide();
      });
    });

    function startAutoSlide() {
      clearInterval(state.heroSlideTimer);
      state.heroSlideTimer = setInterval(nextSlide, 5000);
    }

    startAutoSlide();

    // Banner CTA buttons click handler
    document.querySelectorAll('[data-banner-cat]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.bannerCat;
        setCategory(cat);
        $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // ===== DEALS COUNTDOWN TIMER =====
  function initCountdownTimer() {
    const timerEl = $('countdownTimer');
    if (!timerEl) return;

    setInterval(() => {
      if (state.countdownSeconds > 0) {
        state.countdownSeconds--;
      } else {
        state.countdownSeconds = 28800; // Reset to 8 hours
      }

      const h = String(Math.floor(state.countdownSeconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((state.countdownSeconds % 3600) / 60)).padStart(2, '0');
      const s = String(state.countdownSeconds % 60).padStart(2, '0');
      timerEl.textContent = `${h}h : ${m}m : ${s}s`;
    }, 1000);
  }

  // ===== FILTER & SORT CATALOG ENGINE =====
  function getFilteredProducts() {
    return state.products.filter(p => {
      // Category filter
      if (state.activeCategory !== "All Offers" && p.category !== state.activeCategory) {
        return false;
      }

      // Search query
      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase().trim();
        const hay = `${p.name} ${p.brand} ${p.category} ${p.desc}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // Price range
      if (p.price < state.filters.minPrice || p.price > state.filters.maxPrice) {
        return false;
      }

      // Z-Assured
      if (state.filters.assuredOnly && !p.assured) {
        return false;
      }

      // Rating
      if (state.filters.minRating > 0 && p.rating < state.filters.minRating) {
        return false;
      }

      // In stock
      if (state.filters.inStockOnly && p.stock <= 0) {
        return false;
      }

      if (state.wishlistOnly && !state.wishlist.includes(p.id)) return false;

      return true;
    }).sort((a, b) => {
      switch (state.sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.id - a.id;
        case 'popularity':
        default:
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
    });
  }

  // ===== RENDER PRODUCT CARD (Zenvora Style) =====
  function renderProductCardHTML(p) {
    const isWished = state.wishlist.includes(p.id);
    const discount = offPercent(p.price, p.mrp);

    return `
      <article class="product-card" data-product-id="${p.id}">
        <button type="button" class="wishlist-btn ${isWished ? 'active' : ''}" data-wishlist-id="${p.id}" onclick="event.stopPropagation(); window.ZenvoraApp?.toggleWishlist(${p.id})" title="${isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}">
          ${IC(isWished ? 'heart-fill' : 'heart')}
        </button>

        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23e8eaf6%27 width=%27400%27 height=%27400%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%235b3df5%27 font-family=%27system-ui%27 font-size=%2748%27 font-weight=%27700%27%3EZ%3C/text%3E%3C/svg%3E'">
          ${p.badge ? `<span class="card-badge-tag">${p.badge}</span>` : ''}
        </div>

        <div class="product-info">
          <h3 class="product-title" title="${p.name}">${p.name}</h3>
          <p class="product-desc-snippet">${p.desc}</p>

          <div class="product-meta-row">
            <span class="rating-pill">${IC('star')} ${p.rating}</span>
            <span class="review-count">(${Number(p.reviewsCount || 1000).toLocaleString('en-IN')})</span>
            ${p.assured ? `
              <div class="f-assured-badge">
                <span class="f-assured-pill">${IC('shield')} <span>Assured</span></span>
              </div>
            ` : ''}
          </div>

          <div class="price-row">
            <span class="current-price">${money(p.price)}</span>
            <span class="original-price">${money(p.mrp)}</span>
            <span class="discount-tag">${discount}% off</span>
          </div>

          <div class="delivery-note">
            ${p.stock > 0 ? `Fast Delivery by <b>Tomorrow</b>` : `<span style="color:var(--zv-red)">Out of stock</span>`}
          </div>

          <div class="card-actions">
            <button type="button" class="btn-card-cart" data-add-cart="${p.id}" onclick="event.stopPropagation(); window.ZenvoraApp?.addToCart(${p.id})">
              ADD TO CART
            </button>
            <button type="button" class="btn-card-buy" data-buy-now="${p.id}" onclick="event.stopPropagation(); window.ZenvoraApp?.addToCart(${p.id}); window.ZenvoraApp?.openCheckoutModal()">
              BUY NOW
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // ===== RENDER STOREFRONT MAIN CATALOG =====
  function renderProducts() {
    const grid = $('mainProductsGrid');
    const countEl = $('catalogResultsCount');
    if (!grid) return;

    const list = getFilteredProducts();

    if (countEl) {
      countEl.innerHTML = `Showing <b>${list.length}</b> products${state.wishlistOnly ? ' (liked)' : ''} ${state.searchQuery ? `for “${state.searchQuery}”` : ''}`;
    }

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-catalog-state" style="grid-column: 1 / -1">
          <div class="empty-icon">${IC('search')}</div>
          <h3>No products match your criteria</h3>
          <p>Try resetting filters or searching with different keywords.</p>
          <button class="btn-admin-primary" id="emptyResetFilterBtn" style="margin: 0 auto">
            Clear All Filters
          </button>
        </div>
      `;
      $('emptyResetFilterBtn')?.addEventListener('click', resetAllFilters);
      return;
    }

    grid.innerHTML = list.map(renderProductCardHTML).join('');
  }

  // ===== RENDER FLASH DEALS HIGHLIGHT =====
  function renderFlashDeals() {
    const grid = $('flashDealsGrid');
    if (!grid) return;

    // Pick top 4 products with highest discount
    const deals = [...state.products]
      .sort((a, b) => offPercent(b.price, b.mrp) - offPercent(a.price, a.mrp))
      .slice(0, 4);

    grid.innerHTML = deals.map(renderProductCardHTML).join('');
  }

  // ===== SEARCH AUTOCOMPLETE CONTROLLER =====
  function initSearchAutocomplete() {
    const input = $('globalSearchInput');
    const clearBtn = $('clearSearchBtn');
    const submitBtn = $('submitSearchBtn');
    const suggestBox = $('searchSuggestionsBox');
    if (!input || !suggestBox) return;

    function handleSearchInput() {
      const q = input.value.trim();
      clearBtn.hidden = !q;

      if (!q) {
        suggestBox.classList.remove('active');
        return;
      }

      const matches = state.products.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 6);

      if (!matches.length) {
        suggestBox.innerHTML = `
          <div style="padding:14px; text-align:center; color:var(--text-muted); font-size:13px">
            No matching products for “${q}”
          </div>
        `;
        suggestBox.classList.add('active');
        return;
      }

      suggestBox.innerHTML = `
        <div class="suggest-header">Matching Products</div>
        ${matches.map(p => `
          <div class="suggest-item" data-suggest-id="${p.id}" role="button" tabindex="0" onclick="event.stopPropagation(); window.ZenvoraApp?.openProductDetailsModal(${p.id})">
            <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23e8eaf6%27 width=%27400%27 height=%27400%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%235b3df5%27 font-family=%27system-ui%27 font-size=%2748%27 font-weight=%27700%27%3EZ%3C/text%3E%3C/svg%3E'">
            <div class="suggest-info">
              <div class="suggest-title">${p.name}</div>
              <div class="suggest-meta">in ${p.category} · ${p.brand}</div>
            </div>
            <div class="suggest-price">${money(p.price)}</div>
          </div>
        `).join('')}
      `;
      suggestBox.classList.add('active');
    }

    input.addEventListener('input', handleSearchInput);
    input.addEventListener('focus', () => {
      if (input.value.trim()) handleSearchInput();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        state.searchQuery = input.value.trim();
        suggestBox.classList.remove('active');
        renderProducts();
        $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    submitBtn?.addEventListener('click', () => {
      state.searchQuery = input.value.trim();
      suggestBox.classList.remove('active');
      renderProducts();
      $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
    });

    clearBtn?.addEventListener('click', () => {
      input.value = '';
      clearBtn.hidden = true;
      state.searchQuery = '';
      suggestBox.classList.remove('active');
      renderProducts();
      input.focus();
    });

    // Close suggestion box on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#searchContainer')) {
        suggestBox.classList.remove('active');
      }
    });

    // Handle suggestion item click
    suggestBox.addEventListener('click', (e) => {
      const item = e.target.closest('[data-suggest-id]');
      if (item) {
        const id = Number(item.dataset.suggestId);
        openProductDetailsModal(id);
        suggestBox.classList.remove('active');
      }
    });
  }

  // ===== FILTER & SORT EVENT LISTENERS =====
  function initFilterAndSortListeners() {
    // Sort Buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.sortBy = e.currentTarget.dataset.sort;
        renderProducts();
      });
    });

    // Category Strip Click
    $('categoryStrip')?.addEventListener('click', (e) => {
      const item = e.target.closest('.cat-item');
      if (item) {
        setCategory(item.dataset.cat);
      }
    });

    // Category Sidebar Checkboxes
    $('categoryFilterList')?.addEventListener('change', (e) => {
      const checkedBoxes = Array.from(document.querySelectorAll('.cat-checkbox:checked')).map(cb => cb.value);
      if (checkedBoxes.length === 1) {
        setCategory(checkedBoxes[0]);
      } else if (checkedBoxes.length === 0) {
        setCategory("All Offers");
      }
    });

    // Price Selects
    $('minPriceSelect')?.addEventListener('change', (e) => {
      state.filters.minPrice = Number(e.target.value);
      renderProducts();
    });

    $('maxPriceSelect')?.addEventListener('change', (e) => {
      state.filters.maxPrice = Number(e.target.value);
      renderProducts();
    });

    // Z-Assured Checkbox
    $('fAssuredFilter')?.addEventListener('change', (e) => {
      state.filters.assuredOnly = e.target.checked;
      renderProducts();
    });

    // Rating Filter
    document.querySelectorAll('.rating-filter').forEach(rb => {
      rb.addEventListener('change', () => {
        const checkedRatings = Array.from(document.querySelectorAll('.rating-filter:checked')).map(b => Number(b.value));
        state.filters.minRating = checkedRatings.length ? Math.min(...checkedRatings) : 0;
        renderProducts();
      });
    });

    // In Stock Filter
    $('inStockFilter')?.addEventListener('change', (e) => {
      state.filters.inStockOnly = e.target.checked;
      renderProducts();
    });

    // Clear All Filters
    $('clearAllFiltersBtn')?.addEventListener('click', resetAllFilters);
    $('dealsViewAllBtn')?.addEventListener('click', () => {
      setCategory("All Offers");
      $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function setCategory(catName) {
    state.activeCategory = catName;
    document.querySelectorAll('.cat-item').forEach(el => {
      el.classList.toggle('active', el.dataset.cat === catName);
    });
    renderProducts();
  }

  function resetAllFilters() {
    state.wishlistOnly = false;
    $('headerWishlistBtn')?.classList.remove('active-chip');
    state.activeCategory = "All Offers";
    state.searchQuery = "";
    if ($('globalSearchInput')) $('globalSearchInput').value = "";
    if ($('clearSearchBtn')) $('clearSearchBtn').hidden = true;
    state.filters = {
      minPrice: 0,
      maxPrice: 999999,
      assuredOnly: false,
      minRating: 0,
      inStockOnly: true
    };
    if ($('minPriceSelect')) $('minPriceSelect').value = "0";
    if ($('maxPriceSelect')) $('maxPriceSelect').value = "999999";
    if ($('fAssuredFilter')) $('fAssuredFilter').checked = false;
    if ($('inStockFilter')) $('inStockFilter').checked = true;
    document.querySelectorAll('.rating-filter').forEach(b => b.checked = false);
    document.querySelectorAll('.cat-checkbox').forEach(b => b.checked = false);
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('active'));
    document.querySelector('.cat-item[data-cat="All Offers"]')?.classList.add('active');

    renderProducts();
    showToast("Filters reset to default");
  }

  // ===== PRODUCT DETAILS MODAL (PDP) =====
  function openProductDetailsModal(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    state.currentPdpProduct = product;
    const modal = $('productDetailModalOverlay');

    // Populate Fields
    $('pdpMainImg').src = product.image;
    $('pdpMainImg').onerror = function(){ this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23e8eaf6%27 width=%27400%27 height=%27400%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%235b3df5%27 font-family=%27system-ui%27 font-size=%2748%27 font-weight=%27700%27%3EZ%3C/text%3E%3C/svg%3E'; };
    $('pdpBreadcrumb').textContent = `Home › ${product.category} › ${product.brand} › ${product.name.slice(0, 30)}...`;
    $('pdpTitle').textContent = product.name;
    $('pdpRating').innerHTML = `${IC('star')} ${product.rating}`;
    $('pdpReviewsText').textContent = `${Number(product.reviewsCount || 1000).toLocaleString('en-IN')} Ratings & Verified Reviews`;
    $('pdpAssuredBadge').style.display = product.assured ? 'inline-flex' : 'none';

    $('pdpPrice').textContent = money(product.price);
    $('pdpMrp').textContent = money(product.mrp);
    $('pdpOff').textContent = `${offPercent(product.price, product.mrp)}% off`;
    $('pdpSaveNote').textContent = `You save ${money(product.mrp - product.price)} on this product!`;

    // Thumbnails
    const thumbs = product.images && product.images.length ? product.images : [product.image];
    $('pdpThumbStrip').innerHTML = thumbs.map((src, i) => `
      <div class="pdp-thumb-item ${i === 0 ? 'active' : ''}" data-thumb-src="${src}">
        <img src="${src}" alt="Thumb ${i + 1}">
      </div>
    `).join('');

    // Thumbnail click
    $('pdpThumbStrip').querySelectorAll('.pdp-thumb-item').forEach(th => {
      th.addEventListener('click', (e) => {
        $('pdpThumbStrip').querySelectorAll('.pdp-thumb-item').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        $('pdpMainImg').src = e.currentTarget.dataset.thumbSrc;
      });
    });

    // Specifications Table
    const specs = product.specs || {
      "Brand": product.brand,
      "Category": product.category,
      "In The Box": "1 Unit, Documentation, Warranty Card",
      "Model": product.name,
      "Warranty": "1 Year Manufacturer Brand Warranty"
    };

    $('pdpSpecsTable').innerHTML = Object.entries(specs).map(([k, v]) => `
      <tr>
        <td>${k}</td>
        <td><strong>${v}</strong></td>
      </tr>
    `).join('');

    // Sample Verified Reviews
    $('pdpReviewsList').innerHTML = `
      <div class="review-item">
        <div class="review-author-row">
          <span class="rating-pill" style="font-size:11px; padding:1px 5px">${IC('star')} 5.0</span>
          <span class="review-author-name">Anand Verma</span>
          <span class="review-badge-verified">${IC('check')} Verified Purchase</span>
        </div>
        <p class="review-text">Absolutely fantastic quality! Packaging was pristine and delivered in less than 24 hours. True Zenvora Z-Assured standard.</p>
      </div>
      <div class="review-item">
        <div class="review-author-row">
          <span class="rating-pill" style="font-size:11px; padding:1px 5px">${IC('star')} 4.5</span>
          <span class="review-author-name">Sneha K.</span>
          <span class="review-badge-verified">${IC('check')} Verified Purchase</span>
        </div>
        <p class="review-text">Great value for money. Build is sturdy and works exactly as advertised in the specification highlights.</p>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeProductDetailsModal() {
    $('productDetailModalOverlay')?.classList.remove('active');
    state.currentPdpProduct = null;
    if (!document.querySelector('.modal-overlay.active')) {
      document.body.classList.remove('modal-open');
    }
  }

  // ===== CART MANAGEMENT & PRICE BREAKDOWN =====
  function addToCart(productId, qty = 1) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
      showToast("Sorry, this item is currently out of stock!", "warn");
      return;
    }

    const existing = state.cart.find(c => c.productId === productId);
    if (existing) {
      const nextQty = existing.qty + qty;
      if (nextQty > product.stock) {
        showToast(`Only ${product.stock} unit${product.stock === 1 ? '' : 's'} available`, "warn");
        return;
      }
      existing.qty = nextQty;
    } else {
      const safeQty = Math.min(Math.max(1, qty), product.stock);
      state.cart.push({ productId, qty: safeQty });
    }

    saveCart();
    showToast(`Added “${product.name.slice(0, 24)}...” to cart`, "cart");
  }

  function updateCartQty(productId, delta) {
    const item = state.cart.find(c => c.productId === productId);
    if (!item) return;

    const product = state.products.find(p => p.id === productId);
    item.qty += delta;
    if (product && item.qty > product.stock) {
      item.qty = product.stock;
      showToast(`Only ${product.stock} unit${product.stock === 1 ? '' : 's'} available`, "warn");
    }
    if (item.qty <= 0) {
      state.cart = state.cart.filter(c => c.productId !== productId);
      showToast("Item removed from cart");
    }
    saveCart();
  }

  function calculateCartTotals() {
    let subtotal = 0;
    let mrpTotal = 0;
    let count = 0;

    state.cart.forEach(c => {
      const p = state.products.find(x => x.id === c.productId);
      if (p) {
        subtotal += p.price * c.qty;
        mrpTotal += p.mrp * c.qty;
        count += c.qty;
      }
    });

    const discount = mrpTotal - subtotal;
    const delivery = (subtotal >= state.settings.freeShippingMin || subtotal === 0) ? 0 : state.settings.deliveryFee;
    const packagingFee = subtotal > 0 ? 29 : 0;

    // Coupon discount
    let couponDiscount = 0;
    if (state.appliedCoupon && subtotal >= state.appliedCoupon.minSpend) {
      if (state.appliedCoupon.type === 'percent') {
        couponDiscount = Math.round((subtotal * state.appliedCoupon.value) / 100);
      } else {
        couponDiscount = state.appliedCoupon.value;
      }
    }

    const finalPayable = Math.max(0, subtotal + delivery + packagingFee - couponDiscount);
    const totalSavings = discount + couponDiscount;

    return {
      subtotal,
      mrpTotal,
      count,
      discount,
      delivery,
      packagingFee,
      couponDiscount,
      finalPayable,
      totalSavings
    };
  }

  function renderCart() {
    const drawer = $('cartDrawer');
    const body = $('cartDrawerBody');
    const badge = $('cartBadge');
    const titleCount = $('cartCountTitle');
    const footerTotal = $('cartFooterTotal');
    if (!body) return;

    const totals = calculateCartTotals();
    if (badge) badge.textContent = totals.count;
    if (titleCount) titleCount.textContent = totals.count;
    if (footerTotal) footerTotal.textContent = money(totals.finalPayable);

    if (!state.cart.length) {
      body.innerHTML = `
        <div style="padding:60px 20px; text-align:center; background:#fff; border-radius:var(--radius-sm)">
          <div style="font-size:48px; margin-bottom:12px">${IC('cart')}</div>
          <h3 style="font-size:16px; margin-bottom:6px">Your cart is empty!</h3>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px">Explore our latest deals and add your favorite products.</p>
          <button class="btn-admin-primary" id="cartShopNowEmptyBtn" style="margin:0 auto">
            Shop Now
          </button>
        </div>
      `;
      $('cartShopNowEmptyBtn')?.addEventListener('click', () => {
        closeCartDrawer();
        $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    // Render cart items & Zenvora price details
    const itemsHTML = state.cart.map(c => {
      const p = state.products.find(x => x.id === c.productId);
      if (!p) return '';
      return `
        <div class="cart-item-card">
          <img src="${p.image}" alt="${p.name}" class="cart-item-img" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23e8eaf6%27 width=%27400%27 height=%27400%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%235b3df5%27 font-family=%27system-ui%27 font-size=%2748%27 font-weight=%27700%27%3EZ%3C/text%3E%3C/svg%3E'">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${p.name}</h4>
            <div class="cart-item-prices">
              <span class="cart-item-price">${money(p.price)}</span>
              <span class="cart-item-mrp">${money(p.mrp)}</span>
              <span class="cart-item-discount">${offPercent(p.price, p.mrp)}% off</span>
            </div>
            <div class="cart-item-qty-row">
              <div class="qty-stepper">
                <button class="qty-step-btn" data-cart-dec="${p.id}">−</button>
                <span class="qty-val-box">${c.qty}</span>
                <button class="qty-step-btn" data-cart-inc="${p.id}">+</button>
              </div>
              <button class="cart-remove-btn" data-cart-rm="${p.id}">REMOVE</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const couponBoxHTML = `
      <div class="coupon-input-box">
        <div style="font-size:12px; font-weight:700; margin-bottom:6px; color:#444">APPLY COUPON CODE</div>
        <div class="coupon-row">
          <input type="text" id="cartCouponInput" placeholder="e.g. ZENVORA50" value="${state.appliedCoupon ? state.appliedCoupon.code : ''}">
          <button class="coupon-apply-btn" id="applyCouponBtn">
            ${state.appliedCoupon ? 'REMOVE' : 'APPLY'}
          </button>
        </div>
        ${state.appliedCoupon ? `
          <div class="coupon-applied-pill">
            <span>${IC('check')} Coupon <b>${state.appliedCoupon.code}</b> applied!</span>
            <span>Saved ${money(totals.couponDiscount)}</span>
          </div>
        ` : `<div style="font-size:11px; color:#777; margin-top:4px">Try coupon: <strong>ZENVORA50</strong> or <strong>WELCOME200</strong></div>`}
      </div>
    `;

    const priceDetailsHTML = `
      <div class="price-breakdown-card">
        <h4>PRICE DETAILS</h4>
        <div class="breakdown-row">
          <span>Price (${totals.count} item${totals.count > 1 ? 's' : ''})</span>
          <span>${money(totals.mrpTotal)}</span>
        </div>
        <div class="breakdown-row discount-green">
          <span>Discount on MRP</span>
          <span>−${money(totals.discount)}</span>
        </div>
        ${totals.couponDiscount > 0 ? `
          <div class="breakdown-row discount-green">
            <span>Coupon Savings</span>
            <span>−${money(totals.couponDiscount)}</span>
          </div>
        ` : ''}
        <div class="breakdown-row delivery-row">
          <span>Delivery Charges</span>
          <b>${totals.delivery === 0 ? 'FREE' : money(totals.delivery)}</b>
        </div>
        <div class="breakdown-row">
          <span>Secured Packaging Fee</span>
          <span>₹${totals.packagingFee}</span>
        </div>
        <div class="breakdown-total-row">
          <span>Total Amount</span>
          <span>${money(totals.finalPayable)}</span>
        </div>
        <div class="savings-guarantee-note">
          You will save ${money(totals.totalSavings)} on this order ${IC('rupee')}
        </div>
      </div>
    `;

    body.innerHTML = itemsHTML + couponBoxHTML + priceDetailsHTML;
  }

  function openCartDrawer() {
    renderCart();
    $('cartDrawer')?.classList.add('active');
    $('cartDrawerOverlay')?.classList.add('active');
  }

  function closeCartDrawer() {
    $('cartDrawer')?.classList.remove('active');
    $('cartDrawerOverlay')?.classList.remove('active');
  }

  // ===== WISHLIST ENGINE =====
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    const p = state.products.find(x => x.id === productId);

    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`Removed from Wishlist`);
    } else {
      state.wishlist.push(productId);
      showToast(`Added to your Wishlist`, "heart-fill");
    }

    saveWishlist();
    renderProducts();
    renderFlashDeals();
  }

  function updateWishlistBadges() {
    const badge = $('wishlistBadge');
    const menuCount = $('menuWishCount');
    if (badge) badge.textContent = state.wishlist.length;
    if (menuCount) menuCount.textContent = state.wishlist.length;
  }

  // ===== MULTI-STEP CHECKOUT SYSTEM =====
  function openCheckoutModal() {
    if (!state.cart.length) {
      showToast("Your cart is empty!", "warn");
      return;
    }

    closeCartDrawer();
    closeProductDetailsModal();

    const modal = $('checkoutModalOverlay');
    const totals = calculateCartTotals();

    // Fill Price Details in Checkout Column
    $('coSumItemsLabel').textContent = `Price (${totals.count} Item${totals.count > 1 ? 's' : ''})`;
    $('coSumMrpTotal').textContent = money(totals.mrpTotal);
    $('coSumDiscount').textContent = `−${money(totals.discount + totals.couponDiscount)}`;
    $('coSumDelivery').textContent = totals.delivery === 0 ? 'FREE' : money(totals.delivery);
    $('coSumPackaging').textContent = totals.packagingFee === 0 ? 'FREE' : money(totals.packagingFee);
    $('coSumFinalPayable').textContent = money(totals.finalPayable);
    $('coSumSavingsNote').textContent = `You will save ${money(totals.totalSavings)} on this order`;
    $('coSubmitPaymentBtn').textContent = `CONFIRM & PAY ${money(totals.finalPayable)}`;

    // Render Order Items Summary Preview
    $('checkoutItemsList').innerHTML = state.cart.map(c => {
      const p = state.products.find(x => x.id === c.productId);
      if (!p) return '';
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; padding:6px 0; border-bottom:1px solid var(--border-subtle)">
          <span><strong>${p.name.slice(0, 32)}...</strong> × ${c.qty}</span>
          <strong>${money(p.price * c.qty)}</strong>
        </div>
      `;
    }).join('');

    // Pre-fill location
    if ($('coName') && !$('coName').value) $('coName').value = state.profile.name || '';
    if ($('coPhone') && !$('coPhone').value) $('coPhone').value = state.profile.phone || '';
    if ($('coCity')) $('coCity').value = state.userLocation.city;
    if ($('coPincode')) $('coPincode').value = state.userLocation.pincode;

    modal?.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeCheckoutModal() {
    $('checkoutModalOverlay')?.classList.remove('active');
    if (!document.querySelector('.modal-overlay.active')) {
      document.body.classList.remove('modal-open');
    }
  }

  async function handleOrderPayment(e) {
    e.preventDefault();

    const name = $('coName')?.value.trim() || '';
    const phone = $('coPhone')?.value.trim() || '';
    const pin = $('coPincode')?.value.trim() || '';
    const city = $('coCity')?.value.trim() || '';
    const addr = $('coAddress')?.value.trim() || '';

    if (!name || name.length < 2) {
      showToast("Please enter your full name", "warn");
      $('coName')?.focus();
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast("Please enter a valid 10-digit mobile number", "warn");
      $('coPhone')?.focus();
      return;
    }
    if (!/^\d{6}$/.test(pin)) {
      showToast("Please enter a valid 6-digit pincode", "warn");
      $('coPincode')?.focus();
      return;
    }
    if (!city || addr.length < 5) {
      showToast("Please enter your complete delivery address", "warn");
      $('coAddress')?.focus();
      return;
    }
    if (!state.cart.length) {
      showToast("Your cart is empty", "warn");
      closeCheckoutModal();
      return;
    }

    // Re-check every cart item immediately before placing the order.
    const invalidItem = state.cart.find(c => {
      const p = state.products.find(x => x.id === c.productId);
      return !p || c.qty < 1 || c.qty > Number(p.stock || 0);
    });
    if (invalidItem) {
      showToast("One or more cart items are no longer available. Please review your cart.", "warn");
      renderCart();
      closeCheckoutModal();
      return;
    }

    const payMethod = document.querySelector('input[name="checkoutPayment"]:checked')?.value || 'upi';
    const totals = calculateCartTotals();
    const btn = $('coSubmitPaymentBtn');
    if (!btn) return;

    if (payMethod === 'upi' && !UPI_RX.test($('coUpiId')?.value.trim() || '')) {
      showToast("Enter a valid UPI ID (e.g. name@okhdfcbank)", "warn");
      $('coUpiId')?.focus();
      return;
    }

    if (payMethod === 'card') {
      const cn = ($('coCardNum')?.value || '').replace(/\s/g, '');
      const ce = $('coCardExp')?.value || '';
      const cv = $('coCardCvv')?.value || '';
      if (!/^\d{16}$/.test(cn) || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(ce) || !/^\d{3}$/.test(cv)) {
        showToast("Check your card number, expiry and CVV", "warn");
        return;
      }
    }

    btn.disabled = true;
    btn.textContent = payMethod === 'cod' ? 'Placing Order...' : 'Processing Payment...';

    btn.disabled = true;
    btn.textContent = payMethod === 'cod' ? 'Placing Order...' : 'Processing Payment...';

    try {
      const deliveryDate = new Date(Date.now() + 3 * 864e5).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
      const orderItems = state.cart.map(c => {
        const p = state.products.find(x => x.id === c.productId);
        return { id: c.productId, name: p.name, price: Number(p.price), mrp: Number(p.mrp), qty: Number(c.qty), image: p.image || '' };
      });
      const orderRecord = {
        id: 'ZV' + Date.now().toString().slice(-10), date: new Date().toISOString(),
        customer: { name, phone, pincode: pin, city, address: addr }, items: orderItems,
        totals: { ...totals }, paymentMethod: payMethod.toUpperCase(),
        paymentStatus: payMethod === 'cod' ? 'Pending' : 'Demo Confirmed', status: 'Placed', estimatedDelivery: deliveryDate
      };

      let result;
      if (backendOnline) {
        result = await apiRequest('/orders/create', { method: 'POST', body: JSON.stringify({ order: orderRecord }) });
        state.orders = result.orders || [orderRecord, ...state.orders];
        state.products = result.products || state.products;
      } else {
        state.cart.forEach(c => { const prod = state.products.find(x => x.id === c.productId); prod.stock = Math.max(0, Number(prod.stock) - Number(c.qty)); });
        state.orders.unshift(orderRecord);
      }
      saveProducts();
      saveOrders();
      state.cart = []; state.appliedCoupon = null; saveCart(); renderCart();
      if ($('coName')) $('coName').value = name; if ($('coPhone')) $('coPhone').value = phone;
      if ($('coCity')) $('coCity').value = city; if ($('coPincode')) $('coPincode').value = pin; if ($('coAddress')) $('coAddress').value = addr;
      btn.disabled = false; btn.textContent = `CONFIRM & PAY ${money(totals.finalPayable)}`; closeCheckoutModal();
      const sid = $('successOrderIdDisplay'); const sdd = $('successDeliveryDate');
      if (sid) sid.textContent = `Order ID: ${orderRecord.id}`; if (sdd) sdd.textContent = deliveryDate;
      $('orderSuccessModalOverlay')?.classList.add('active'); document.body.classList.add('modal-open');
      showToast('Order placed successfully! Zenvora confirmed.', 'check');
    } catch (err) {
      console.error('Order placement failed:', err);
      btn.disabled = false; btn.textContent = `CONFIRM & PAY ${money(totals.finalPayable)}`;
      showToast(err.message || 'Could not place order', 'warn');
    }

  }

  // ===== MY ORDERS & SHIPMENT TRACKING MODAL =====
  function openOrdersModal() {
    const modal = $('ordersTrackingModalOverlay');
    const container = $('myOrdersContainer');
    if (!container) return;

    if (!state.orders.length) {
      container.innerHTML = `
        <div style="padding:40px; text-align:center; background:#fff; border-radius:4px">
          <div style="font-size:44px; margin-bottom:12px">${IC('box')}</div>
          <h3>You have no past orders yet</h3>
          <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px">When you place orders, live shipment tracking and order details will appear here.</p>
          <button class="btn-admin-primary" id="ordersModalShopBtn" style="margin:0 auto">Start Shopping</button>
        </div>
      `;
      $('ordersModalShopBtn')?.addEventListener('click', () => {
        modal.classList.remove('active');
        $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
      });
      modal.classList.add('active');
      return;
    }

    container.innerHTML = state.orders.map(order => {
      const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      // Tracking Steps calculation
      const stepNames = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
      const currentIdx = Math.max(0, stepNames.indexOf(order.status));
      const progressPercent = Math.min(100, Math.round((currentIdx / (stepNames.length - 1)) * 100));

      return `
        <div class="order-tracking-card">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:10px; margin-bottom:12px">
            <div>
              <span style="font-size:15px; font-weight:800; color:var(--zv-blue)">${order.id}</span>
              <span style="font-size:12px; color:var(--text-muted); margin-left:8px">Ordered on ${orderDate}</span>
            </div>
            <div>
              <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
            </div>
          </div>

          <!-- Zenvora Tracking Stepper -->
          <div class="tracking-stepper">
            <div class="tracking-line">
              <div class="tracking-line-progress" style="width:${progressPercent}%"></div>
            </div>
            ${stepNames.map((st, i) => `
              <div class="tracking-step ${i < currentIdx ? 'done' : (i === currentIdx ? 'active' : '')}">
                <div class="step-node">${i < currentIdx ? IC('check') : i + 1}</div>
                <div class="step-name">${st}</div>
              </div>
            `).join('')}
          </div>

          <!-- Items in order -->
          <div style="display:flex; flex-direction:column; gap:8px; margin:16px 0">
            ${order.items.map(item => `
              <div style="display:flex; align-items:center; gap:12px">
                <img src="${item.image}" alt="" style="width:40px; height:40px; object-fit:contain; border-radius:4px; border:1px solid var(--border-light)">
                <div style="flex:1">
                  <div style="font-size:13px; font-weight:600">${item.name}</div>
                  <div style="font-size:11px; color:var(--text-muted)">Qty: ${item.qty} · ${money(item.price)} each</div>
                </div>
                <div style="font-weight:700">${money(item.price * item.qty)}</div>
              </div>
            `).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px dashed var(--border-light); font-size:13px">
            <div>
              Deliver to: <strong>${order.customer.name}</strong> (${order.customer.city}) · <strong>${order.paymentMethod}</strong>
            </div>
            <div>
              Total Paid: <strong style="font-size:15px; color:var(--zv-blue)">${money(order.totals.finalPayable)}</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');

    modal.classList.add('active');
  }

  // ===== ADMIN PANEL CONTROLLER & AUTHENTICATION =====
  function openAdminGate() {
    if (state.isAdminLoggedIn) {
      enterAdminView();
    } else {
      $('adminPinInput').value = '';
      $('adminAuthError').textContent = '';
      $('adminAuthModalOverlay')?.classList.add('active');
      $('adminPinInput')?.focus();
    }
  }

  function verifyAdminPin() {
    const entered = $('adminPinInput').value.trim();
    if (entered === state.settings.adminPin) {
      state.isAdminLoggedIn = true;
      sessionStorage.setItem('zv_admin_auth', 'true');
      $('adminAuthModalOverlay')?.classList.remove('active');
      enterAdminView();
      showToast("Welcome back, Store Owner! Control panel unlocked.", "crown");
    } else {
      $('adminAuthError').textContent = "Incorrect Admin PIN. Please try again.";
      $('adminPinInput').focus();
    }
  }

  function enterAdminView() {
    state.isAdminLoggedIn = true;
    sessionStorage.setItem('zv_admin_auth', 'true');

    // Hide storefront if present (combined page mode)
    if ($('storefrontView')) $('storefrontView').style.display = 'none';

    // Standalone admin.html: root must be visible
    const root = $('adminViewRoot');
    if (root) {
      root.classList.add('active');
      root.style.display = 'flex';
    }

    // Never leave the PIN gate open
    $('adminAuthModalOverlay')?.classList.remove('active');

    window.scrollTo(0, 0);

    // Refresh all admin dashboard views (safe if functions exist)
    try {
      updateAdminKpis();
      if (typeof renderSalesChart === 'function') renderSalesChart();
      renderAdminProductsTable();
      renderAdminOrdersTable();
      renderAdminRecentOrders();
      renderAdminCouponsTable();
      renderAdminCustomersTable();
    } catch (err) {
      console.warn('Admin refresh:', err);
    }
  }

  function exitAdminView() {
    if (document.body.dataset.adminPage === 'true') {
      window.location.href = 'index.html';
      return;
    }
    $('adminViewRoot')?.classList.remove('active');
    if ($('storefrontView')) $('storefrontView').style.display = 'block';
    window.scrollTo(0, 0);
    renderProducts();
    renderFlashDeals();
  }

  function switchAdminPane(paneId) {
    state.activeAdminPane = paneId;
    document.querySelectorAll('.admin-menu-item').forEach(el => {
      el.classList.toggle('active', el.dataset.pane === paneId);
    });
    document.querySelectorAll('.admin-pane').forEach(el => {
      el.classList.toggle('active', el.id === paneId);
    });

    if (paneId === 'admPaneDashboard') {
      updateAdminKpis();
      renderSalesChart();
      renderAdminRecentOrders();
    } else if (paneId === 'admPaneProducts') {
      renderAdminProductsTable();
    } else if (paneId === 'admPaneOrders') {
      renderAdminOrdersTable();
    } else if (paneId === 'admPaneCoupons') {
      renderAdminCouponsTable();
    } else if (paneId === 'admPaneCustomers') {
      renderAdminCustomersTable();
    }
  }

  // ===== ADMIN KPIS & DASHBOARD =====
  function updateAdminKpis() {
    const totalRev = state.orders.reduce((sum, o) => sum + (o.totals ? o.totals.finalPayable : 0), 0);
    const lowStockCount = state.products.filter(p => p.stock <= 5).length;
    const uniqueCustomers = new Set(state.orders.map(o => o.customer ? o.customer.phone : '')).size;

    if ($('admKpiRevenue')) $('admKpiRevenue').textContent = money(totalRev);
    if ($('admKpiOrders')) $('admKpiOrders').textContent = state.orders.length;
    if ($('admKpiProducts')) $('admKpiProducts').textContent = state.products.length;
    if ($('admKpiCustomers')) $('admKpiCustomers').textContent = uniqueCustomers;
    if ($('admKpiLowStock')) $('admKpiLowStock').textContent = `${lowStockCount} Low stock items`;
    if ($('admProductBadge')) if ($('admProductBadge')) $('admProductBadge').textContent = state.products.length;
    if ($('admOrderBadge')) if ($('admOrderBadge')) $('admOrderBadge').textContent = state.orders.length;
  }

  // Canvas Sales Chart Renderer (No heavy external chart libraries needed!)
  function renderSalesChart() {
    const canvas = $('admSalesChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 240 * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = 240;
    ctx.clearRect(0, 0, w, h);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // Simulated realistic revenue data
    const values = [42000, 58000, 51000, 78000, 89000, 112000, 95000];
    const maxVal = 130000;
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    // Draw horizontal grid lines
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#868e96';

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      const labelVal = Math.round(maxVal - (maxVal / gridLines) * i);
      ctx.fillText(money(labelVal), 8, y + 4);
    }

    // Points calculation
    const points = values.map((val, i) => {
      const x = padding.left + (chartW / (days.length - 1)) * i;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      return { x, y, val };
    });

    // Area Fill Gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(40, 116, 240, 0.35)');
    gradient.addColorStop(1, 'rgba(40, 116, 240, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartH);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line Path
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.strokeStyle = '#2874f0';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Data Point Circles & Day Labels
    points.forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#2874f0';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Day label
      ctx.fillStyle = '#495057';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(days[i], pt.x, h - 14);
    });
  }

  // ===== ADMIN PRODUCTS CATALOG TABLE (CRUD) =====
  function renderAdminProductsTable() {
    const tbody = $('admProductsTbody');
    const countSummary = $('admProductCountSummary');
    if (!tbody) return;

    const search = ($('admProductSearchInput')?.value || '').toLowerCase().trim();
    const catFilter = $('admProductCatFilter')?.value || 'ALL';

    const filtered = state.products.filter(p => {
      if (catFilter !== 'ALL' && p.category !== catFilter) return false;
      if (search && !p.name.toLowerCase().includes(search) && !p.brand.toLowerCase().includes(search)) return false;
      return true;
    });

    if (countSummary) countSummary.textContent = `${filtered.length} Products`;

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:#888">No matching products found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td><img src="${p.image}" class="table-product-thumb" alt="${p.name}"></td>
        <td>
          <strong>${p.name}</strong><br>
          <small style="color:#6c757d">${p.brand}</small>
        </td>
        <td>${p.category}</td>
        <td><strong>${money(p.price)}</strong></td>
        <td style="color:#6c757d; text-decoration:line-through">${money(p.mrp)}</td>
        <td>
          <span style="font-weight:700; color:${p.stock <= 5 ? 'var(--zv-red)' : 'var(--text-main)'}">
            ${p.stock} units
          </span>
        </td>
        <td>${p.assured ? '<span class="status-badge delivered">Z-Assured</span>' : '<span style="color:#999">No</span>'}</td>
        <td>
          <button class="table-action-btn edit" data-adm-edit-id="${p.id}">Edit</button>
          <button class="table-action-btn delete" data-adm-del-id="${p.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // Open Add/Edit Product Modal
  function openAdminProductModal(productId = null) {
    const modal = $('adminProductModalOverlay');
    const form = $('admProductForm');
    const title = $('admProductModalTitle');

    if (productId) {
      const p = state.products.find(x => x.id === productId);
      if (!p) return;
      title.textContent = `Edit Product: ${p.name.slice(0, 24)}...`;
      $('prodFormId').value = p.id;
      $('prodFormName').value = p.name;
      $('prodFormCat').value = p.category;
      $('prodFormBrand').value = p.brand;
      $('prodFormPrice').value = p.price;
      $('prodFormMrp').value = p.mrp;
      $('prodFormStock').value = p.stock;
      $('prodFormRating').value = p.rating;
      $('prodFormImage').value = '';
      pendingImages = (p.images && p.images.length ? p.images : [p.image]).slice(0, 5);
      renderImgPreview();
      $('prodFormDesc').value = p.desc;
      $('prodFormAssured').value = String(p.assured);
      $('prodFormBadge').value = p.badge || '';
    } else {
      title.textContent = "Add New Product to Catalog";
      form.reset();
      pendingImages = [];
      renderImgPreview();
      $('prodFormId').value = '';
      $('prodFormRating').value = '4.5';
      $('prodFormStock').value = '50';
      $('prodFormAssured').value = 'true';
    }

    modal?.classList.add('active');
  }

  function handleSaveAdminProduct(e) {
    e.preventDefault();

    const id = $('prodFormId').value ? Number($('prodFormId').value) : Date.now();
    const name = $('prodFormName').value.trim();
    const category = $('prodFormCat').value;
    const brand = $('prodFormBrand').value.trim();
    const price = Number($('prodFormPrice').value);
    const mrp = Number($('prodFormMrp').value);
    const stock = Number($('prodFormStock').value);
    const rating = Number($('prodFormRating').value) || 4.5;
    const urlImg = $('prodFormImage').value.trim();
    const images = (/^https?:\/\//i.test(urlImg) ? [urlImg] : []).concat(pendingImages).slice(0, 5);
    const image = images[0];
    const desc = $('prodFormDesc').value.trim();
    const assured = $('prodFormAssured').value === 'true';
    const badge = $('prodFormBadge').value.trim();

    if (!name || price <= 0 || mrp <= 0) {
      showToast("Please fill all required product fields", "warn");
      return;
    }
    if (!image) {
      showToast("Add at least one real product photo", "warn");
      return;
    }

    const existingIndex = state.products.findIndex(p => p.id === id);

    const productPayload = {
      id,
      name,
      category,
      brand,
      price,
      mrp,
      stock,
      rating,
      reviewsCount: existingIndex > -1 ? state.products[existingIndex].reviewsCount : 120,
      image,
      images,
      assured,
      badge: badge || (offPercent(price, mrp) > 30 ? 'Top Deal' : ''),
      desc,
      specs: existingIndex > -1 && state.products[existingIndex].specs ? state.products[existingIndex].specs : {
        "Brand": brand,
        "Category": category,
        "Warranty": "1 Year Brand Warranty"
      }
    };

    if (existingIndex > -1) {
      state.products[existingIndex] = productPayload;
      showToast(`Updated “${name.slice(0, 20)}...”`);
    } else {
      state.products.unshift(productPayload);
      showToast(`Added “${name.slice(0, 20)}...” to catalog`, "sparkle");
    }

    saveProducts();
    $('adminProductModalOverlay')?.classList.remove('active');
  }

  function deleteAdminProduct(productId) {
    const p = state.products.find(x => x.id === productId);
    if (!p) return;

    if (confirm(`Are you sure you want to delete “${p.name}”?`)) {
      state.products = state.products.filter(x => x.id !== productId);
      saveProducts();
      showToast(`Deleted product from catalog`);
    }
  }

  // ===== ADMIN ORDERS MANAGEMENT TABLE =====
  function renderAdminOrdersTable() {
    const tbody = $('admOrdersTbody');
    const countSummary = $('admOrderCountSummary');
    if (!tbody) return;

    const search = ($('admOrderSearchInput')?.value || '').toLowerCase().trim();

    const filtered = state.orders.filter(o => {
      if (!search) return true;
      return o.id.toLowerCase().includes(search) || 
             (o.customer && o.customer.name.toLowerCase().includes(search));
    });

    if (countSummary) countSummary.textContent = `${filtered.length} Orders`;

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:#888">No customer orders placed yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
        <td>
          <strong>${o.customer.name}</strong><br>
          <small style="color:#6c757d">${IC('phone')} ${o.customer.phone}</small>
        </td>
        <td>${o.customer.city} (${o.customer.pincode})</td>
        <td>${o.items.map(i => `${i.name.slice(0, 18)}... × ${i.qty}`).join(', ')}</td>
        <td><strong>${money(o.totals.finalPayable)}</strong></td>
        <td>
          <select class="admin-status-select" data-order-status-id="${o.id}" style="padding:4px 8px; font-size:12px; font-weight:700">
            <option value="Placed" ${o.status === 'Placed' ? 'selected' : ''}>Placed</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <button class="table-action-btn edit" data-view-invoice-id="${o.id}">Invoice</button>
        </td>
      </tr>
    `).join('');
  }

  function renderAdminRecentOrders() {
    const tbody = $('admRecentOrdersTbody');
    if (!tbody) return;

    const recent = state.orders.slice(0, 5);
    if (!recent.length) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:#888">No orders yet. Place an order on the storefront to test live tracking!</td></tr>`;
      return;
    }

    tbody.innerHTML = recent.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer.name}</td>
        <td>${o.items.length} item(s)</td>
        <td><strong>${money(o.totals.finalPayable)}</strong></td>
        <td>${o.paymentMethod}</td>
        <td><span class="status-badge ${o.status.toLowerCase()}">${o.status}</span></td>
        <td><button class="table-action-btn edit" data-view-invoice-id="${o.id}">View</button></td>
      </tr>
    `).join('');
  }

  function updateOrderStatus(orderId, newStatus) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    saveOrders();
    showToast(`Order ${orderId} updated to “${newStatus}”`, "box");
  }

  // ===== ADMIN COUPONS TABLE =====
  function renderAdminCouponsTable() {
    const tbody = $('admCouponsTbody');
    if (!tbody) return;

    tbody.innerHTML = state.coupons.map((c, i) => `
      <tr>
        <td><strong style="color:var(--zv-blue)">${c.code}</strong></td>
        <td>${c.type === 'percent' ? `${c.value}% Off` : `₹${c.value} Flat Off`}</td>
        <td>${money(c.minSpend)}</td>
        <td>
          <span class="status-badge ${c.active ? 'delivered' : 'cancelled'}">
            ${c.active ? 'Active' : 'Disabled'}
          </span>
        </td>
        <td>
          <button class="table-action-btn edit" data-toggle-coupon="${c.code}">Toggle</button>
          <button class="table-action-btn delete" data-delete-coupon="${c.code}">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // ===== ADMIN CUSTOMERS TABLE =====
  function renderAdminCustomersTable() {
    const tbody = $('admCustomersTbody');
    if (!tbody) return;

    const customerMap = {};
    state.orders.forEach(o => {
      const p = o.customer.phone;
      if (!customerMap[p]) {
        customerMap[p] = {
          name: o.customer.name,
          phone: p,
          city: o.customer.city,
          orderCount: 0,
          totalSpent: 0
        };
      }
      customerMap[p].orderCount++;
      customerMap[p].totalSpent += o.totals.finalPayable;
    });

    const customers = Object.values(customerMap);
    if (!customers.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#888">No customers have placed orders yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = customers.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${c.phone}</td>
        <td>${c.city}</td>
        <td><strong>${c.orderCount}</strong></td>
        <td><strong style="color:var(--zv-green)">${money(c.totalSpent)}</strong></td>
      </tr>
    `).join('');
  }

  // ===== INVOICE VIEWER MODAL =====
  function viewInvoice(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const win = window.open('', '_blank');
    if (!win) {
      showToast("Please allow popups to view printable invoice", "warn");
      return;
    }

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Zenvora Tax Invoice – ${order.id}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
          .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2874f0; padding-bottom: 20px; }
          .logo { font-size: 24px; font-weight: 800; color: #2874f0; font-style: italic; }
          .meta { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 13px; }
          th { background: #f8f9fa; }
          .tot { margin-top: 20px; text-align: right; font-size: 16px; font-weight: 800; }
          .btn-print { margin-top: 30px; padding: 10px 20px; background: #2874f0; color: #fff; border: none; cursor: pointer; border-radius: 4px; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="hdr">
          <div>
            <div class="logo">Zenvora</div>
            <p style="font-size:12px; color:#666">Official Tax Invoice / Bill of Supply</p>
          </div>
          <div style="text-align:right">
            <h3>Invoice ID: ${order.id}</h3>
            <p style="font-size:12px; color:#666">Date: ${new Date(order.date).toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div class="meta">
          <div>
            <strong>Sold By:</strong><br>
            Zenvora Retail<br>
            GSTIN: [add your GSTIN]<br>
            Architect &amp; Store Owner: ${state.settings.creatorName}
          </div>
          <div>
            <strong>Billing &amp; Delivery Address:</strong><br>
            ${order.customer.name}<br>
            ${order.customer.address}<br>
            ${order.customer.city} - ${order.customer.pincode}<br>
            Phone: ${order.customer.phone}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(it => `
              <tr>
                <td>${it.name}</td>
                <td>${it.qty}</td>
                <td>₹${it.price.toLocaleString('en-IN')}</td>
                <td>₹${(it.price * it.qty).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="tot">
          Total Amount Paid: ₹${order.totals.finalPayable.toLocaleString('en-IN')}<br>
          <small style="font-size:12px; color:#28a745">Payment Method: ${order.paymentMethod}</small>
        </div>

        <button class="btn-print" onclick="window.print()">Print Invoice</button>
      </body>
      </html>
    `);
    win.document.close();
  }

  // ===== GLOBAL CLICK DELEGATION & EVENT BINDINGS =====
  function initGlobalEventDelegates() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      // 1. Add to Cart from Card
      const addCartBtn = target.closest('[data-add-cart]');
      if (addCartBtn) {
        e.stopPropagation();
        addToCart(Number(addCartBtn.dataset.addCart));
        return;
      }

      // 2. Buy Now from Card
      const buyNowBtn = target.closest('[data-buy-now]');
      if (buyNowBtn) {
        e.stopPropagation();
        const pid = Number(buyNowBtn.dataset.buyNow);
        addToCart(pid);
        openCheckoutModal();
        return;
      }

      // 3. Wishlist Toggle
      const wishBtn = target.closest('[data-wishlist-id]');
      if (wishBtn) {
        e.stopPropagation();
        toggleWishlist(Number(wishBtn.dataset.wishlistId));
        return;
      }

      // 4. Open Product Detail Modal by clicking Card
      const card = target.closest('.product-card');
      if (card && !target.closest('button')) {
        openProductDetailsModal(Number(card.dataset.productId));
        return;
      }

      // 5. Cart Quantity Increment/Decrement
      const cartInc = target.closest('[data-cart-inc]');
      if (cartInc) {
        updateCartQty(Number(cartInc.dataset.cartInc), 1);
        return;
      }

      const cartDec = target.closest('[data-cart-dec]');
      if (cartDec) {
        updateCartQty(Number(cartDec.dataset.cartDec), -1);
        return;
      }

      const cartRm = target.closest('[data-cart-rm]');
      if (cartRm) {
        updateCartQty(Number(cartRm.dataset.cartRm), -999);
        return;
      }

      // 6. Admin Table Product Actions
      const admEditBtn = target.closest('[data-adm-edit-id]');
      if (admEditBtn) {
        openAdminProductModal(Number(admEditBtn.dataset.admEditId));
        return;
      }

      const admDelBtn = target.closest('[data-adm-del-id]');
      if (admDelBtn) {
        deleteAdminProduct(Number(admDelBtn.dataset.admDelId));
        return;
      }

      // 7. View Invoice Action
      const invoiceBtn = target.closest('[data-view-invoice-id]');
      if (invoiceBtn) {
        viewInvoice(invoiceBtn.dataset.viewInvoiceId);
        return;
      }

      // 8. Toggle / Delete Coupon Action
      const toggleCpn = target.closest('[data-toggle-coupon]');
      if (toggleCpn) {
        const cpn = state.coupons.find(c => c.code === toggleCpn.dataset.toggleCoupon);
        if (cpn) {
          cpn.active = !cpn.active;
          saveCoupons();
          showToast(`Coupon ${cpn.code} is now ${cpn.active ? 'Active' : 'Disabled'}`);
        }
        return;
      }

      const delCpn = target.closest('[data-delete-coupon]');
      if (delCpn) {
        state.coupons = state.coupons.filter(c => c.code !== delCpn.dataset.deleteCoupon);
        saveCoupons();
        showToast("Coupon deleted");
        return;
      }

      // 9. Admin Sidebar Tabs
      const adminMenuItem = target.closest('.admin-menu-item');
      if (adminMenuItem) {
        switchAdminPane(adminMenuItem.dataset.pane);
        return;
      }
    });

    // Admin status change listener
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('admin-status-select')) {
        updateOrderStatus(e.target.dataset.orderStatusId, e.target.value);
      }
    });

    // Pincode Deliver Pill
    $('headerLocationBtn')?.addEventListener('click', () => {
      $('locationModalOverlay')?.classList.add('active');
    });

    $('closeLocationModalBtn')?.addEventListener('click', () => {
      $('locationModalOverlay')?.classList.remove('active');
    });

    $('saveLocationBtn')?.addEventListener('click', () => {
      const city = $('locCityInput').value.trim() || 'Mumbai';
      const pin = $('locPinInput').value.trim() || '400001';
      state.userLocation = { city, pincode: pin };
      store.set('zv_user_location', state.userLocation);
      $('hdrLocationText').textContent = `${city} ${pin}`;
      $('locationModalOverlay')?.classList.remove('active');
      showToast(`Delivery location set to ${city} (${pin})`, "pin");
    });

    // Account Dropdown Buttons
    $('headerCartBtn')?.addEventListener('click', openCartDrawer);
    $('closeCartBtn')?.addEventListener('click', closeCartDrawer);
    $('cartDrawerOverlay')?.addEventListener('click', closeCartDrawer);

    $('headerWishlistBtn')?.addEventListener('click', toggleWishlistView);
    $('menuWishlist')?.addEventListener('click', toggleWishlistView);

    $('menuMyOrders')?.addEventListener('click', openOrdersModal);
    $('closeOrdersModalBtn')?.addEventListener('click', () => {
      $('ordersTrackingModalOverlay')?.classList.remove('active');
    });

    $('headerAdminDirectBtn')?.addEventListener('click', openAdminGate);

    // Creator Spotlight Modal
    $('openCreatorModalBtn')?.addEventListener('click', () => {
      $('creatorModalOverlay')?.classList.add('active');
    });

    $('ftrCreatorBioBtn')?.addEventListener('click', () => {
      $('creatorModalOverlay')?.classList.add('active');
    });

    $('closeCreatorModalBtn')?.addEventListener('click', () => {
      $('creatorModalOverlay')?.classList.remove('active');
    });

    $('spotlightAdminLoginBtn')?.addEventListener('click', () => {
      $('creatorModalOverlay')?.classList.remove('active');
      openAdminGate();
    });

    // Admin Auth PIN Modal
    $('adminVerifyPinBtn')?.addEventListener('click', verifyAdminPin);
    $('adminPinInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyAdminPin();
    });
    $('closeAdminAuthBtn')?.addEventListener('click', () => {
      $('adminAuthModalOverlay')?.classList.remove('active');
    });

    // Admin Navbar Exit
    $('admExitToStoreBtn')?.addEventListener('click', exitAdminView);

    // Add Product Modal Triggers
    $('admNewProductTopBtn')?.addEventListener('click', () => openAdminProductModal());
    $('admOpenAddProductModalBtn')?.addEventListener('click', () => openAdminProductModal());
    $('closeAdmProductModalBtn')?.addEventListener('click', () => {
      $('adminProductModalOverlay')?.classList.remove('active');
    });
    $('cancelAdmProductBtn')?.addEventListener('click', () => {
      $('adminProductModalOverlay')?.classList.remove('active');
    });
    $('admProductForm')?.addEventListener('submit', handleSaveAdminProduct);

    // Add Coupon Modal Triggers
    $('admOpenAddCouponModalBtn')?.addEventListener('click', () => {
      $('admCouponForm').reset();
      $('adminCouponModalOverlay')?.classList.add('active');
    });
    $('closeAdmCouponModalBtn')?.addEventListener('click', () => {
      $('adminCouponModalOverlay')?.classList.remove('active');
    });
    $('cancelAdmCouponBtn')?.addEventListener('click', () => {
      $('adminCouponModalOverlay')?.classList.remove('active');
    });

    $('admCouponForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = $('couponFormCode').value.toUpperCase().trim();
      const type = $('couponFormType').value;
      const value = Number($('couponFormValue').value);
      const minSpend = Number($('couponFormMinSpend').value);

      if (!code || value <= 0) {
        showToast("Enter a valid coupon code and value", "warn");
        return;
      }

      state.coupons.unshift({ code, type, value, minSpend, active: true });
      saveCoupons();
      $('adminCouponModalOverlay')?.classList.remove('active');
      showToast(`Coupon ${code} created successfully!`, "tag");
    });

    // Reset Catalog Button
    $('admResetDemoDataBtn')?.addEventListener('click', () => {
      if (confirm("Reset catalog back to initial 15+ Zenvora items?")) {
        state.products = [...DEFAULT_PRODUCTS];
        saveProducts();
        showToast("Catalog reset to Zenvora sample data", "refresh");
      }
    });

    // Admin Search & Filter in Products Tab
    $('admProductSearchInput')?.addEventListener('input', renderAdminProductsTable);
    $('admProductCatFilter')?.addEventListener('change', renderAdminProductsTable);
    $('admOrderSearchInput')?.addEventListener('input', renderAdminOrdersTable);
    $('admViewAllOrdersBtn')?.addEventListener('click', () => switchAdminPane('admPaneOrders'));

    // Save Settings Button
    $('admSaveSettingsBtn')?.addEventListener('click', () => {
      state.settings.creatorName = $('cfgCreatorName').value.trim() || state.settings.creatorName;
      state.settings.creatorTitle = $('cfgCreatorTitle').value.trim() || state.settings.creatorTitle;
      state.settings.creatorBio = $('cfgCreatorBio').value.trim() || state.settings.creatorBio;
      state.settings.creatorPortfolio = $('cfgCreatorPortfolio').value.trim();
      state.settings.showCreatorBadge = $('cfgShowCreatorBadge').value === 'true';
      state.settings.storeName = $('cfgStoreName').value.trim() || state.settings.storeName;
      state.settings.freeShippingMin = Number($('cfgFreeShippingMin').value) || 500;
      state.settings.deliveryFee = Number($('cfgDeliveryFee').value) || 40;
      state.settings.adminPin = $('cfgAdminPin').value.trim() || 'admin123';

      saveSettings();
      showToast("Store & Creator settings updated successfully!", "save");
    });

    // Quick Edit Creator from Admin Sidebar
    $('admQuickEditCreatorBtn')?.addEventListener('click', () => {
      switchAdminPane('admPaneSettings');
      $('cfgCreatorName')?.focus();
    });

    // Data Export & Import
    $('admExportDataBtn')?.addEventListener('click', () => {
      const backup = {
        products: state.products,
        orders: state.orders,
        coupons: state.coupons,
        settings: state.settings,
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zenvora_backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Store backup exported successfully!", "download");
    });

    $('admImportDataBtn')?.addEventListener('click', () => {
      $('admImportFileInput')?.click();
    });

    $('admImportFileInput')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.products) state.products = data.products;
          if (data.orders) state.orders = data.orders;
          if (data.coupons) state.coupons = data.coupons;
          if (data.settings) state.settings = data.settings;

          saveProducts();
          saveOrders();
          saveCoupons();
          saveSettings();
          showToast("Store data imported and restored!", "sparkle");
        } catch (err) {
          showToast("Invalid JSON backup file", "warn");
        }
      };
      reader.readAsText(file);
    });

    // PDP Modal Actions
    $('closePdpModalBtn')?.addEventListener('click', closeProductDetailsModal);
    $('pdpAddToCartBtn')?.addEventListener('click', () => {
      if (state.currentPdpProduct) {
        addToCart(state.currentPdpProduct.id);
        closeProductDetailsModal();
        openCartDrawer();
      }
    });

    $('pdpBuyNowBtn')?.addEventListener('click', () => {
      if (state.currentPdpProduct) {
        addToCart(state.currentPdpProduct.id);
        closeProductDetailsModal();
        openCheckoutModal();
      }
    });

    $('pdpCheckPinBtn')?.addEventListener('click', () => {
      const pin = $('pdpPincodeInput').value.trim();
      if (/^\d{6}$/.test(pin)) {
        $('pdpDeliveryStatus').innerHTML = `Delivery by <b>Tomorrow, 5 PM</b> | Free Delivery to <b>${pin}</b>`;
        showToast(`Delivery available for ${pin}!`, "truck");
      } else {
        showToast("Enter a valid 6-digit Pincode", "warn");
      }
    });

    // Cart Drawer Checkout Button
    $('cartProceedCheckoutBtn')?.addEventListener('click', openCheckoutModal);

    // Coupon Apply in Cart
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'applyCouponBtn') {
        if (state.appliedCoupon) {
          state.appliedCoupon = null;
          showToast("Coupon removed");
          renderCart();
          return;
        }

        const code = $('cartCouponInput').value.toUpperCase().trim();
        const found = state.coupons.find(c => c.code === code && c.active);

        if (!found) {
          showToast("Invalid or inactive coupon code", "warn");
          return;
        }

        const totals = calculateCartTotals();
        if (totals.subtotal < found.minSpend) {
          showToast(`Coupon valid on orders above ${money(found.minSpend)}`, "warn");
          return;
        }

        state.appliedCoupon = found;
        showToast(`Coupon ${code} applied successfully!`, "tag");
        renderCart();
      }
    });

    // Checkout Flow Actions
    $('closeCheckoutModalBtn')?.addEventListener('click', closeCheckoutModal);
    $('coSubmitPaymentBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      handleOrderPayment(e);
    });

    // Payment Option Switcher in Checkout
    document.querySelectorAll('input[name="checkoutPayment"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-tab-row').forEach(row => row.classList.remove('selected'));
        e.target.closest('.payment-tab-row')?.classList.add('selected');

        const val = e.target.value;
        $('paneUpi').hidden = val !== 'upi';
        $('paneCard').hidden = val !== 'card';
        $('paneCod').hidden = val !== 'cod';
      });
    });

    // Card Input Auto Formatting
    $('coCardNum')?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    });

    $('coCardExp')?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{1,2})/, '$1/$2');
    });

    // Order Success Modal Actions
    $('continueShoppingSuccessBtn')?.addEventListener('click', () => {
      $('orderSuccessModalOverlay')?.classList.remove('active');
      $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
    });

    $('trackOrderSuccessBtn')?.addEventListener('click', () => {
      $('orderSuccessModalOverlay')?.classList.remove('active');
      openOrdersModal();
    });

    // Keyboard Shortcuts (Ctrl + Shift + A to open Admin Gate, Escape to close modals)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminGate();
      }
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeProductDetailsModal();
        closeCheckoutModal();
        $('ordersTrackingModalOverlay')?.classList.remove('active');
        $('creatorModalOverlay')?.classList.remove('active');
        $('adminAuthModalOverlay')?.classList.remove('active');
        $('adminProductModalOverlay')?.classList.remove('active');
        $('adminCouponModalOverlay')?.classList.remove('active');
        $('locationModalOverlay')?.classList.remove('active');
        $('orderSuccessModalOverlay')?.classList.remove('active');
      }
    });
  }

  // Keep storefront and admin data synchronized across browser tabs/windows.
  setInterval(() => { if (backendOnline) refreshBackendState(); }, 3000);

  // ===== BAR / MENU FIXES, REAL PHOTO UPLOAD, LIVE SYNC =====
  const UPI_RX = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
  let pendingImages = [];

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const k = Math.min(1, 700 / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * k);
          c.height = Math.round(img.height * k);
          const x = c.getContext('2d');
          x.fillStyle = '#fff';
          x.fillRect(0, 0, c.width, c.height);
          x.drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/jpeg', 0.72));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  function renderImgPreview() {
    const box = $('prodImgPreview');
    if (!box) return;
    box.innerHTML = pendingImages.map((src, i) => `
      <div class="img-prev-item">
        <img src="${src}" alt="Photo ${i + 1}">
        <button type="button" data-rm-img="${i}" aria-label="Remove photo">${IC('x')}</button>
        ${i === 0 ? '<span>Main</span>' : ''}
      </div>`).join('');
  }

  function toggleWishlistView() {
    state.wishlistOnly = !state.wishlistOnly;
    if (state.wishlistOnly) {
      state.activeCategory = "All Offers";
      document.querySelectorAll('.cat-item').forEach(el => el.classList.toggle('active', el.dataset.cat === "All Offers"));
    }
    $('headerWishlistBtn')?.classList.toggle('active-chip', state.wishlistOnly);
    renderProducts();
    showToast(state.wishlistOnly
      ? (state.wishlist.length ? `Showing your ${state.wishlist.length} liked product(s)` : "You haven't liked any product yet \u2013 tap the heart on a product")
      : "Showing all products", "heart");
    $('mainProductsGrid')?.scrollIntoView({ behavior: 'smooth' });
  }

  function openInfoModal(title, bodyHTML) {
    let ov = $('infoModalOverlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.className = 'modal-overlay';
      ov.id = 'infoModalOverlay';
      ov.innerHTML = `<div class="admin-modal-card" style="max-width:480px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h3 id="infoModalTitle"></h3><button class="modal-close-btn" id="infoModalClose" style="position:static" aria-label="Close">${IC('x')}</button></div><div id="infoModalBody" style="font-size:13px;line-height:1.6;color:#444"></div></div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('#infoModalClose')) ov.classList.remove('active'); });
    }
    $('infoModalTitle').textContent = title;
    $('infoModalBody').innerHTML = bodyHTML;
    ov.classList.add('active');
  }

  function openFaqModal() {
    const faqs = [
      ['Do I need an account to shop on Zenvora?', 'No. You can browse products without an account. You only need to provide the details required when placing an order.'],
      ['How do I set my delivery location?', 'Use the delivery location button in the header or choose Set Delivery Location on your first visit, then enter your city and 6-digit pincode.'],
      ['How do I add a product to my cart?', 'Open a product and choose Add to Cart, or use Add to Cart directly on a product card. Your cart is saved in this browser.'],
      ['How can I track my order?', 'Open Account and choose Orders & Tracking after placing an order. The demo storefront stores order history in your browser.'],
      ['How does free delivery work?', () => `Orders of ${money(state.settings.freeShippingMin)} or more qualify for free delivery. Smaller orders use the standard ${money(state.settings.deliveryFee)} delivery fee.`],
      ['Can I use coupons?', 'Yes. Enter an active coupon code in the cart before checkout. Coupon rules are controlled from the Owner Admin Panel.'],
      ['Are the product images real?', 'The catalog uses real product-photo URLs, and the Owner Admin Panel also lets you upload up to five product photos for a product.'],
      ['How do I contact Zenvora?', 'Use the Contact Us link in the footer. Replace the demo support email and company details with your real business details before launch.']
    ];
    const body = `<div class="faq-list">${faqs.map(([q,a],i) => {
      const answer = typeof a === 'function' ? a() : a;
      return `<details class="faq-item" ${i === 0 ? 'open' : ''}><summary>${q}<span>+</span></summary><div class="faq-answer">${answer}</div></details>`;
    }).join('')}</div>`;
    openInfoModal('Zenvora FAQ', body);
  }

  function loadSessionUser() {
    try {
      const phone = sessionStorage.getItem('zv_user_session');
      if (!phone) { state.currentUser = null; return; }
      const users = store.get('zv_users', []);
      state.users = users;
      state.currentUser = users.find(u => u.phone === phone) || null;
      if (state.currentUser) {
        state.profile = {
          name: state.currentUser.name,
          phone: state.currentUser.phone,
          city: state.currentUser.city || '',
          email: state.currentUser.email || ''
        };
        store.set('zv_profile', state.profile);
      }
    } catch (e) {
      state.currentUser = null;
    }
  }

  function refreshAccountUI() {
    loadSessionUser();
    const logged = !!state.currentUser;
    const first = logged ? (state.currentUser.name || '').split(' ')[0] : '';
    if ($('accountBtnText')) $('accountBtnText').textContent = first || 'Sign In';
    if ($('hdrUserRole')) $('hdrUserRole').textContent = logged ? 'Member' : 'Guest';
    const b = document.querySelector('#menuSuperCoins b');
    if (b) b.textContent = `${state.coins.bal} Coins`;

    // Update dropdown menu items for auth state
    const drop = $('accountDropdown');
    if (drop) {
      let logoutBtn = $('menuLogout');
      let signupHint = $('menuSignUpHint');
      if (logged) {
        if (signupHint) signupHint.remove();
        if (!logoutBtn) {
          const div = document.createElement('div');
          div.className = 'nav-dropdown-item';
          div.id = 'menuLogout';
          div.innerHTML = '<span>' + IC('lock') + '</span> Logout';
          drop.appendChild(div);
          div.addEventListener('click', logoutUser);
        }
      } else {
        if (logoutBtn) logoutBtn.remove();
        if (!signupHint) {
          const div = document.createElement('div');
          div.className = 'nav-dropdown-item';
          div.id = 'menuSignUpHint';
          div.style.cssText = 'background:#f0f4ff;font-weight:700;color:var(--zv-blue)';
          div.innerHTML = '<span>' + IC('user') + '</span> Create Account / Sign In';
          drop.insertBefore(div, drop.firstChild.nextSibling);
          div.addEventListener('click', () => openAuthModal('signup'));
        }
      }
    }
  }

  function openAuthModal(mode) {
    mode = mode === 'login' ? 'login' : 'signup';
    let ov = $('authModalOverlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.className = 'modal-overlay';
      ov.id = 'authModalOverlay';
      ov.innerHTML = `
        <div class="admin-modal-card" style="max-width:420px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h3 id="authModalTitle">Create Account</h3>
            <button class="modal-close-btn" id="authModalClose" style="position:static" aria-label="Close">${IC('x')}</button>
          </div>
          <p id="authModalSub" style="font-size:13px;color:#666;margin-bottom:14px">Join Zenvora for faster checkout and order tracking.</p>
          <div class="admin-form-group" style="margin-bottom:10px" id="authNameWrap">
            <label for="authName">Full Name *</label>
            <input id="authName" placeholder="e.g. Rahul Sharma" autocomplete="name">
          </div>
          <div class="admin-form-group" style="margin-bottom:10px">
            <label for="authPhone">Mobile Number *</label>
            <input id="authPhone" maxlength="10" placeholder="10-digit mobile" inputmode="numeric" autocomplete="tel">
          </div>
          <div class="admin-form-group" style="margin-bottom:10px" id="authEmailWrap">
            <label for="authEmail">Email (optional)</label>
            <input id="authEmail" type="email" placeholder="you@email.com" autocomplete="email">
          </div>
          <div class="admin-form-group" style="margin-bottom:10px">
            <label for="authPass">Password *</label>
            <div style="position:relative">
              <input id="authPass" type="password" placeholder="Min 4 characters" autocomplete="new-password" style="width:100%;padding-right:42px">
              <button type="button" id="authPassToggle" aria-label="Show password" title="Show / hide password" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#666;font-size:16px;padding:4px 6px;line-height:1">👁</button>
            </div>
          </div>
          <div class="admin-form-group" style="margin-bottom:14px" id="authCityWrap">
            <label for="authCity">City</label>
            <input id="authCity" placeholder="e.g. Mumbai">
          </div>
          <button class="btn-admin-primary" id="authSubmitBtn" style="width:100%;justify-content:center;margin-bottom:10px">Sign Up</button>
          <p style="text-align:center;font-size:13px;color:#555">
            <span id="authToggleText">Already have an account?</span>
            <button type="button" id="authToggleBtn" style="color:var(--zv-blue);font-weight:700;background:none;border:none;cursor:pointer;margin-left:4px">Sign In</button>
          </p>
        </div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click', e => {
        if (e.target === ov || e.target.closest('#authModalClose')) { ov.classList.remove('active'); if (!document.querySelector('.modal-overlay.active')) document.body.classList.remove('modal-open'); }
      });
      $('authSubmitBtn').addEventListener('click', submitAuthForm);
      $('authToggleBtn').addEventListener('click', () => {
        const isLogin = $('authModalTitle').textContent.includes('Sign In');
        setAuthMode(isLogin ? 'signup' : 'login');
      });
      $('authPassToggle')?.addEventListener('click', () => {
        const inp = $('authPass');
        const btn = $('authPassToggle');
        if (!inp || !btn) return;
        if (inp.type === 'password') {
          inp.type = 'text';
          btn.textContent = '🙈';
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          inp.type = 'password';
          btn.textContent = '👁';
          btn.setAttribute('aria-label', 'Show password');
        }
      });
    }
    setAuthMode(mode);
    ov.classList.add('active');
    document.body.classList.add('modal-open');
    setTimeout(() => $('authName')?.focus(), 50);
  }

  function setAuthMode(mode) {
    const isLogin = mode === 'login';
    if ($('authModalTitle')) $('authModalTitle').textContent = isLogin ? 'Sign In' : 'Create Account';
    if ($('authModalSub')) $('authModalSub').textContent = isLogin
      ? 'Welcome back! Sign in with your mobile & password.'
      : 'Join Zenvora for faster checkout and order tracking.';
    if ($('authNameWrap')) $('authNameWrap').style.display = isLogin ? 'none' : 'block';
    if ($('authEmailWrap')) $('authEmailWrap').style.display = isLogin ? 'none' : 'block';
    if ($('authCityWrap')) $('authCityWrap').style.display = isLogin ? 'none' : 'block';
    if ($('authSubmitBtn')) $('authSubmitBtn').textContent = isLogin ? 'Sign In' : 'Sign Up';
    if ($('authToggleText')) $('authToggleText').textContent = isLogin ? "Don't have an account?" : 'Already have an account?';
    if ($('authToggleBtn')) $('authToggleBtn').textContent = isLogin ? 'Sign Up' : 'Sign In';
    if ($('authPass')) {
      $('authPass').placeholder = isLogin ? 'Your password' : 'Min 4 characters';
      $('authPass').type = 'password';
    }
    if ($('authPassToggle')) {
      $('authPassToggle').textContent = '👁';
      $('authPassToggle').setAttribute('aria-label', 'Show password');
    }
    ovMode = mode;
  }

  let ovMode = 'signup';

  async function submitAuthForm() {
    const phone = ($('authPhone')?.value || '').trim();
    const pass = ($('authPass')?.value || '').trim();
    if (!/^[6-9]\d{9}$/.test(phone)) { showToast('Enter a valid 10-digit Indian mobile number', 'warn'); $('authPhone')?.focus(); return; }
    if (pass.length < 4) { showToast('Password must be at least 4 characters', 'warn'); $('authPass')?.focus(); return; }

    const name = ($('authName')?.value || '').trim();
    const email = ($('authEmail')?.value || '').trim();
    const city = ($('authCity')?.value || '').trim();

    try {
      let user;

      if (backendOnline) {
        // Prefer live API when the Node backend is reachable
        if (ovMode === 'signup') {
          if (name.length < 2) { showToast('Please enter your full name', 'warn'); $('authName')?.focus(); return; }
          user = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, phone, password: pass, email, city })
          });
          showToast('Account created! Welcome, ' + name.split(' ')[0], 'check');
        } else {
          user = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ phone, password: pass })
          });
          showToast('Signed in as ' + (user.name || '').split(' ')[0], 'check');
        }
        // Refresh users list only if we can (admin endpoint); never block login on it
        try {
          const users = await apiRequest('/users');
          if (Array.isArray(users)) {
            state.users = users;
            store.set('zv_users', users);
          }
        } catch (_) { /* non-admin callers skip this */ }
      } else {
        // Offline / no-server fallback using localStorage (demo mode)
        const users = store.get('zv_users', []);
        if (ovMode === 'signup') {
          if (name.length < 2) { showToast('Please enter your full name', 'warn'); $('authName')?.focus(); return; }
          if (users.some(u => u.phone === phone)) {
            showToast('This mobile is already registered. Please Sign In.', 'warn');
            return;
          }
          user = {
            id: 'U' + Date.now(),
            name,
            phone,
            email,
            city,
            createdAt: new Date().toISOString(),
            _localPass: btoa(pass)
          };
          users.push(user);
          store.set('zv_users', users);
          state.users = users;
          showToast('Account created! Welcome, ' + name.split(' ')[0], 'check');
        } else {
          const found = users.find(u => u.phone === phone);
          if (!found || found._localPass !== btoa(pass)) {
            showToast('Invalid mobile or password', 'warn');
            return;
          }
          user = found;
          showToast('Signed in as ' + (user.name || '').split(' ')[0], 'check');
        }
      }

      loginUser(user);
      $('authModalOverlay')?.classList.remove('active');
      if (!document.querySelector('.modal-overlay.active')) document.body.classList.remove('modal-open');
      renderAdminCustomersTable?.();
    } catch (err) {
      showToast(err.message || 'Authentication failed', 'warn');
    }
  }

  function loginUser(user) {
    state.currentUser = user;
    sessionStorage.setItem('zv_user_session', user.phone);
    state.profile = {
      name: user.name,
      phone: user.phone,
      city: user.city || '',
      email: user.email || ''
    };
    store.set('zv_profile', state.profile);
    refreshAccountUI();
    // Prefill checkout fields if present
    if ($('coName')) $('coName').value = user.name || '';
    if ($('coPhone')) $('coPhone').value = user.phone || '';
    if ($('coCity')) $('coCity').value = user.city || '';
  }

  function logoutUser() {
    state.currentUser = null;
    sessionStorage.removeItem('zv_user_session');
    state.profile = { name: '', phone: '', city: '', email: '' };
    store.set('zv_profile', state.profile);
    refreshAccountUI();
    showToast('Logged out successfully', 'info');
  }

  function openProfileModal() {
    if (!state.currentUser) {
      openAuthModal('signup');
      return;
    }
    const p = state.currentUser;
    openInfoModal('My Profile', `
      <p style="margin-bottom:10px;color:#777">Your Zenvora account (saved on this device).</p>
      <div class="admin-form-group" style="margin-bottom:8px"><label for="pfName">Full name</label><input id="pfName" value="${(p.name || '').replace(/"/g, '&quot;')}"></div>
      <div class="admin-form-group" style="margin-bottom:8px"><label for="pfPhone">Mobile</label><input id="pfPhone" maxlength="10" value="${p.phone || ''}" disabled style="opacity:.7"></div>
      <div class="admin-form-group" style="margin-bottom:8px"><label for="pfEmail">Email</label><input id="pfEmail" value="${(p.email || '').replace(/"/g, '&quot;')}"></div>
      <div class="admin-form-group" style="margin-bottom:12px"><label for="pfCity">City</label><input id="pfCity" value="${(p.city || '').replace(/"/g, '&quot;')}"></div>
      <button class="btn-admin-primary" id="pfSave" style="width:100%;justify-content:center">Update Profile</button>
      <button class="btn-admin-secondary" id="pfLogout" style="width:100%;justify-content:center;margin-top:8px">Logout</button>`);
    $('pfSave').addEventListener('click', () => {
      const name = $('pfName').value.trim();
      if (name.length < 2) return showToast('Enter your name', 'warn');
      const users = store.get('zv_users', []);
      const idx = users.findIndex(u => u.phone === p.phone);
      if (idx >= 0) {
        users[idx].name = name;
        users[idx].email = ($('pfEmail').value || '').trim();
        users[idx].city = ($('pfCity').value || '').trim();
        store.set('zv_users', users);
        state.users = users;
        loginUser(users[idx]);
      }
      $('infoModalOverlay').classList.remove('active');
      showToast('Profile updated', 'check');
    });
    $('pfLogout').addEventListener('click', () => {
      logoutUser();
      $('infoModalOverlay').classList.remove('active');
    });
  }

  function openCoinsModal() {
    const claimed = state.coins.last === new Date().toDateString();
    openInfoModal('Zen Coins', `
      <div style="text-align:center;padding:8px 0 14px"><div style="font-size:40px;font-weight:800;color:var(--zv-blue)">${IC('coin')} ${state.coins.bal}</div><div style="color:#777">coins in your wallet</div></div>
      <button class="btn-admin-primary" id="coinClaim" style="width:100%;justify-content:center" ${claimed ? 'disabled' : ''}>${claimed ? 'Daily bonus claimed \u2013 come back tomorrow' : 'Claim daily +10 coins'}</button>
      <p style="margin-top:10px;color:#777">Redeeming coins at checkout is not connected yet.</p>`);
    $('coinClaim')?.addEventListener('click', () => {
      state.coins = { bal: state.coins.bal + 10, last: new Date().toDateString() };
      store.set('zv_coins', state.coins);
      refreshAccountUI();
      showToast("+10 Zen Coins added", "coin");
      openCoinsModal();
    });
  }

  const FOOT_INFO = {
    ftrContactUs: ['Contact Us', 'Email: support@your-domain.com<br>Phone: add your support number.'],
    ftrAboutUs: ['About Us', 'Zenvora is a marketplace for electronics, fashion, beauty, home and more. Shop smarter. Live better.'],
    ftrCareers: ['Careers', 'No open roles right now.'],
    ftrZenvoraStories: ['Zenvora Stories', 'Stories from our community are coming soon.'],
    ftrPress: ['Press', 'Press enquiries: press@your-domain.com'],
    ftrCorporate: ['Corporate Information', 'Zenvora Retail Pvt. Ltd. &ndash; add your registered details here.'],
    ftrPayments: ['Payments', 'We accept UPI, cards and cash on delivery.'],
    ftrShipping: ['Shipping', () => `Free delivery on orders of ${money(state.settings.freeShippingMin)} and above; otherwise a ${money(state.settings.deliveryFee)} delivery fee applies.`],
    ftrCancellation: ['Cancellation & Returns', 'Cancel before shipping from Orders &amp; Tracking. Add your return window here.'],
        ftrReportInfringement: ['Report Infringement', 'Send details to legal@your-domain.com'],
    ftrCancellationPolicy: ['Cancellation Policy', 'Replace with your cancellation policy text.'],
    ftrTermsOfUse: ['Terms Of Use', 'Replace with your terms of use before launch.'],
    ftrSecurity: ['Security', 'Replace with your security statement.'],
    ftrPrivacy: ['Privacy', 'Replace with your privacy policy before collecting real customer data.'],
    ftrSitemap: ['Sitemap', 'Home &middot; Categories &middot; Cart &middot; Orders']
  };

  function initBarFixes() {
    // Account dropdown: click/tap to open (hover alone fails on touch devices)
    $('accountMenuBtn')?.addEventListener('click', e => {
      e.stopPropagation();
      loadSessionUser();
      if (!state.currentUser) {
        openAuthModal('signup');
        return;
      }
      $('accountDropdown')?.classList.toggle('show');
    });
    $('accountDropdown')?.addEventListener('click', () => setTimeout(() => $('accountDropdown').classList.remove('show'), 50));
    document.addEventListener('click', e => { if (!e.target.closest('.nav-dropdown-wrapper')) $('accountDropdown')?.classList.remove('show'); });
    $('menuMyProfile')?.addEventListener('click', openProfileModal);
    $('menuSuperCoins')?.addEventListener('click', openCoinsModal);
    $('brandLogoHome')?.addEventListener('click', e => { e.preventDefault(); resetAllFilters(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    Object.keys(FOOT_INFO).forEach(id => $(id)?.addEventListener('click', e => {
      e.preventDefault();
      const [t, b] = FOOT_INFO[id];
      openInfoModal(t, typeof b === 'function' ? b() : b);
    }));
    $('ftrFAQ')?.addEventListener('click', e => {
      e.preventDefault();
      openFaqModal();
    });
    $('verifyUpiBtn')?.addEventListener('click', () => {
      const ok = UPI_RX.test($('coUpiId').value.trim());
      showToast(ok ? "UPI ID looks valid" : "Enter a valid UPI ID (e.g. name@okhdfcbank)", ok ? "check" : "warn");
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') $('infoModalOverlay')?.classList.remove('active'); });

    // Real product photos in Add/Edit Product
    $('prodFormFiles')?.addEventListener('change', async e => {
      const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
      e.target.value = '';
      for (const f of files) {
        if (pendingImages.length >= 5) { showToast("Maximum 5 photos per product", "warn"); break; }
        try { pendingImages.push(await compressImage(f)); } catch (err) { showToast(`Could not read ${f.name}`, "warn"); }
      }
      renderImgPreview();
    });
    $('prodImgPreview')?.addEventListener('click', e => {
      const b = e.target.closest('[data-rm-img]');
      if (b) { pendingImages.splice(Number(b.dataset.rmImg), 1); renderImgPreview(); }
    });

    // Live sync: changes made in another open tab (e.g. admin) appear instantly
    window.addEventListener('storage', e => {
      if (!e.key || !e.key.startsWith('zv_')) return;
      state.products = store.get('zv_products', state.products);
      state.cart = store.get('zv_cart', state.cart);
      state.wishlist = store.get('zv_wishlist', state.wishlist);
      state.orders = store.get('zv_orders', state.orders);
      state.coupons = store.get('zv_coupons', state.coupons);
      renderProducts(); renderFlashDeals(); renderCart(); updateWishlistBadges();
      updateAdminKpis(); renderAdminProductsTable(); renderAdminOrdersTable(); renderAdminRecentOrders();
    });
    refreshAccountUI();
  }

  function initFirstVisitExperience() {
    const overlay = $('firstVisitOverlay');
    if (!overlay || localStorage.getItem('zv_first_visit_done') === '1') return;

    const finish = () => {
      localStorage.setItem('zv_first_visit_done', '1');
      overlay.classList.remove('show');
    };

    $('firstVisitBrowseBtn')?.addEventListener('click', () => {
      finish();
      setTimeout(() => openAuthModal('signup'), 300);
    });
    $('firstVisitLocationBtn')?.addEventListener('click', () => {
      finish();
      const modal = $('locationModalOverlay');
      if (modal) modal.classList.add('active');
      const city = $('locCityInput');
      if (city) setTimeout(() => city.focus(), 50);
    });

    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  // Public bridge used by the production backend integration.
  window.ZenvoraApp = {
    state,
    store,
    money,
    showToast,
    renderProducts,
    renderFlashDeals,
    renderCart,
    renderAdminProductsTable,
    renderAdminOrdersTable,
    renderAdminRecentOrders,
    updateAdminKpis,
    saveProducts,
    saveOrders,
    saveSettings,
    saveCoupons,
    openOrdersModal,
    openProductDetailsModal,
    openCheckoutModal,
    closeCheckoutModal,
    calculateCartTotals,
    addToCart,
    updateCartQty,
    toggleWishlist,
    toggleWishlistView,
    openCartDrawer,
    closeCartDrawer,
    updateWishlistBadges
  };

  // ===== INITIALIZATION ROUTINE =====
  async function initApp() {
    await loadBackendState();
    await seedBackendIfNeeded();
    await refreshBackendState();
    const isAdminPage = document.body.dataset.adminPage === 'true';
    applyCreatorSettingsToUI();

    // Keep session login across refreshes
    state.isAdminLoggedIn = sessionStorage.getItem('zv_admin_auth') === 'true';

    if (isAdminPage) {
      renderCategories();
      initGlobalEventDelegates();
      initBarFixes();
      // Already logged in → open panel immediately (no PIN again)
      if (state.isAdminLoggedIn) {
        enterAdminView();
        showToast("Welcome back — admin session restored", "crown");
      } else {
        openAdminGate();
      }
      console.log("Zenvora standalone Owner Admin initialized.");
      return;
    }

    loadSessionUser();
    renderCategories();
    initHeroSlider();
    initCountdownTimer();
    renderProducts();
    renderFlashDeals();
    renderCart();
    updateWishlistBadges();
    initSearchAutocomplete();
    initFilterAndSortListeners();
    initGlobalEventDelegates();
    initBarFixes();
    initFirstVisitExperience();

    // Check location
    if (state.userLocation && $('hdrLocationText')) {
      $('hdrLocationText').textContent = `${state.userLocation.city} ${state.userLocation.pincode}`;
    }

    console.log("Zenvora Storefront Engine Initialized Successfully.");
  }

  // Launch when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
