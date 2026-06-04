import { useEffect } from 'react';

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

const recommendedCrops = ['Rice', 'Tomato', 'Carrot', 'Eggplant', 'Garlic', 'Onion'];
const recommendedSeaweed = ['Sea Grapes', 'Kelp', 'Agar', 'Kajime', 'Wakame'];

const strategyTips = [
  'Keep valuable fish for breeding before sending extras to the restaurant.',
  'Do not overfill farm areas.',
  'Prioritize ingredients used in your selected recipes.',
  'Match fish farm, vegetable farm and seaweed farm output with recipe demand.',
  'Use the planner when you are unsure what to farm next.',
];

const faqs = [
  {
    question: 'How do I unlock Fish Farm in Dave the Diver?',
    answer:
      "Fish Farm becomes available through Otto's related questline and the fish egg system. Once unlocked, it helps you breed and store fish for recipes.",
  },
  {
    question: 'How many fish do I need for breeding?',
    answer: 'As a practical rule, keep at least two fish of the same species in the farm if you want a stable supply.',
  },
  {
    question: 'What is the best fish to farm?',
    answer:
      'High-value fish used in profitable recipes are usually better choices. Bluefin Tuna, Marlin and late-game rare fish are strong examples.',
  },
  {
    question: 'Is Seaweed Farm important?',
    answer:
      'Yes. Seaweed ingredients are used in many advanced recipes, so planning them helps reduce manual farming.',
  },
  {
    question: 'How does DiverPlanner help?',
    answer:
      'DiverPlanner lets you choose target recipes and automatically groups ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.',
  },
];

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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dave the Diver Farming Guide',
  description:
    'Complete Dave the Diver farming guide. Learn how Fish Farm, Vegetable Farm and Seaweed Farm work, what fish to farm, and how to plan recipe ingredients with DiverPlanner.',
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
  mainEntity: faqs.map((faq) => ({
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
    const title = 'Dave the Diver Farming Guide | Fish Farm, Vegetable Farm & Seaweed Farm';
    const description =
      'Complete Dave the Diver farming guide. Learn how Fish Farm, Vegetable Farm and Seaweed Farm work, what fish to farm, and how to plan recipe ingredients with DiverPlanner.';

    document.title = title;
    setMeta('description', description);
    setMeta(
      'keywords',
      'Dave the Diver Farming Guide,Dave the Diver Fish Farm Guide,Dave the Diver Vegetable Farm Guide,Dave the Diver Seaweed Farm Guide,Dave the Diver Farm Planner,Dave the Diver Best Fish to Farm,潜水员戴夫 鱼场,潜水员戴夫 农场,潜水员戴夫 海底农场',
    );
    setCanonical('https://diverplanner.com/guide');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', 'https://diverplanner.com/guide', 'property');
    setMeta('og:type', 'article', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 text-ocean-950 md:px-6 md:py-10">
      <article className="space-y-8">
        <section className="rounded-lg border border-ocean-100 bg-white p-5 shadow-soft md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-reef-700">DiverPlanner Guide</p>
          <h1 className="mt-3 text-3xl font-bold text-ocean-950 md:text-5xl">Dave the Diver Farming Guide</h1>
          <p className="mt-4 text-base leading-7 text-ocean-700 md:text-lg">
            Learn how Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm work in Dave the Diver, and use
            DiverPlanner to plan recipe ingredients automatically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">What Is Farming in Dave the Diver?</h2>
          <p className="leading-7 text-ocean-800">
            Farming in Dave the Diver is the long-term ingredient system that helps players keep Bancho Sushi supplied
            without manually collecting every item each day. Instead of relying only on dives, farming lets you build a
            more stable loop around Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm output. Fish Farm is used to
            store and breed fish gathered through diving and fish eggs. Vegetable Farm and Rice Farm support land crops
            that appear in many restaurant recipes, while Seaweed Farm covers marine plants used in later dishes.
          </p>
          <p className="leading-7 text-ocean-800">
            These systems matter most when you want to cook the same profitable recipes repeatedly, upgrade important
            dishes, or prepare ingredients before events. A good farming plan starts from recipes rather than random
            ingredients: choose what you want Bancho Sushi to sell, then decide which fish, crops and seaweed should be
            raised to match that demand. DiverPlanner follows the same idea by turning selected recipes into grouped
            farming recommendations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">How to Unlock Fish Farm</h2>
          <p className="leading-7 text-ocean-800">
            Fish Farm is connected to Otto and his related questline. Players encounter the system after progressing far
            enough to deal with Moray Eel Curry, fish eggs and the breeding system. Once unlocked, the farm gives you a
            place to keep fish species and slowly turn diving rewards into a more reliable ingredient supply.
          </p>
          <div className="rounded-lg border-l-4 border-reef-500 bg-reef-100 p-4 text-sm leading-6 text-ocean-900">
            <span className="font-bold">Tip:</span> Keep at least two fish of the same species in the same farm area if
            you want them to breed.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">How Fish Farm Breeding Works</h2>
          <p className="leading-7 text-ocean-800">
            Fish eggs can be collected while diving, and those eggs become the foundation of Fish Farm breeding. Fish
            need to stay in the farm to reproduce, so sending every valuable catch directly to the restaurant can slow
            down your future supply. Keeping at least two fish of the same species helps maintain a practical breeding
            base, especially for profitable or hard-to-find fish.
          </p>
          <p className="leading-7 text-ocean-800">
            The safest strategy is to preserve valuable fish for long-term breeding first, then send extras to Bancho
            Sushi once the farm has enough stock. This makes your restaurant less dependent on daily diving luck.
          </p>
          <div className="overflow-x-auto rounded-lg border border-ocean-100 bg-white p-4">
            <pre className="min-w-max text-center text-sm font-bold leading-8 text-ocean-800">{`Fish Eggs
↓
Fish Farm
↓
Breeding
↓
Ingredient Supply
↓
Bancho Sushi Profit`}</pre>
          </div>
        </section>

        <section className="space-y-3">
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

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Vegetable Farm Guide</h2>
          <p className="leading-7 text-ocean-800">
            Vegetable Farm supports crops used in recipes. Crops need planting and harvesting, so the best choices are
            the ones that match what you actually plan to cook. Some crops are more useful because they appear in many
            dishes, while others matter most for specific upgrades or event preparation.
          </p>
          <div className="flex flex-wrap gap-2">
            {recommendedCrops.map((crop) => (
              <span key={crop} className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-ocean-800 shadow-sm">
                {crop}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Seaweed Farm Guide</h2>
          <p className="leading-7 text-ocean-800">
            Seaweed Farm is useful for advanced recipes because seaweed ingredients often appear in higher-value dishes.
            Planning seaweed around target recipes reduces manual gathering and helps keep late-game menu choices more
            consistent.
          </p>
          <div className="flex flex-wrap gap-2">
            {recommendedSeaweed.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-ocean-800 shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Farming Strategy Tips</h2>
          <ul className="space-y-2 leading-7 text-ocean-800">
            {strategyTips.map((tip) => (
              <li key={tip} className="rounded-lg bg-white px-4 py-3 shadow-sm">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-ocean-100 bg-white p-4">
                <h3 className="font-bold text-ocean-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-ocean-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-7">
          <h2 className="text-2xl font-bold">Plan Your Farm Automatically</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">
            Choose your target recipes and instantly see what to raise in Fish Farm, what to grow in Vegetable Farm,
            what to plant in Seaweed Farm, and what still requires manual collection.
          </p>
          <a
            href="/"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
          >
            Go to Planner
          </a>
        </section>
      </article>

      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </main>
  );
};
