import { Check } from 'lucide-react';
import { ACCENT_PRESETS, DEFAULT_ACCENT, normalizeAccent } from '../utils/accent';

export function AccentPicker({ value, onChange }: { value?: string; onChange: (color: string) => void }) {
  const selected = normalizeAccent(value);
  return <fieldset className="rf-accent-picker">
    <legend>Cor de destaque</legend>
    <p>Personalize botões, navegação e seleções. Salve as alterações para aplicar.</p>
    <div className="rf-accent-swatches">
      {ACCENT_PRESETS.map(([label, color]) => <button key={color} type="button" title={label} aria-label={label} aria-pressed={selected === color} style={{ backgroundColor: color }} onClick={() => onChange(color)}>{selected === color && <Check size={18} />}</button>)}
      <label className="rf-custom-color" title="Escolher outra cor"><input aria-label="Cor de destaque personalizada" type="color" value={selected} onChange={e => onChange(e.target.value)} /><span>Outra cor</span></label>
    </div>
    <div className="rf-accent-caption"><span>{selected.toUpperCase()}</span><button type="button" onClick={() => onChange(DEFAULT_ACCENT)}>Restaurar padrão</button></div>
  </fieldset>;
}
