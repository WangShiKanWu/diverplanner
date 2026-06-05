type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = () => import.meta.env.VITE_GA_MEASUREMENT_ID;
let initialPageViewPath: string | null = null;

export const initializeGA = () => {
  const measurementId = getMeasurementId();

  if (!measurementId || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  initialPageViewPath = window.location.pathname;
  window.gtag('config', measurementId, { page_path: initialPageViewPath });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
};

export const trackPageView = (path: string, title: string) => {
  const measurementId = getMeasurementId();

  if (!measurementId || !window.gtag) {
    return;
  }

  if (path === initialPageViewPath) {
    initialPageViewPath = null;
    return;
  }

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  });
};

export const trackEvent = (eventName: string, params?: EventParams) => {
  if (!getMeasurementId() || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params ?? {});
};
