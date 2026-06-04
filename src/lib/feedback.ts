import { trackEvent } from './analytics';

const FALLBACK_FEEDBACK_URL = 'mailto:feedback@diverplanner.com?subject=DiverPlanner%20Feedback';

export const getFeedbackUrl = () => import.meta.env.VITE_FEEDBACK_URL || FALLBACK_FEEDBACK_URL;

export const openFeedback = (sourceElement: string, sourcePage = window.location.pathname) => {
  const url = getFeedbackUrl();

  trackEvent('feedback_click', {
    source_page: sourcePage,
    source_element: sourceElement,
  });

  if (import.meta.env.VITE_FEEDBACK_URL) {
    trackEvent('outbound_click', {
      url,
      source_page: sourcePage,
      source_element: sourceElement,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.href = url;
};
