import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

export type DockState = 'floating' | 'docking' | 'docked' | 'undocking';

interface AgentMarkDockContextValue {
  dockRef: RefObject<HTMLDivElement>;
  dockState: DockState;
  setDockState: (s: DockState) => void;
  /** True when the dock element is in viewport per IntersectionObserver. */
  dockInView: boolean;
}

const AgentMarkDockContext = createContext<AgentMarkDockContextValue | null>(null);

export function AgentMarkDockProvider({ children }: { children: ReactNode }) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [dockState, setDockStateRaw] = useState<DockState>('floating');
  const [dockInView, setDockInView] = useState(false);

  const setDockState = useCallback((s: DockState) => {
    setDockStateRaw(s);
  }, []);

  // IntersectionObserver on the dock element. Trigger when dock is meaningfully in view.
  useEffect(() => {
    const el = dockRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    let mounted = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!mounted) return;
        // Use intersectionRatio to detect when ~40% of dock is visible
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        setDockInView(inView);
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );
    io.observe(el);

    // Initial measurement for deep-link case (already in view on mount)
    requestAnimationFrame(() => {
      if (!mounted) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visibleH = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const ratio = r.height > 0 ? visibleH / r.height : 0;
      if (ratio >= 0.35) setDockInView(true);
    });

    return () => {
      mounted = false;
      io.disconnect();
    };
  }, []);

  // Cleanup on unmount: reset to floating
  useEffect(() => {
    return () => setDockStateRaw('floating');
  }, []);

  const value = useMemo<AgentMarkDockContextValue>(
    () => ({ dockRef, dockState, setDockState, dockInView }),
    [dockState, setDockState, dockInView]
  );

  return (
    <AgentMarkDockContext.Provider value={value}>{children}</AgentMarkDockContext.Provider>
  );
}

export function useAgentMarkDock(): AgentMarkDockContextValue | null {
  return useContext(AgentMarkDockContext);
}
