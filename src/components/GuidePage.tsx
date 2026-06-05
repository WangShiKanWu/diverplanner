import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { pageSeo, setPageSeo } from '../lib/seo';

const systems = [
  {
    id: 'fish-farm',
    title: 'Fish Farm',
    description: 'Breed fish from eggs and preserve valuable species for long-term recipe supply.',
  },
  {
    id: 'vegetable-farm',
    title: 'Vegetable Farm',
    description: 'Grow crops such as tomato, carrot, eggplant, garlic and onion for recipe ingredients.',
  },
  {
    id: 'rice-farm',
    title: 'Rice Farm',
    description: 'Keep rice production aligned with recipes that need stable grain supply.',
  },
  {
    id: 'seaweed-farm',
    title: 'Seaweed Farm',
    description: 'Prepare seaweed ingredients used by advanced Dave the Diver recipes.',
  },
];

const bestFishToFarm = [
  {
    fish: 'Bluefin Tuna',
    reason: 'High-value ingredient for profitable recipes.',
    stage: 'Mid / Late Game',
  },
  {
    fish: 'Marlin',
    reason: 'Useful for high-value sushi and event preparation.',
    stage: 'Mid Game',
  },
  {
    fish: 'Sailfish',
    reason: 'Good value and useful in multiple dishes.',
    stage: 'Mid / Late Game',
  },
  {
    fish: 'Dumbo Octopus',
    reason: 'Rare ingredient worth preserving for recipes.',
    stage: 'Late Game',
  },
  {
    fish: 'Narwhal',
    reason: 'Useful for advanced recipes after Glacier areas unlock.',
    stage: 'Late Game',
  },
  {
    fish: 'Antarctic Octopus',
    reason: 'Valuable late-game ingredient.',
    stage: 'Late Game',
  },
];

const strategyTips = [
  'Keep valuable fish for breeding before sending extras to the restaurant.',
  'Do not overfill farm areas.',
  'Prioritize ingredients used in your selected recipes.',
  'Match Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm output with recipe demand.',
  'Use DiverPlanner when you are unsure what to farm next.',
];

const shortFaqs = [
  {
    question: 'How do I unlock Fish Farm?',
    answer:
      "Fish Farm becomes available through Otto's related questline and the fish egg system. Once unlocked, it helps you breed and store fish for recipes.",
  },
  {
    question: 'How many fish should I keep for breeding?',
    answer: 'As a practical rule, keep at least two fish of the same species in the farm if you want stable supply.',
  },
  {
    question: 'What should I farm first?',
    answer:
      'Start with ingredients used by your selected recipes. High-value fish, common crops and late-game seaweed are strong priorities.',
  },
  {
    question: 'How does DiverPlanner help?',
    answer:
      'DiverPlanner groups selected recipe ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dave the Diver Farming Guide',
  description:
    'Dave the Diver farming guide covering Fish Farm, Vegetable Farm, Rice Farm, Seaweed Farm and recipe ingredient planning.',
  mainEntityOfPage: 'https://diverplanner.com/guide',
  author: {
    '@type': 'Organization',
    name: 'DiverPlanner',
  },
  publisher: {
    '@type': 'Organization',
    name: 'DiverPlanner',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: shortFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'DiverPlanner',
      item: 'https://diverplanner.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Dave the Diver Farming Guide',
      item: 'https://diverplanner.com/guide',
    },
  ],
};

export const GuidePage = () => {
  useEffect(() => {
    setPageSeo(pageSeo['/guide']);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 text-ocean-950 md:px-6 md:py-8">
      <article className="space-y-6">
        <section className="rounded-lg border border-ocean-100 bg-white p-4 shadow-soft md:p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-reef-700">DiverPlanner Guide</p>
          <h1 className="mt-2 text-2xl font-bold text-ocean-950 md:text-4xl">Dave the Diver Farming Guide</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ocean-700">
            Learn how Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm work in Dave the Diver, and use
            DiverPlanner to plan recipe ingredients automatically.
          </p>
        </section>

        <nav className="rounded-lg border border-ocean-100 bg-white p-3 shadow-sm md:p-4">
          <p className="text-sm font-bold text-ocean-900">Contents</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['overview', 'systems', 'strategy', 'best-fish', 'planner', 'short-faq'].map((id) => {
              const label = id.replace('-', ' ');

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() =>
                    trackEvent('guide_contents_click', {
                      section_name: label,
                      target_id: id,
                    })
                  }
                  className="rounded-full bg-ocean-100 px-3 py-1 text-sm font-bold capitalize text-ocean-800 transition hover:bg-ocean-200"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>

        <section id="overview" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">What Is Farming in Dave the Diver?</h2>
          <p className="leading-7 text-ocean-800">
            Farming in Dave the Diver is the long-term ingredient system that keeps Bancho Sushi supplied without
            manually collecting every item each day. Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm all reduce
            repeated gathering by turning recipe demand into a more stable production loop.
          </p>
          <p className="leading-7 text-ocean-800">
            A useful farm plan starts from recipes. Choose what you want to cook, then decide which fish, crops, rice and
            seaweed ingredients should be raised to support those dishes. DiverPlanner follows that recipe-first approach
            and converts target recipes into grouped farming recommendations.
          </p>
        </section>

        <section id="systems" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Farming Systems Overview</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {systems.map((system) => (
              <div key={system.id} id={system.id} className="rounded-lg border border-ocean-100 bg-white p-4">
                <h3 className="font-bold text-ocean-950">{system.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ocean-700">{system.description}</p>
                <a
                  href={`#${system.id}`}
                  onClick={() =>
                    trackEvent('guide_learn_more_click', {
                      section_name: system.title,
                      target_id: system.id,
                    })
                  }
                  className="mt-3 inline-flex text-sm font-bold text-ocean-700"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="strategy" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Quick Strategy</h2>
          <ul className="grid gap-2 text-sm leading-6 text-ocean-800 md:grid-cols-2">
            {strategyTips.map((tip) => (
              <li key={tip} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section id="best-fish" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Best Fish to Farm</h2>
          <div className="overflow-x-auto rounded-lg border border-ocean-100 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-ocean-100 text-ocean-900">
                <tr>
                  <th className="px-4 py-3 font-bold">Fish</th>
                  <th className="px-4 py-3 font-bold">Why Farm It</th>
                  <th className="px-4 py-3 font-bold">Recommended Stage</th>
                </tr>
              </thead>
              <tbody>
                {bestFishToFarm.map((fish) => (
                  <tr key={fish.fish} className="border-t border-ocean-100">
                    <td className="px-4 py-3 font-bold text-ocean-950">{fish.fish}</td>
                    <td className="px-4 py-3 text-ocean-700">{fish.reason}</td>
                    <td className="px-4 py-3 text-ocean-700">{fish.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="planner" className="scroll-mt-6 rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-6">
          <h2 className="text-2xl font-bold">Use the Planner</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">
            Choose target recipes and instantly see what to raise in Fish Farm, what to grow in Vegetable Farm, what to
            plant in Seaweed Farm and what still requires manual collection.
          </p>
          <a
            href="/"
            onClick={() =>
              trackEvent('guide_cta_click', {
                cta_name: 'Start Planning',
                destination: '/',
              })
            }
            className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
          >
            Start Planning
          </a>
        </section>

        <section id="short-faq" className="scroll-mt-6 space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-ocean-900">Short FAQ</h2>
            <a
              href="/faq"
              onClick={() =>
                trackEvent('guide_cta_click', {
                  cta_name: 'Read full FAQ',
                  destination: '/faq',
                })
              }
              className="text-sm font-bold text-ocean-700 hover:text-ocean-900"
            >
              Read full FAQ
            </a>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {shortFaqs.map((faq) => (
              <div
                key={faq.question}
                onClick={() => trackEvent('guide_faq_click', { question: faq.question })}
                className="rounded-lg border border-ocean-100 bg-white p-4"
              >
                <h3 className="font-bold text-ocean-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-ocean-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </main>
  );
};
