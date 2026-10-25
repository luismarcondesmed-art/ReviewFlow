import { useEffect, useState } from 'react';
type ClockState = { mode: 'focus' | 'break'; remaining: number; deadline: number | null };
const key = 'reviewflow_focus_clock';
export const remainingSeconds = (deadline: number, now = Date.now()) => Math.max(0, Math.ceil((deadline - now) / 1000));
export function useFocusClock() {
  const [clock, setClock] = useState<ClockState>(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (saved && ['focus','break'].includes(saved.mode) && Number.isFinite(saved.remaining) && saved.remaining >= 0 && (saved.deadline === null || Number.isFinite(saved.deadline))) return saved;
    } catch { /* A fresh clock works without browser storage. */ }
    return { mode: 'focus', remaining: 1500, deadline: null };
  });
  const [now, setNow] = useState(Date.now());
  const timeLeft = clock.deadline === null ? clock.remaining : remainingSeconds(clock.deadline, now);
  useEffect(() => { try { sessionStorage.setItem(key, JSON.stringify(clock)); } catch { /* Session-only fallback. */ } }, [clock]);
  useEffect(() => {
    if (clock.deadline === null) return;
    const update = () => setNow(Date.now());
    const timer = window.setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', update); };
  }, [clock.deadline]);
  useEffect(() => {
    if (clock.deadline !== null && timeLeft === 0) setClock({ mode: clock.mode === 'focus' ? 'break' : 'focus', remaining: clock.mode === 'focus' ? 300 : 1500, deadline: null });
  }, [timeLeft, clock]);
  return { timeLeft, mode: clock.mode, isActive: clock.deadline !== null,
    pause: () => setClock(c => ({ ...c, remaining: c.deadline === null ? c.remaining : remainingSeconds(c.deadline), deadline: null })),
    toggle: () => { setNow(Date.now()); setClock(c => c.deadline === null ? { ...c, deadline: Date.now() + c.remaining * 1000 } : { ...c, remaining: remainingSeconds(c.deadline), deadline: null }); },
    setMode: (mode: ClockState['mode']) => setClock({mode,remaining:mode === 'focus' ? 1500 : 300,deadline:null}),
  };
}
