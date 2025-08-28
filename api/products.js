import { loadGames, withPrices, json } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { message: 'Method Not Allowed' });
  try {
    const { games, prices } = await loadGames();
    const enriched = games.map(g => withPrices(g, prices));
    return json(res, 200, enriched);
  } catch (e) {
    return json(res, 500, { message: 'تعذّر جلب المنتجات' });
  }
}
