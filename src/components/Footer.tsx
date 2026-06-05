import { getFeedbackUrl, openFeedback } from '../lib/feedback';
import { trackEvent } from '../lib/analytics';
import type { Locale } from '../i18n/types';
import { uiText } from '../i18n/locales';

interface FooterProps {
  locale: Locale;
}

export const Footer = ({ locale }: FooterProps) => {
  const text = uiText[locale];
  const guidePath = `/${locale}/guide`;
  const aboutPath = `/${locale}/about`;
  const faqPath = `/${locale}/faq`;

  return (
    <footer className="border-t border-ocean-100 bg-white px-4 py-5 text-sm text-ocean-600">
    <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-bold text-ocean-900">Dave the Diver Farm Planner</p>
        <p>{text.footer.disclaimer}</p>
        <p>{text.footer.unofficial}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={guidePath}
          onClick={() => trackEvent('footer_link_click', { link_label: 'Farming Guide', destination: guidePath })}
          className="font-semibold text-ocean-700 hover:text-ocean-900"
        >
          Farming Guide
        </a>
        <a
          href={aboutPath}
          onClick={() => trackEvent('footer_link_click', { link_label: 'About', destination: aboutPath })}
          className="font-semibold text-ocean-700 hover:text-ocean-900"
        >
          About
        </a>
        <a
          href={faqPath}
          onClick={() => trackEvent('footer_link_click', { link_label: 'FAQ', destination: faqPath })}
          className="font-semibold text-ocean-700 hover:text-ocean-900"
        >
          FAQ
        </a>
        <button
          type="button"
          onClick={() => {
            trackEvent('footer_link_click', { link_label: 'Feedback', destination: getFeedbackUrl() });
            openFeedback('footer');
          }}
          aria-label="Open DiverPlanner feedback form"
          className="border-0 bg-transparent p-0 font-semibold text-ocean-700 hover:text-ocean-900"
        >
          {text.footer.feedback}
        </button>
      </div>
    </div>
  </footer>
  );
};
