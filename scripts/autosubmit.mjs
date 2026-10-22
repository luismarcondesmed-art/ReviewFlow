import { watch, readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
process.chdir(root);
function run(command, args, capture = false) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', windowsHide: true });
  if (result.status !== 0) throw new Error(result.stderr || `${command} falhou (${result.status}).`);
  return result.stdout?.trim() || '';
}
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function npmRun(script) {
  // cmd is used only for the fixed npm command, never for paths or user input.
  if (process.platform === 'win32') run('cmd.exe', ['/d', '/s', '/c', `npm run ${script}`]);
  else run(npm, ['run', script]);
}
const allowed = /^(src\/|desktop\/|public\/|api\/|tests\/|scripts\/|docs\/|\.github\/|(?:package(?:-lock)?\.json|index\.html|vite\.config\.ts|vitest\.config\.ts|tsconfig\.json|tailwind\.config\.cjs|postcss\.config\.cjs|vercel\.json|README\.md|\.gitignore|\.env\.example|\.update\.bat)$)/;
const forbidden = /(?:^|\/)(?:\.env(?!\.example$)|credentials|secrets|id_rsa|id_ed25519)|\.(?:pem|key|p12|pfx)$/i;
const permitted = path => (allowed.test(path) || !existsSync(path)) && !forbidden.test(path);
let busy = false;
let timer;
function submit() {
  if (busy) return;
  busy = true;
  try {
    const branch = run('git', ['branch', '--show-current'], true);
    if (!branch) throw new Error('HEAD destacado; envio interrompido.');
    const staged = run('git', ['diff', '--cached', '--name-only'], true);
    if (staged) throw new Error('Há arquivos preparados manualmente. Faça o commit ou retire-os do stage antes do envio automático.');
    const output = run('git', ['ls-files', '--modified', '--others', '--exclude-standard', '-z'], true);
    const files = [...new Set(output.split('\0').filter(Boolean))].filter(permitted);
    if (!files.length) {
      // Retry a previously committed update after a transient push failure.
      const ahead = run('git', ['rev-list', '--count', `origin/${branch}..HEAD`], true);
      if (Number(ahead) > 0) run('git', ['push', 'origin', branch]);
      return;
    }
    for (const file of files) {
      if (!existsSync(file) || /\.(?:png|jpg|jpeg|webp|ico|woff2?)$/i.test(file)) continue;
      const text = readFileSync(file, 'utf8');
      if (/(?:AIza[0-9A-Za-z_-]{35}|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(text)) throw new Error(`Possível credencial em ${file}. Envio interrompido.`);
    }
    // A concurrent save during validation must wait for the next validated snapshot.
    const before = files.map(p => existsSync(p) ? readFileSync(p).toString('base64') : null);
    npmRun('check');
    run('git', ['-c', 'core.safecrlf=false', 'diff', '--check']);
    npmRun('build');
    if (files.some((p, i) => (existsSync(p) ? readFileSync(p).toString('base64') : null) !== before[i])) throw new Error('Arquivos mudaram durante o build; aguardando nova validação.');
    const afterFiles = run('git', ['ls-files', '--modified', '--others', '--exclude-standard', '-z'], true).split('\0').filter(Boolean).filter(permitted);
    if (afterFiles.some(p => !files.includes(p))) throw new Error('Novos arquivos durante a validação; aguardando nova validação.');
    const tracked = new Set(run('git', ['ls-files', '-z'], true).split('\0'));
    const modified = files.filter(p => tracked.has(p));
    const created = files.filter(p => !tracked.has(p));
    if (modified.length) run('git', ['add', '-u', '--', ...modified]);
    if (created.length) run('git', ['add', '--', ...created]);
    if (!run('git', ['diff', '--cached', '--name-only'], true)) return;
    run('git', ['commit', '-m', `chore: validated ReviewFlow update ${new Date().toISOString()}`]);
    run('git', ['push', 'origin', branch]);
    console.log('Atualização validada e enviada ao GitHub.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
  finally { busy = false; }
}
if (process.argv.includes('--once')) submit();
else {
  console.log('Envio automático ativo. Aguarda 60 segundos sem edições, valida, faz commit e push. Ctrl+C encerra.');
  watch(root, { recursive: true }, (_, file) => {
    if (!file) return;
    const path = file.replaceAll('\\', '/');
    if (!allowed.test(path) || forbidden.test(path)) return;
    clearTimeout(timer); timer = setTimeout(submit, 60000);
  });
  setInterval(submit, 5 * 60 * 1000);
}
