// Disabled until server-side budgets, authentication and rate limiting exist.
export default function handler(_request: unknown, response: any) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(503).json({ ok: false, code: 'AI_DISABLED', error: 'IA desativada. Utilize o banco local gratuito.' });
}
