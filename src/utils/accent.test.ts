import { describe, expect, it } from 'vitest';
import { accentPalette, contrastOnWhite, DEFAULT_ACCENT, normalizeAccent } from './accent';

describe('accent preference', () => {
  it('accepts saved hex colors and safely falls back for invalid imported preferences', () => {
    expect(normalizeAccent('#ABCDEF')).toBe('#abcdef');
    for (const value of [undefined, '', 'red', '#123', 'url(example.com)']) expect(normalizeAccent(value)).toBe(DEFAULT_ACCENT);
  });
  it('keeps white labels readable for light, dark and saturated custom colors', () => {
    for (const value of ['#ffffff', '#000000', '#ffff00', '#00ff00', '#ff00ff', DEFAULT_ACCENT]) {
      const palette = accentPalette(value);
      const button = palette['--accent-600'].split(' ').map(Number) as [number, number, number];
      expect(contrastOnWhite(button)).toBeGreaterThanOrEqual(4.5);
      expect(Object.keys(palette)).toHaveLength(11);
    }
  });
});
