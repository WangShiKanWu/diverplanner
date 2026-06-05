import { getFeedbackUrl, openFeedback } from '../lib/feedback';
import { trackEvent } from '../lib/analytics';

export const Footer = () => (
  <footer className="border-t border-ocean-100 bg-white px-4 py-5 text-sm text-ocean-600">
    <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-bold text-ocean-900">Dave the Diver Farm Planner</p>
        <p>非官方粉丝工具，数据仅供参考。</p>
        <p>Not affiliated with MINTROCKET, NEXON, or Dave the Diver official team.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href="/guide"
          onClick={() => trackEvent('footer_link_click', { link_label: 'Farming Guide', destination: '/guide' })}
          className="font-semibold text-ocean-700 hover:text-ocean-900"
        >
          Farming Guide
        </a>
        <a
          href="/about"
          onClick={() => trackEvent('footer_link_click', { link_label: 'About', destination: '/about' })}
          className="font-semibold text-ocean-700 hover:text-ocean-900"
        >
          About
        </a>
        <a
          href="/faq"
          onClick={() => trackEvent('footer_link_click', { link_label: 'FAQ', destination: '/faq' })}
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
          Feedback
        </button>
      </div>
    </div>
  </footer>
);
