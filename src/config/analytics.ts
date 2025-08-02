import ReactGA from 'react-ga4';

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Substitua pelo seu ID real

export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: process.env.NODE_ENV === 'development'
    });
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title
    });
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      action,
      category,
      label,
      value
    });
  }
};

export const trackConversion = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    ReactGA.gtag('event', eventName, parameters);
  }
};