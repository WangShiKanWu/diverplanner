import { trackEvent } from '../lib/analytics';
import type { Locale } from '../i18n/types';
import { uiText } from '../i18n/locales';
import { LanguageSwitch } from './LanguageSwitch';

interface HeaderProps {
  compact?: boolean;
  currentPath: string;
  locale: Locale;
  onLocaleSwitch: (path: string, locale: Locale) => void;
}

const navClassName = (active: boolean) =>
  [
    'rounded-full px-3 py-1.5 text-sm font-bold text-white transition',
    active ? 'bg-white/25 shadow-sm' : 'bg-white/10 hover:bg-white/20',
  ].join(' ');

export const Header = ({ compact = false, currentPath, locale, onLocaleSwitch }: HeaderProps) => {
  const text = uiText[locale];
  const plannerPath = `/${locale}`;
  const guidePath = `/${locale}/guide`;
  const aboutPath = `/${locale}/about`;
  const faqPath = `/${locale}/faq`;

  return (
  <header className="rounded-b-[2rem] bg-gradient-to-br from-ocean-800 via-ocean-700 to-reef-700 px-5 py-8 text-white shadow-soft md:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-[0.2em] text-ocean-100">{text.header.brand}</p>
        <nav className="flex flex-wrap items-center gap-2">
          <a
            href={plannerPath}
            onClick={() => trackEvent('nav_click', { nav_label: text.nav.planner, destination: plannerPath })}
            className={navClassName(currentPath === plannerPath)}
          >
            {text.nav.planner}
          </a>
          <a
            href={guidePath}
            onClick={() => trackEvent('nav_click', { nav_label: text.nav.guide, destination: guidePath })}
            className={navClassName(currentPath === guidePath)}
          >
            {text.nav.guide}
          </a>
          <a
            href={aboutPath}
            onClick={() => trackEvent('nav_click', { nav_label: text.nav.about, destination: aboutPath })}
            className={navClassName(currentPath === aboutPath)}
          >
            {text.nav.about}
          </a>
          <a
            href={faqPath}
            onClick={() => trackEvent('nav_click', { nav_label: text.nav.faq, destination: faqPath })}
            className={navClassName(currentPath === faqPath)}
          >
            {text.nav.faq}
          </a>
          <LanguageSwitch currentPath={currentPath} locale={locale} onSwitch={onLocaleSwitch} />
        </nav>
      </div>
      {!compact && (
        <div>
          <h1 className="text-3xl font-bold md:text-5xl">{text.header.title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ocean-100 md:text-lg">
            {text.header.subtitle}
          </p>
        </div>
      )}
    </div>
  </header>
  );
};
