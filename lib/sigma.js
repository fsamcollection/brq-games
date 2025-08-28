import axios from 'axios';

const ENABLED = String(process.env.SIGMA_ENABLED || 'false').toLowerCase() === 'true';
const BASE_URL = process.env.SIGMA_BASE_URL || '';
const API_KEY = process.env.SIGMA_API_KEY || '';
const PARTNER_ID = process.env.SIGMA_PARTNER_ID || '';
const TIMEOUT = Number(process.env.SIGMA_TIMEOUT_MS || 15000);

export function buildSigmaPayload(order, game) {
  const productCode = game?.sigmaProductCodes?.[order.packageId] || order.packageId;
  return {
    partnerId: PARTNER_ID,
    orderRef: order.id,
    productCode,
    amount: order.amount,
    currency: order.currency,
    player: { id: order.playerId, server: order.serverRegion || undefined, email: order.email || undefined }
  };
}

export async function trySendToSigma(payload) {
  if (!ENABLED) return { sent: false, info: 'Sigma disabled — dry run', payload };
  if (!BASE_URL || !API_KEY) return { sent: false, info: 'Sigma missing config', payload };
  try {
    const res = await axios.post(`${BASE_URL}/orders`, payload, {
      timeout: TIMEOUT,
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }
    });
    return { sent: true, info: `Sigma accepted: ${res.status}` };
  } catch (err) {
    return { sent: false, info: `Sigma error: ${err?.response?.status || err.message}` };
  }
}
