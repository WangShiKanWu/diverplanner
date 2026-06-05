import type { Recipe } from '../types';

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

const canUseBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const isDebugMode = () => {
  if (!canUseBrowser()) {
    return false;
  }

  return import.meta.env.DEV || new URLSearchParams(window.location.search).get('debug_analytics') === '1';
};

const withAnalyticsParams = (measurementId: string, params: EventParams = {}) => ({
  ...params,
  send_to: measurementId,
  ...(isDebugMode() ? { debug_mode: true } : {}),
});

const sendPageView = (measurementId: string, path: string, title: string, location: string) => {
  if (!canUseBrowser()) {
    return;
  }

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

  if (!measurementId || isInitialized || !canUseBrowser()) {
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

  if (!measurementId || !canUseBrowser() || !window.gtag) {
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

  if (!measurementId || !canUseBrowser() || !window.gtag) {
    return;
  }

  const analyticsParams = withAnalyticsParams(measurementId, params);

  if (import.meta.env.DEV) {
    console.debug('[analytics]', eventName, analyticsParams);
  }

  window.gtag('event', eventName, analyticsParams);
};

export const trackRecipeSearch = (searchTerm: string, resultCount: number) => {
  trackEvent('recipe_search', {
    search_term: searchTerm,
    result_count: resultCount,
  });
};

export const trackRecipeFilterClick = (filterName: string, resultCount: number) => {
  trackEvent('recipe_filter_click', {
    filter_name: filterName,
    result_count: resultCount,
  });
};

export const trackFacilityToggle = (facilityName: string, enabled: boolean) => {
  trackEvent('facility_toggle', {
    facility_name: facilityName,
    enabled,
  });
};

export const trackRecipeSelection = (recipe: Recipe | undefined, selectedCount: number, selected: boolean) => {
  const eventName = selected ? 'recipe_select' : 'recipe_unselect';

  trackEvent(eventName, {
    recipe_id: recipe?.id ?? 'unknown',
    recipe_name_cn: recipe?.nameZh ?? 'unknown',
    recipe_name_en: recipe?.nameEn ?? 'unknown',
    selected_count: selectedCount,
    price: recipe?.price ?? 0,
  });
};

export const trackPlanAction = (
  eventName: 'copy_plan' | 'export_txt',
  params: {
    selectedCount: number;
    fishRequirementCount: number;
    cropRequirementCount: number;
    seaweedRequirementCount: number;
    manualRequirementCount: number;
  },
) => {
  trackEvent(eventName, {
    selected_count: params.selectedCount,
    fish_requirement_count: params.fishRequirementCount,
    crop_requirement_count: params.cropRequirementCount,
    seaweed_requirement_count: params.seaweedRequirementCount,
    manual_requirement_count: params.manualRequirementCount,
  });
};

export const trackOutboundClick = (url: string, linkLabel: string, sourcePage = canUseBrowser() ? window.location.pathname : '') => {
  trackEvent('outbound_click', {
    url,
    link_label: linkLabel,
    source_page: sourcePage,
  });
};
