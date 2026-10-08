const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'zenvora-data.json');

app.use(express.json({ limit: '20mb' }));
app.use(express.static(__dirname));

const DEFAULT_SETTINGS = {
  creatorName: 'Zenvora',
  creatorTitle: 'Official Store',
  creatorBio: 'Smart shopping with trusted products and great deals.',
  creatorPortfolio: '',
  showCreatorBadge: true,
  storeName: 'Zenvora',
  freeShippingMin: 500,
  deliveryFee: 40,
  adminPin: 'admin123'
};

function emptyDb() {
  return { products: [], orders: [], users: [], coupons: [], settings: DEFAULT_SETTINGS };
}

function loadDb() {
  if (!fs.existsSync(DB_FILE)) {
    const db = emptyDb();
    saveDb(db);
    return db;
  }
  try {
    return { ...emptyDb(), ...JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) };
  } catch {
    return emptyDb();
  }
}

let db = loadDb();

function saveDb(next = db) {
  db = next;
  const temp = DB_FILE + '.tmp';
  fs.writeFileSync(temp, JSON.stringify(db, null, 2));
  fs.renameSync(temp, DB_FILE);
}

function adminOnly(req, res, next) {
  const pin = req.headers['x-admin-pin'];
  if (!pin || pin !== db.settings.adminPin) return res.status(401).json({ error: 'Admin authentication required' });
  next();
}

function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function checkPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(candidate, 'hex'));
}

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'Zenvora API' }));

app.get('/api/store', (req, res) => {
  res.json({
    products: db.products,
    orders: db.orders,
    users: db.users.map(publicUser),
    coupons: db.coupons,
    settings: db.settings
  });
});

app.post('/api/bootstrap', (req, res) => {
  if (db.products.length) return res.json({ ok: true, seeded: false });
  const body = req.body || {};
  db = {
    products: Array.isArray(body.products) ? body.products : [],
    orders: Array.isArray(body.orders) ? body.orders : [],
    users: [],
    coupons: Array.isArray(body.coupons) ? body.coupons : [],
    settings: { ...DEFAULT_SETTINGS, ...(body.settings || {}) }
  };
  saveDb(db);
  res.json({ ok: true, seeded: true });
});

app.put('/api/products', adminOnly, (req, res) => {
  if (!Array.isArray(req.body.products)) return res.status(400).json({ error: 'products must be an array' });
  db.products = req.body.products;
  saveDb();
  res.json({ ok: true, products: db.products });
});

app.put('/api/orders', adminOnly, (req, res) => {
  if (!Array.isArray(req.body.orders)) return res.status(400).json({ error: 'orders must be an array' });
  db.orders = req.body.orders;
  saveDb();
  res.json({ ok: true, orders: db.orders });
});

app.put('/api/coupons', adminOnly, (req, res) => {
  if (!Array.isArray(req.body.coupons)) return res.status(400).json({ error: 'coupons must be an array' });
  db.coupons = req.body.coupons;
  saveDb();
  res.json({ ok: true, coupons: db.coupons });
});

app.put('/api/settings', adminOnly, (req, res) => {
  db.settings = { ...db.settings, ...(req.body.settings || {}) };
  saveDb();
  res.json({ ok: true, settings: db.settings });
});

app.get('/api/users', adminOnly, (req, res) => res.json(db.users.map(publicUser)));

app.post('/api/auth/register', (req, res) => {
  const { name, phone, password, email = '', city = '' } = req.body || {};
  if (!name || !/^[6-9]\d{9}$/.test(phone) || !password || password.length < 4) {
    return res.status(400).json({ error: 'Please provide a valid name, mobile number and password' });
  }
  if (db.users.some(u => u.phone === phone)) return res.status(409).json({ error: 'This mobile is already registered. Please Sign In.' });
  const user = { id: 'U' + Date.now(), name, phone, email, city, passwordHash: hashPassword(password), createdAt: new Date().toISOString() };
  db.users.push(user);
  saveDb();
  res.status(201).json(publicUser(user));
});

app.post('/api/auth/login', (req, res) => {
  const { phone, password } = req.body || {};
  const user = db.users.find(u => u.phone === phone);
  if (!user || !checkPassword(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid mobile or password' });
  res.json(publicUser(user));
});

app.post('/api/orders/create', (req, res) => {
  const incoming = req.body?.order;
  if (!incoming || !Array.isArray(incoming.items) || !incoming.items.length) return res.status(400).json({ error: 'Invalid order' });

  for (const item of incoming.items) {
    const product = db.products.find(p => String(p.id) === String(item.id));
    if (!product) return res.status(400).json({ error: `Product ${item.id} is no longer available` });
    if (Number(item.qty) < 1 || Number(item.qty) > Number(product.stock || 0)) {
      return res.status(409).json({ error: `${product.name} does not have enough stock` });
    }
  }

  for (const item of incoming.items) {
    const product = db.products.find(p => String(p.id) === String(item.id));
    product.stock = Math.max(0, Number(product.stock || 0) - Number(item.qty));
  }

  const order = { ...incoming, date: incoming.date || new Date().toISOString(), status: incoming.status || 'Placed' };
  db.orders.unshift(order);
  saveDb();
  res.status(201).json({ ok: true, order, orders: db.orders, products: db.products });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  const file = path.join(__dirname, req.path === '/' ? 'index.html' : req.path);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return res.sendFile(file);
  res.status(404).send('Zenvora page not found');
});

app.listen(PORT, () => console.log(`Zenvora running at http://localhost:${PORT}`));
