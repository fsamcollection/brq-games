import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
import { loadGames, json } from './_shared.js';
import { buildSigmaPayload, trySendToSigma } from '../lib/sigma.js';

const TMP = '/tmp';
const ORDERS_FILE = path.join(TMP, 'orders.json');

async function ensureTmpOrders() {
  try { await fs.access(ORDERS_FILE); }
  catch { await fs.writeFile(ORDERS_FILE, '[]', 'utf8'); }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { message: 'Method Not Allowed' });
  try {
    const body = await new Promise((resolve, reject) => {
      let d=''; req.on('data', c => d+=c); req.on('end',()=>resolve(JSON.parse(d||'{}'))); req.on('error',reject);
    });

    const { productId, packageId, playerId, serverRegion, email } = body;
    if (!productId || !packageId || !playerId) return json(res, 400, { message: 'يرجى تعبئة الحقول المطلوبة' });

    const { games, prices } = await loadGames();
    const game = games.find(g => g.id === productId || g.slug === productId);
    if (!game) return json(res, 404, { message: 'اللعبة غير موجودة' });
    const amount = prices?.[game.id]?.[packageId];
    if (amount == null) return json(res, 400, { message: 'الباقة غير متاحة' });

    const order = {
      id: nanoid(10),
      createdAt: new Date().toISOString(),
      productId: game.id,
      packageId,
      playerId,
      serverRegion: serverRegion || null,
      email: email || null,
      amount: Number(amount),
      currency: game.currency || 'SAR',
      status: 'pending'
    };

    await ensureTmpOrders();
    const arr = JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8'));
    arr.push(order);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(arr, null, 2), 'utf8');

    const payload = buildSigmaPayload(order, game);
    const sigma = await trySendToSigma(payload);
    if (sigma.sent) order.status = 'processing';

    return json(res, 200, { orderId: order.id, status: order.status, sigma: sigma.info });
  } catch (e) {
    return json(res, 500, { message: 'تعذّر إنشاء الطلب' });
  }
}
