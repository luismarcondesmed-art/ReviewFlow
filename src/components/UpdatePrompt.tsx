import { useRegisterSW } from 'virtual:pwa-register/react';

export function UpdatePrompt() {
  const { needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(url, registration) {
      if (!registration) return;
      window.setInterval(() => { if (navigator.onLine) registration.update().catch(console.warn); }, 60 * 60 * 1000);
    },
  });
  if (!needRefresh) return null;
  return <aside role="status" className="fixed bottom-24 left-4 right-4 z-[200] mx-auto max-w-md rounded-2xl bg-slate-900 p-4 text-white shadow-xl">
    <p className="text-sm">Uma nova versão do ReviewFlow está pronta. Conclua sua edição antes de atualizar.</p>
    <div className="mt-3 flex gap-3">
      <button className="rounded-lg bg-blue-600 px-4 py-3" onClick={() => updateServiceWorker(true)}>Atualizar agora</button>
      <button className="px-4 py-3" onClick={() => setNeedRefresh(false)}>Depois</button>
    </div>
  </aside>;
}
