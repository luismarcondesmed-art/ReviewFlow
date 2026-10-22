export const BACKGROUND_PRESETS = [
  ['Porcelana', '#eeeef2'], ['Grafite', '#19191d'], ['Areia', '#f0e9df'],
  ['Bruma', '#e8edf4'], ['Lavanda', '#eeebf6'], ['Azul-noite', '#1d283c'],
] as const;
export const validBackground = (value?: string): value is string => typeof value === 'string' && /^#[\da-f]{6}$/i.test(value);
export function backgroundIsDark(value: string) {
  const channels = [1, 3, 5].map(i => parseInt(value.slice(i, i + 2), 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2] < .179;
}
export function applyBackground(value?: string) {
  const root = document.documentElement;
  if (validBackground(value)) { root.dataset.background = 'custom'; root.style.setProperty('--user-background', value); }
  else { delete root.dataset.background; root.style.removeProperty('--user-background'); }
}
