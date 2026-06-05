import type { Locale } from '../i18n/types';
import { trackEvent } from '../lib/analytics';
import { getLocalizedPath, setStoredLocale } from '../lib/locale';

interface LanguageSwitchProps {
  currentPath: string;
  locale: Locale;
  onSwitch: (path: string, locale: Locale) => void;
}

export const LanguageSwitch = ({ currentPath, locale, onSwitch }: LanguageSwitchProps) => {
  const targetLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  const label = locale === 'zh' ? 'English' : '中文';
  const targetPath = getLocalizedPath(currentPath, targetLocale);

  return (
    <button
      type="button"
      onClick={() => {
        setStoredLocale(targetLocale);
        trackEvent('language_switch', {
          from_language: locale,
          to_language: targetLocale,
          from_path: currentPath,
          to_path: targetPath,
        });
        onSwitch(targetPath, targetLocale);
      }}
      className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20"
    >
      {label}
    </button>
  );
};
