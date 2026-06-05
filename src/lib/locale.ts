import type { Locale } from '../i18n/types';

const storageKey = 'diverplanner_locale';
export const locales: Locale[] = ['zh', 'en'];
const defaultLocale: Locale = 'zh';

export const isLocale = (value: string | undefined): value is Locale => value === 'zh' || value === 'en';

export const getStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(storageKey) ?? undefined;
  return isLocale(value) ? value : null;
};

export const setStoredLocale = (locale: Locale) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, locale);
};

export const detectBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') {
    return defaultLocale;
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh' : 'en';
};

export const getPreferredLocale = () => getStoredLocale() ?? detectBrowserLocale();

export const resolveLocaleFromPath = (pathname: string): Locale | null => {
  const segment = pathname.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : null;
};

export const getRouteWithoutLocale = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const routeSegments = isLocale(segments[0]) ? segments.slice(1) : segments;
  const route = `/${routeSegments.join('/')}`;
  return route === '/' ? '/' : route.replace(/\/$/, '');
};

export const getLocalizedPath = (pathname: string, targetLocale: Locale) => {
  const route = getRouteWithoutLocale(pathname);
  return route === '/' ? `/${targetLocale}` : `/${targetLocale}${route}`;
};

export const normalizeLocalizedPath = (pathname: string) => {
  const locale = resolveLocaleFromPath(pathname) ?? getPreferredLocale();
  return getLocalizedPath(pathname, locale);
};
