import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/config/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Rastrear mudanças de página
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
};