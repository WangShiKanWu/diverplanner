import type { Locale } from '../i18n/types';

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
  '/en': {
    title: 'Dave the Diver Farm Planner | DiverPlanner',
    description:
      'Plan Dave the Diver recipes automatically with Fish Farm, Vegetable Farm, Seaweed Farm and manual collection recommendations.',
    canonical: 'https://diverplanner.com/en',
    ogTitle: 'Dave the Diver Farm Planner',
    ogDescription:
      'Choose recipes and automatically plan Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.',
    ogUrl: 'https://diverplanner.com/en',
  },
  '/en/guide': {
    title: 'Dave the Diver Farming Guide | Fish Farm, Crops & Seaweed',
    description:
      'Learn how Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm work in Dave the Diver, and how to plan recipe ingredients efficiently.',
    canonical: 'https://diverplanner.com/en/guide',
    ogTitle: 'Dave the Diver Farming Guide',
    ogDescription:
      'Learn how to plan Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm ingredients for Dave the Diver recipes.',
    ogUrl: 'https://diverplanner.com/en/guide',
    ogType: 'article',
  },
  '/en/about': {
    title: 'About DiverPlanner | Dave the Diver Farm Planner',
    description:
      'Learn what DiverPlanner is, how it helps Dave the Diver players plan farm ingredients, and why it was created as an unofficial fan-made tool.',
    canonical: 'https://diverplanner.com/en/about',
    ogTitle: 'About DiverPlanner',
    ogDescription:
      'DiverPlanner is an unofficial fan-made planning tool for Dave the Diver recipes and farm ingredients.',
    ogUrl: 'https://diverplanner.com/en/about',
  },
  '/en/faq': {
    title: 'Dave the Diver Farm Planner FAQ | Fish Farm, Recipes & Seaweed Farm',
    description:
      'Frequently asked questions about DiverPlanner, Dave the Diver Fish Farm, Vegetable Farm, Seaweed Farm, recipe planning, breeding and manual ingredient collection.',
    canonical: 'https://diverplanner.com/en/faq',
    ogTitle: 'Dave the Diver Farm Planner FAQ',
    ogDescription:
      'Answers about Dave the Diver farming, fish breeding, recipes, seaweed farm and DiverPlanner ingredient planning.',
    ogUrl: 'https://diverplanner.com/en/faq',
  },
  '/zh': {
    title: '潜水员戴夫养殖规划器 | DiverPlanner',
    description: '根据目标菜谱自动生成鱼场、农场、海底农场和手动采集规划。',
    canonical: 'https://diverplanner.com/zh',
    ogTitle: '潜水员戴夫养殖规划器',
    ogDescription: '选择目标菜谱，自动生成鱼场、农场、海底农场和手动采集规划。',
    ogUrl: 'https://diverplanner.com/zh',
  },
  '/zh/guide': {
    title: '潜水员戴夫养殖指南 | 鱼场、农场与海底农场',
    description: '了解鱼场、农场、稻田和海底农场如何配合菜谱规划，减少重复查表和手动计算。',
    canonical: 'https://diverplanner.com/zh/guide',
    ogTitle: '潜水员戴夫养殖指南',
    ogDescription: '面向菜谱规划的鱼场、农场、稻田和海底农场养殖指南。',
    ogUrl: 'https://diverplanner.com/zh/guide',
    ogType: 'article',
  },
  '/zh/about': {
    title: '关于 DiverPlanner | 潜水员戴夫养殖规划器',
    description: '了解 DiverPlanner 如何帮助潜水员戴夫玩家根据目标菜谱规划鱼场、农场和海底农场材料。',
    canonical: 'https://diverplanner.com/zh/about',
    ogTitle: '关于 DiverPlanner',
    ogDescription: 'DiverPlanner 是一个非官方粉丝制作的潜水员戴夫菜谱与养殖规划工具。',
    ogUrl: 'https://diverplanner.com/zh/about',
  },
  '/zh/faq': {
    title: '潜水员戴夫养殖规划器 FAQ | 鱼场、菜谱与海底农场',
    description: '关于 DiverPlanner、潜水员戴夫鱼场、农场、海底农场、菜谱规划和手动材料获取的常见问题。',
    canonical: 'https://diverplanner.com/zh/faq',
    ogTitle: '潜水员戴夫养殖规划器 FAQ',
    ogDescription: '解答潜水员戴夫养殖、鱼场繁殖、菜谱规划、海底农场和材料获取问题。',
    ogUrl: 'https://diverplanner.com/zh/faq',
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

const setAlternate = (hreflang: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);

  if (!element) {
    element = document.createElement('link');
    element.rel = 'alternate';
    element.hreflang = hreflang;
    document.head.appendChild(element);
  }

  element.href = href;
};

const getLocaleRoute = (canonical: string) => {
  const url = new URL(canonical);
  return url.pathname.replace(/^\/(zh|en)/, '') || '/';
};

const getLocalizedHref = (locale: Locale, route: string) => {
  return `https://diverplanner.com/${locale}${route === '/' ? '' : route}`;
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
  document.documentElement.lang = canonical.includes('/zh') ? 'zh-CN' : 'en';
  setMeta('description', description);
  setCanonical(canonical);
  const route = getLocaleRoute(canonical);
  setAlternate('zh-CN', getLocalizedHref('zh', route));
  setAlternate('en', getLocalizedHref('en', route));
  setAlternate('x-default', getLocalizedHref('en', route));
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
