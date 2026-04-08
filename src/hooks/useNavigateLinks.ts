import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INTERNAL_PATHS = ['/', '/about-us', '/get-in-touch', '/pricing', '/why-us', '/success-stories',
  '/products/ads', '/products/sight', '/products/shelf', '/products/reco', '/products/returns',
  '/blogs', '/tutorials', '/faqs', '/news', '/events', '/career', '/design-system'];

export function useNavigateLinks(containerRef: React.RefObject<HTMLElement | null>) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && INTERNAL_PATHS.some(p => href === p || href.startsWith(p + '/'))) {
        e.preventDefault();
        navigate(href);
        window.scrollTo(0, 0);
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener('click', handler);
    return () => { if (el) el.removeEventListener('click', handler); };
  }, [navigate, containerRef]);
}
