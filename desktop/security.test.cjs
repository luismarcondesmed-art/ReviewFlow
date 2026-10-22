const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { localAsset, allowedExternal } = require('./security.cjs');
test('packaged asset paths stay under the dist directory', () => {
  const root = path.resolve('dist');
  assert.equal(localAsset(root, 'reviewflow://app/'), path.join(root, 'index.html'));
  assert.equal(localAsset(root, 'reviewflow://app/assets/app.js'), path.join(root, 'assets', 'app.js'));
  for (const url of ['https://app/file', 'reviewflow://evil/file', 'reviewflow://app/%2e%2e%2fsecret', 'reviewflow://app/%5csecret', 'reviewflow://app/%00']) assert.throws(() => localAsset(root, url));
});
test('OS link handling only accepts HTTPS URLs', () => {
  assert.equal(allowedExternal('https://www.notion.so/example'), true);
  for (const url of ['file:///etc/passwd', 'javascript:alert(1)', 'reviewflow://app/', 'https://user:password@example.com', 'bad']) assert.equal(allowedExternal(url), false);
});
