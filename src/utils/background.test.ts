import { expect, it } from 'vitest';
import { backgroundIsDark, validBackground } from './background';
it('chooses a readable text theme even for saturated backgrounds', () => {
  expect(backgroundIsDark('#ffffff')).toBe(false);
  expect(backgroundIsDark('#000000')).toBe(true);
  expect(backgroundIsDark('#ffff00')).toBe(false);
  expect(backgroundIsDark('#0000ff')).toBe(true);
});
it('rejects malformed imported preferences', () => {
  for (const value of [undefined, 'red', '#fff', 'url(example.com)']) expect(validBackground(value)).toBe(false);
  expect(validBackground('#ABCDEF')).toBe(true);
});
