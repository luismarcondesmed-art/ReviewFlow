const path = require('node:path');

function localAsset(root, input) {
  const url = new URL(input);
  if (url.protocol !== 'reviewflow:' || url.hostname !== 'app') throw new Error('Invalid app origin');
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.includes('\\') || pathname.includes('\0')) throw new Error('Invalid path');
  const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error('Path outside application');
  return target;
}
function allowedExternal(input) {
  try { const url = new URL(input); return url.protocol === 'https:' && !url.username && !url.password; } catch { return false; }
}
module.exports = { localAsset, allowedExternal };
