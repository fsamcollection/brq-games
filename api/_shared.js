import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const DATA_DIR = path.join(root, 'data');
const GAMES_FILE = path.join(DATA_DIR, 'games.json');
const PRICES_FILE = path.join(DATA_DIR, 'prices.json');

export async function loadGames() {
  const [g, p] = await Promise.all([
    fs.readFile(GAMES_FILE, 'utf8'),
    fs.readFile(PRICES_FILE, 'utf8')
  ]);
  return { games: JSON.parse(g), prices: JSON.parse(p) };
}

export function withPrices(game, prices) {
  const gp = { ...game, prices: {}, startPrice: 0 };
  let start = null;
  const available = [];
  for (const p of game.packages) {
    const price = prices[game.id]?.[p.id];
    if (price != null && !Number.isNaN(Number(price))) {
      gp.prices[p.id] = Number(price);
      available.push(p);
      start = start == null ? Number(price) : Math.min(start, Number(price));
    }
  }
  gp.packages = available;
  gp.startPrice = start ?? 0;
  return gp;
}

export function json(res, code, data) {
  res.statusCode = code; res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}
