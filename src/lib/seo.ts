interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export const DEFAULT_OG_IMAGE = 'https://diverplanner.com/og-cover.svg';

export const pageSeo: Record<string, PageSeo> = {
  '/': {
    title: 'Dave the Diver Farm Planner | DiverPlanner',
    description:
      'Plan Dave the Diver recipes automatically with Fish Farm, Vegetable Farm, Seaweed Farm and manual collection recommendations.',
    canonical: 'https://diverplanner.com/',
    ogTitle: 'Dave the Diver Farm Planner',
    ogDescription:
      'Choose recipes and automatically plan Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.',
    ogUrl: 'https://diverplanner.com/',
  },
  '/guide': {
    title: 'Dave the Diver Farming Guide | Fish Farm, Crops & Seaweed',
    description:
      'Learn how Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm work in Dave the Diver, and how to plan recipe ingredients efficiently.',
    canonical: 'https://diverplanner.com/guide',
    ogTitle: 'Dave the Diver Farming Guide',
    ogDescription:
      'Learn how to plan Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm ingredients for Dave the Diver recipes.',
    ogUrl: 'https://diverplanner.com/guide',
    ogType: 'article',
  },
  '/about': {
    title: 'About DiverPlanner | Dave the Diver Farm Planner',
    description:
      'Learn what DiverPlanner is, how it helps Dave the Diver players plan farm ingredients, and why it was created as an unofficial fan-made tool.',
    canonical: 'https://diverplanner.com/about',
    ogTitle: 'About DiverPlanner',
    ogDescription:
      'DiverPlanner is an unofficial fan-made planning tool for Dave the Diver recipes and farm ingredients.',
    ogUrl: 'https://diverplanner.com/about',
  },
  '/faq': {
    title: 'Dave the Diver Farm Planner FAQ | Fish Farm, Recipes & Seaweed Farm',
    description:
      'Frequently asked questions about DiverPlanner, Dave the Diver Fish Farm, Vegetable Farm, Seaweed Farm, recipe planning, breeding and manual ingredient collection.',
    canonical: 'https://diverplanner.com/faq',
    ogTitle: 'Dave the Diver Farm Planner FAQ',
    ogDescription:
      'Answers about Dave the Diver farming, fish breeding, recipes, seaweed farm and DiverPlanner ingredient planning.',
    ogUrl: 'https://diverplanner.com/faq',
  },
};

const setMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = content;
};

const setCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
};

export const setPageSeo = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  twitterImage = ogImage,
}: PageSeo) => {
  document.title = title;
  setMeta('description', description);
  setCanonical(canonical);
  setMeta('og:title', ogTitle, 'property');
  setMeta('og:description', ogDescription, 'property');
  setMeta('og:url', ogUrl, 'property');
  setMeta('og:type', ogType, 'property');
  setMeta('og:image', ogImage, 'property');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', twitterTitle);
  setMeta('twitter:description', twitterDescription);
  setMeta('twitter:image', twitterImage);
};
