import { Check } from 'lucide-react';
import { BACKGROUND_PRESETS, backgroundIsDark, validBackground } from '../utils/background';

export function BackgroundPicker({ value, onChange }: { value?: string; onChange: (color?: string) => void }) {
  const selected = validBackground(value) ? value : undefined;
  return <fieldset className="rf-accent-picker">
    <legend>Cor de fundo</legend>
    <p>Escolha o fundo do aplicativo. O texto se adapta para continuar legível. Aplique em Salvar alterações.</p>
    <div className="rf-accent-swatches">
      {BACKGROUND_PRESETS.map(([label, color]) => <button key={color} type="button" title={label} aria-label={label} aria-pressed={selected === color} style={{ backgroundColor: color, color: backgroundIsDark(color) ? '#fff' : '#27272f' }} onClick={() => onChange(color)}>{selected === color && <Check size={18} />}</button>)}
      <label className="rf-custom-color"><input aria-label="Cor de fundo personalizada" type="color" value={selected || '#eeeef2'} onChange={e => onChange(e.target.value)} /><span>Outra cor</span></label>
    </div>
    <div className="rf-accent-caption"><span>{selected?.toUpperCase() || 'Seguindo o tema'}</span><button type="button" onClick={() => onChange(undefined)}>Usar fundo do tema</button></div>
  </fieldset>;
}
