import { useEffect } from 'react';

const faqSections = [
  {
    id: 'about-diverplanner',
    title: 'About DiverPlanner',
    items: [
      {
        question: 'What is DiverPlanner?',
        answer:
          'DiverPlanner is an unofficial fan-made planner for Dave the Diver. It helps players choose target recipes and automatically group required ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.',
      },
      {
        question: 'Is DiverPlanner official?',
        answer:
          'No. DiverPlanner is an unofficial fan-made tool. It is not affiliated with MINTROCKET, NEXON, or the official Dave the Diver team.',
      },
      {
        question: 'Is DiverPlanner free to use?',
        answer: 'Yes. DiverPlanner is currently free to use.',
      },
      {
        question: 'Does DiverPlanner require login?',
        answer: 'No. The planner works directly in the browser and does not require an account.',
      },
    ],
  },
  {
    id: 'recipe-planning',
    title: 'Recipe Planning',
    items: [
      {
        question: 'How does recipe planning work?',
        answer:
          'Choose the recipes you want to prepare, and DiverPlanner calculates the ingredients required for those recipes. It then groups the materials by source, such as Fish Farm, Vegetable Farm, Seaweed Farm or manual collection.',
      },
      {
        question: 'Can I select multiple recipes?',
        answer:
          'Yes. You can select multiple recipes, and the planner will combine ingredient requirements into one planning summary.',
      },
      {
        question: 'Why are some ingredients marked as manual collection?',
        answer:
          'Some materials cannot be grown or bred through farm systems. These items need to be collected through diving, shops, dispatch, exploration or other in-game sources.',
      },
      {
        question: 'Can I export my plan?',
        answer:
          'Yes. DiverPlanner supports copying the plan and exporting a TXT summary so you can keep it outside the browser.',
      },
    ],
  },
  {
    id: 'fish-farm',
    title: 'Fish Farm',
    items: [
      {
        question: 'How do I unlock Fish Farm in Dave the Diver?',
        answer:
          "Fish Farm becomes available through Otto's related questline and the fish egg system. Once unlocked, it allows you to keep and breed fish for future recipes.",
      },
      {
        question: 'How does fish breeding work?',
        answer:
          'Fish eggs can be collected while diving. After fish are placed in the Fish Farm, keeping at least two fish of the same species helps maintain a stable breeding supply.',
      },
      {
        question: 'How many fish should I keep for breeding?',
        answer:
          'As a practical rule, keep at least two fish of the same species if you want them to reproduce and support long-term ingredient supply.',
      },
      {
        question: 'Should I send all valuable fish to the restaurant?',
        answer:
          'Not always. It is often better to keep valuable or rare fish in the farm first, then send extras to the restaurant after the farm has enough stock.',
      },
      {
        question: 'What are good fish to farm?',
        answer:
          'High-value or hard-to-find fish are usually stronger farming choices. Examples include Bluefin Tuna, Marlin, Sailfish and late-game rare fish.',
      },
    ],
  },
  {
    id: 'vegetable-farm',
    title: 'Vegetable Farm and Rice Farm',
    items: [
      {
        question: 'What is Vegetable Farm used for?',
        answer:
          'Vegetable Farm helps produce crops used in recipes. It reduces the need to manually collect or buy every vegetable ingredient.',
      },
      {
        question: 'Which crops are useful to grow?',
        answer:
          'Rice, Tomato, Carrot, Eggplant, Garlic and Onion are useful because they appear in many recipes or upgrades.',
      },
      {
        question: 'Does DiverPlanner recommend crops?',
        answer:
          'Yes. When selected recipes require farm crops, DiverPlanner groups those ingredients into the farm planning section.',
      },
    ],
  },
  {
    id: 'seaweed-farm',
    title: 'Seaweed Farm',
    items: [
      {
        question: 'What is Seaweed Farm used for?',
        answer: 'Seaweed Farm helps produce marine plant ingredients used in advanced recipes.',
      },
      {
        question: 'Which seaweed ingredients are useful?',
        answer:
          'Sea Grapes, Kelp, Agar, Kajime and Wakame are useful examples because they appear in several recipes.',
      },
      {
        question: 'Why does Seaweed Farm matter in late game?',
        answer:
          'Late-game recipes often require seaweed and marine plant ingredients. Planning seaweed in advance can reduce manual gathering.',
      },
    ],
  },
  {
    id: 'accuracy-feedback',
    title: 'Accuracy and Feedback',
    items: [
      {
        question: 'Is the data always accurate?',
        answer:
          'The data is based on manual collection, public references and in-game observation. It may include missing entries, version differences or translation differences.',
      },
      {
        question: 'What should I do if I find an error?',
        answer:
          'Please use the feedback link to report incorrect recipes, ingredient amounts, unlock conditions or material sources.',
      },
      {
        question: 'Will more recipes be added?',
        answer: 'Yes. The goal is to keep expanding and improving recipe coverage over time.',
      },
    ],
  },
];

const flatFaqItems = faqSections.flatMap((section) => section.items);

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

const setJsonLd = (id: string, data: unknown) => {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: flatFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
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
      name: 'Home',
      item: 'https://diverplanner.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'FAQ',
      item: 'https://diverplanner.com/faq',
    },
  ],
};

export const FaqPage = () => {
  useEffect(() => {
    const title = 'Dave the Diver Farm Planner FAQ | Fish Farm, Recipes & Seaweed Farm';
    const description =
      'Frequently asked questions about DiverPlanner, Dave the Diver Fish Farm, Vegetable Farm, Seaweed Farm, recipe planning, breeding and manual ingredient collection.';

    document.title = title;
    setMeta('description', description);
    setCanonical('https://diverplanner.com/faq');
    setMeta('og:title', 'Dave the Diver Farm Planner FAQ', 'property');
    setMeta(
      'og:description',
      'Answers about Dave the Diver farming, fish breeding, recipes, seaweed farm and how DiverPlanner helps plan ingredients.',
      'property',
    );
    setMeta('og:url', 'https://diverplanner.com/faq', 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Dave the Diver Farm Planner FAQ');
    setMeta(
      'twitter:description',
      'Frequently asked questions about Dave the Diver farming and DiverPlanner recipe planning.',
    );

    setJsonLd('faq-page-jsonld', faqSchema);
    setJsonLd('faq-breadcrumb-jsonld', breadcrumbSchema);

    return () => {
      document.getElementById('faq-page-jsonld')?.remove();
      document.getElementById('faq-breadcrumb-jsonld')?.remove();
    };
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 text-ocean-950 md:px-6 md:py-10">
      <article className="space-y-8">
        <section className="rounded-lg border border-ocean-100 bg-white p-5 shadow-soft md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-reef-700">FAQ</p>
          <h1 className="mt-3 text-3xl font-bold text-ocean-950 md:text-5xl">
            Dave the Diver Farm Planner FAQ
          </h1>
          <p className="mt-4 text-base leading-7 text-ocean-700 md:text-lg">
            Answers to common questions about DiverPlanner, Dave the Diver Fish Farm, Vegetable Farm, Seaweed Farm,
            recipe planning and ingredient collection.
          </p>
          <p className="mt-3 text-sm font-semibold text-ocean-500">Last Updated: June 2026</p>
        </section>

        <nav className="rounded-lg border border-ocean-100 bg-white p-4 shadow-sm">
          <p className="text-sm font-bold text-ocean-900">Contents</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full bg-ocean-100 px-3 py-1.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-200"
              >
                {section.title}
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-ocean-900">Related pages</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="/" className="rounded-full bg-ocean-100 px-3 py-1.5 text-sm font-bold text-ocean-800">
              Planner
            </a>
            <a href="/guide" className="rounded-full bg-ocean-100 px-3 py-1.5 text-sm font-bold text-ocean-800">
              Farming Guide
            </a>
            <a href="/about" className="rounded-full bg-ocean-100 px-3 py-1.5 text-sm font-bold text-ocean-800">
              About
            </a>
          </div>
        </nav>

        {faqSections.map((section) => (
          <section key={section.title} id={section.id} className="scroll-mt-6 space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.question} className="rounded-lg border border-ocean-100 bg-white p-4 shadow-sm">
                  <h3 className="text-base font-bold text-ocean-950">{item.question}</h3>
                  <p className="mt-2 leading-7 text-ocean-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-7">
          <h2 className="text-2xl font-bold">Still Planning Manually?</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">
            Use DiverPlanner to choose recipes and automatically generate a Fish Farm, Vegetable Farm, Seaweed Farm and
            manual collection plan.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
            >
              Open Planner
            </a>
            <a
              href="/guide"
              className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Read Farming Guide
            </a>
          </div>
        </section>
      </article>
    </main>
  );
};
