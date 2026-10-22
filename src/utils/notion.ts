// Accept the link or the iframe code copied by Notion, never arbitrary HTML.
export function notionURL(input: string): string {
  const raw = input.trim();
  if (!raw) return '';
  const source = /^<iframe\b/i.test(raw) ? raw.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] : raw;
  if (!source) throw new Error('Cole um link do Notion ou o código de Incorporar esta página.');
  let url: URL;
  try { url = new URL(source.replaceAll('&amp;', '&')); } catch { throw new Error('O link do Notion não é válido.'); }
  const hosts = ['notion.so', 'notion.site', 'notion.com'];
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !hosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host))) throw new Error('Use um link HTTPS de notion.so, notion.site ou notion.com.');
  return url.href;
}
export function safeNotionURL(input?: string) { try { return notionURL(input || ''); } catch { return ''; } }
