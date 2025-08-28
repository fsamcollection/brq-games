import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import { buildSigmaPayload, trySendToSigma } from './lib/sigma.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const PRICES_FILE = path.join(__dirname, 'prices.json');
const GAMES_FILE = path.join(DATA_DIR, 'games.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

async function ensureOrdersFile() {
  try { await fs.access(ORDERS_FILE); }
  catch { await fs.writeFile(ORDERS_FILE, '[]', 'utf8'); }
}

function withPrices(game, prices) {
  const gp = { ...game };
  gp.prices = {};
  let startPrice = null;
  for (const p of game.packages) {
    const price = prices[game.id]?.[p.id];
    gp.prices[p.id] = price ?? null;
    if (price != null) startPrice = startPrice == null ? price : Math.min(startPrice, price);
  }
  gp.startPrice = startPrice ?? 0;
  return gp;
}

// API routes
app.get('/api/products', async (req, res) => {
  try {
    const [gamesRaw, pricesRaw] = await Promise.all([
      fs.readFile(GAMES_FILE, 'utf8'),
      fs.readFile(PRICES_FILE, 'utf8'),
    ]);
    const games = JSON.parse(gamesRaw);
    const prices = JSON.parse(pricesRaw);
    const enriched = games.map(g => withPrices(g, prices));
    res.json(enriched);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'تعذّر جلب المنتجات' });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const [gamesRaw, pricesRaw] = await Promise.all([
      fs.readFile(GAMES_FILE, 'utf8'),
      fs.readFile(PRICES_FILE, 'utf8'),
    ]);
    const games = JSON.parse(gamesRaw);
    const prices = JSON.parse(pricesRaw);
    const game = games.find(g => g.slug === slug || g.id === slug);
    if (!game) return res.status(404).json({ message: 'اللعبة غير موجودة' });
    res.json(withPrices(game, prices));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'تعذّر جلب تفاصيل اللعبة' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { productId, packageId, playerId, serverRegion, email } = req.body || {};
    if (!productId || !packageId || !playerId) {
      return res.status(400).json({ message: 'يرجى تعبئة الحقول المطلوبة' });
    }

    const [gamesRaw, pricesRaw] = await Promise.all([
      fs.readFile(GAMES_FILE, 'utf8'),
      fs.readFile(PRICES_FILE, 'utf8'),
      ensureOrdersFile(),
    ]);
    const games = JSON.parse(gamesRaw);
    const prices = JSON.parse(pricesRaw);

    const game = games.find(g => g.id === productId || g.slug === productId);
    if (!game) return res.status(404).json({ message: 'اللعبة غير موجودة' });
    const price = prices[game.id]?.[packageId];
    if (price == null) return res.status(400).json({ message: 'الباقة غير متاحة' });

    const order = {
      id: nanoid(10),
      createdAt: new Date().toISOString(),
      productId: game.id,
      packageId,
      playerId,
      serverRegion: serverRegion || null,
      email: email || null,
      amount: price,
      currency: game.currency || 'SAR',
      status: 'pending'
    };

    await ensureOrdersFile();
    const orders = JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8'));
    orders.push(order);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');

    const sigmaPayload = buildSigmaPayload(order, game);
    const sigmaResult = await trySendToSigma(sigmaPayload);
    if (sigmaResult.sent) {
      order.status = 'processing';
      await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
    }

    res.json({ orderId: order.id, status: order.status, sigma: sigmaResult.info });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'تعذّر إنشاء الطلب' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`▶️  Server running on http://localhost:${PORT}`));
