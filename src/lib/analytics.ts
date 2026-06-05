type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = () => import.meta.env.VITE_GA_MEASUREMENT_ID;
let initialPageViewPath: string | null = null;
let isInitialized = false;

const isDebugMode = () => {
  return import.meta.env.DEV || new URLSearchParams(window.location.search).get('debug_analytics') === '1';
};

const withAnalyticsParams = (measurementId: string, params: EventParams = {}) => ({
  ...params,
  send_to: measurementId,
  ...(isDebugMode() ? { debug_mode: true } : {}),
});

const sendPageView = (measurementId: string, path: string, title: string, location: string) => {
  window.gtag?.(
    'event',
    'page_view',
    withAnalyticsParams(measurementId, {
      page_title: title,
      page_location: location,
      page_path: path,
    }),
  );
};

export const initializeGA = () => {
  const measurementId = getMeasurementId();

  if (!measurementId || isInitialized) {
    return;
  }

  isInitialized = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  initialPageViewPath = window.location.pathname;
  window.gtag('js', new Date());
  window.gtag(
    'config',
    measurementId,
    withAnalyticsParams(measurementId, {
      send_page_view: false,
      page_title: document.title,
      page_location: window.location.href,
      page_path: initialPageViewPath,
    }),
  );
  sendPageView(measurementId, initialPageViewPath, document.title, window.location.href);
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

  sendPageView(measurementId, path, title, `${window.location.origin}${path}`);
};

export const trackEvent = (eventName: string, params?: EventParams) => {
  const measurementId = getMeasurementId();

  if (!measurementId || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, withAnalyticsParams(measurementId, params));
};
