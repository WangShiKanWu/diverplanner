import { trackEvent, trackOutboundClick } from './analytics';

const FALLBACK_FEEDBACK_URL = 'mailto:feedback@diverplanner.com?subject=DiverPlanner%20Feedback';

export const getFeedbackUrl = () => import.meta.env.VITE_FEEDBACK_URL || FALLBACK_FEEDBACK_URL;

export const openFeedback = (location: string, sourcePage = window.location.pathname) => {
  const url = getFeedbackUrl();

  trackEvent('feedback_click', {
    source_page: sourcePage,
    location,
  });

  if (import.meta.env.VITE_FEEDBACK_URL) {
    trackOutboundClick(url, 'Feedback', sourcePage);
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.href = url;
};
