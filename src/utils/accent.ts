export const DEFAULT_ACCENT = '#6264cf';
export const ACCENT_PRESETS = [
  ['Íris', '#6264cf'], ['Azul', '#2563eb'], ['Violeta', '#9333ea'],
  ['Rosa', '#db2777'], ['Terracota', '#c25032'], ['Âmbar', '#b77909'],
] as const;

export function normalizeAccent(value?: string): string {
  return /^#[0-9a-f]{6}$/i.test(value || '') ? value!.toLowerCase() : DEFAULT_ACCENT;
}

type RGB = [number, number, number];
const mix = (rgb: RGB, target: number, amount: number): RGB => rgb.map(c => Math.round(c + (target - c) * amount)) as RGB;
export function contrastOnWhite(rgb: RGB): number {
  const linear = rgb.map(c => c / 255 <= .04045 ? c / 255 / 12.92 : ((c / 255 + .055) / 1.055) ** 2.4);
  return 1.05 / (.2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2] + .05);
}

export function accentPalette(value?: string): Record<string, string> {
  const color = normalizeAccent(value);
  const rgb = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16)) as RGB;
  let strong = rgb;
  // Keep white button labels readable even for very light custom colors.
  for (let i = 0; contrastOnWhite(strong) < 4.5 && i < 100; i++) strong = mix(strong, 0, .04);
  const shades: Record<number, RGB> = {
    50: mix(strong, 255, .95), 100: mix(strong, 255, .9), 200: mix(strong, 255, .75),
    300: mix(strong, 255, .6), 400: mix(strong, 255, .45), 500: strong, 600: strong,
    700: mix(strong, 0, .16), 800: mix(strong, 0, .3), 900: mix(strong, 0, .5), 950: mix(strong, 0, .7),
  };
  return Object.fromEntries(Object.entries(shades).map(([shade, rgb]) => [`--accent-${shade}`, rgb.join(' ')]));
}

export function applyAccent(value?: string) {
  for (const [key, color] of Object.entries(accentPalette(value))) document.documentElement.style.setProperty(key, color);
}
