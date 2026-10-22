const { app, BrowserWindow, protocol, net, shell, Menu } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { localAsset, allowedExternal } = require('./security.cjs');

protocol.registerSchemesAsPrivileged([{ scheme: 'reviewflow', privileges: { standard: true, secure: true, supportFetchAPI: true, allowServiceWorkers: true, stream: true } }]);
app.enableSandbox();
const ownsLock = app.requestSingleInstanceLock();
if (!ownsLock) app.quit();
let mainWindow;
app.on('second-instance', () => { if (mainWindow) { if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus(); } });

const CSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com https://*.run.app; frame-src https://*.notion.site https://*.notion.so https://*.notion.com https://notion.so https://notion.com; object-src 'none'; base-uri 'self'; form-action 'self'";

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1320, height: 900, minWidth: 360, minHeight: 600,
    title: 'ReviewFlow 2.0', backgroundColor: '#19191d', show: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true, webviewTag: false },
  });
  const contents = mainWindow.webContents;
  contents.session.setPermissionRequestHandler((_contents, permission, callback) => {
    // Native notification permission belongs to the first-party document only.
    callback(permission === 'notifications' && _contents.getURL().startsWith('reviewflow://app/'));
  });
  contents.on('will-navigate', (event, url) => {
    if (!url.startsWith('reviewflow://app/')) { event.preventDefault(); if (allowedExternal(url)) void shell.openExternal(url); }
  });
  contents.setWindowOpenHandler(({ url }) => { if (allowedExternal(url)) void shell.openExternal(url); return { action: 'deny' }; });
  contents.on('will-attach-webview', event => event.preventDefault());
  mainWindow.once('ready-to-show', () => mainWindow.show());
  await mainWindow.loadURL('reviewflow://app/');
}

if (ownsLock) app.whenReady().then(async () => {
  protocol.handle('reviewflow', async request => {
    try {
      const file = localAsset(path.join(__dirname, '..', 'dist'), request.url);
      const response = await net.fetch(pathToFileURL(file).href);
      const headers = new Headers(response.headers);
      headers.set('Content-Security-Policy', CSP);
      headers.set('X-Content-Type-Options', 'nosniff');
      return new Response(response.body, { status: response.status, headers });
    } catch { return new Response('Arquivo não encontrado', { status: 404 }); }
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'ReviewFlow', submenu: [{ label: 'Sobre ReviewFlow 2.0', role: 'about' }, { type: 'separator' }, { label: 'Sair', role: 'quit' }] },
    { label: 'Editar', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }] },
    { label: 'Visualizar', submenu: [{ role: 'reload' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'togglefullscreen' }] },
  ]));
  await createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) void createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
