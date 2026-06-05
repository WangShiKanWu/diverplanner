import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { openFeedback } from '../lib/feedback';
import { pageSeo, setPageSeo } from '../lib/seo';

const helpItems = [
  'Recipe planning',
  'Fish Farm guidance',
  'Crop planning',
  'Seaweed planning',
  'Manual checklist',
  'Export summary',
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About DiverPlanner',
  url: 'https://diverplanner.com/about',
  description:
    'Learn what DiverPlanner is, how it helps Dave the Diver players plan Fish Farm, Vegetable Farm and Seaweed Farm ingredients, and why it was created as an unofficial fan-made tool.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'DiverPlanner',
    url: 'https://diverplanner.com/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'DiverPlanner',
  },
};

export const AboutPage = () => {
  useEffect(() => {
    setPageSeo(pageSeo['/about']);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 text-ocean-950 md:px-6 md:py-8">
      <article className="space-y-6">
        <section className="rounded-lg border border-ocean-100 bg-white p-4 shadow-soft md:p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-reef-700">About</p>
          <h1 className="mt-2 text-2xl font-bold text-ocean-950 md:text-4xl">About DiverPlanner</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ocean-700">
            DiverPlanner is an unofficial fan-made planning tool for Dave the Diver players. It helps players choose
            target recipes and automatically group required ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and
            manual collection tasks.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">What Is DiverPlanner?</h2>
            <p className="leading-7 text-ocean-800">
              DiverPlanner is a recipe and farming planner for Dave the Diver. After players select target recipes, the
              tool breaks down ingredient requirements and groups them into Fish Farm, Vegetable Farm, Seaweed Farm and
              Manual Collection categories.
            </p>
            <p className="leading-7 text-ocean-800">
              The goal is to reduce repeated wiki lookups, spreadsheet checks and manual counting by turning recipe
              choices into a practical farming plan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">Why This Tool Was Created</h2>
            <p className="leading-7 text-ocean-800">
              Late-game recipes often require fish, crops, seaweed and manually collected materials at the same time,
              making it harder to decide what to farm next.
            </p>
            <p className="leading-7 text-ocean-800">
              DiverPlanner brings those scattered decisions into one clear, actionable plan for recipe planning and farm
              ingredient preparation.
            </p>
          </section>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">What DiverPlanner Can Help With</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {helpItems.map((item) => (
              <div key={item} className="rounded-lg border border-ocean-100 bg-white p-3 font-bold text-ocean-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">Data Accuracy</h2>
            <p className="leading-7 text-ocean-800">
              Data is manually collected from public references and in-game observation. It may include missing entries,
              version differences or translation differences.
            </p>
            <p className="leading-7 text-ocean-800">
              Treat results as planning references, not official data. If you find incorrect recipes, ingredient amounts
              or material sources, feedback is welcome.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">Unofficial Fan Tool Disclaimer</h2>
            <div className="rounded-lg border-l-4 border-coral-500 bg-white p-4 leading-7 text-ocean-800 shadow-sm">
              <p>
                DiverPlanner is an unofficial fan-made tool. It is not affiliated with MINTROCKET, NEXON, or the
                official Dave the Diver team.
              </p>
              <p className="mt-3">本站为非官方粉丝工具，与 MINTROCKET、NEXON 或 Dave the Diver 官方团队无关联。</p>
            </div>
          </section>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">Feedback</h2>
          <p className="leading-7 text-ocean-800">
            Feedback is welcome for incorrect recipes, ingredient amounts, unlock conditions or feature suggestions. For
            now, please use the feedback link in the footer.
          </p>
          <button
            type="button"
            onClick={() => openFeedback('about')}
            aria-label="Send feedback about DiverPlanner"
            className="inline-flex rounded-full bg-ocean-100 px-4 py-2 text-sm font-bold text-ocean-800 transition hover:bg-ocean-200"
          >
            Send Feedback
          </button>
        </section>

        <section className="rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-7">
          <h2 className="text-2xl font-bold">Start Planning Your Farm</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">
            Choose your target recipes and let DiverPlanner generate a farming and collection plan automatically.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/"
              onClick={() =>
                trackEvent('about_cta_click', {
                  cta_name: 'Open Planner',
                  destination: '/',
                })
              }
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
            >
              Open Planner
            </a>
            <a
              href="/guide"
              onClick={() =>
                trackEvent('about_cta_click', {
                  cta_name: 'Read Farming Guide',
                  destination: '/guide',
                })
              }
              className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Read Farming Guide
            </a>
          </div>
        </section>
      </article>

      <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
    </main>
  );
};
