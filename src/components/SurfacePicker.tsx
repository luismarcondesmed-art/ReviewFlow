import type { UserConfig } from '../types';
export function SurfacePicker({value = 'mica', onChange}: {value?: UserConfig['surfaceStyle']; onChange: (value: UserConfig['surfaceStyle']) => void}) {
  return <fieldset className="rf-surface-picker"><legend>Estilo da interface</legend><div>{([
    ['mica','Mica suave','Camadas translúcidas e divisórias discretas.'],
    ['solid','Editorial','Superfícies sólidas, leitura tranquila.'],
    ['contrast','Contraste','Bordas e textos mais definidos.'],
  ] as const).map(([id,title,description]) => <button type="button" key={id} aria-pressed={value === id} onClick={() => onChange(id)}><i className={`rf-surface-sample ${id}`} aria-hidden="true"><span/><span/><span/></i><strong>{title}</strong><small>{description}</small></button>)}</div></fieldset>;
}
