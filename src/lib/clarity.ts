type ClarityFunction = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

export const initializeClarity = () => {
  const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

  if (!import.meta.env.PROD || !projectId || window.clarity) {
    return;
  }

  const clarityQueue: ClarityFunction = (...args: unknown[]) => {
    (clarityQueue.q = clarityQueue.q || []).push(args);
  };
  window.clarity = clarityQueue;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  document.head.appendChild(script);
};
