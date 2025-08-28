import { loadGames, withPrices, json } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { message: 'Method Not Allowed' });
  try {
    const slug = (req.query && req.query.slug) || (req.url.split('products-')[1]);
    const { games, prices } = await loadGames();
    const game = games.find(g => g.slug === slug || g.id === slug);
    if (!game) return json(res, 404, { message: 'اللعبة غير موجودة' });
    return json(res, 200, withPrices(game, prices));
  } catch (e) {
    return json(res, 500, { message: 'تعذّر جلب تفاصيل اللعبة' });
  }
}
