import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { pageSeo, setPageSeo } from '../lib/seo';
import type { Locale } from '../i18n/types';

interface GuidePageProps {
  locale: Locale;
  path: string;
}

const content = {
  en: {
    eyebrow: 'DiverPlanner Guide',
    title: 'Dave the Diver Farming Guide',
    intro:
      'Learn how Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm work in Dave the Diver, and use DiverPlanner to plan recipe ingredients automatically.',
    contents: 'Contents',
    sectionLabels: {
      overview: 'overview',
      systems: 'systems',
      strategy: 'strategy',
      'best-fish': 'best fish',
      planner: 'planner',
      'short-faq': 'short faq',
    },
    overviewTitle: 'What Is Farming in Dave the Diver?',
    overview: [
      'Farming in Dave the Diver is the long-term ingredient system that keeps Bancho Sushi supplied without manually collecting every item each day. Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm all reduce repeated gathering by turning recipe demand into a more stable production loop.',
      'A useful farm plan starts from recipes. Choose what you want to cook, then decide which fish, crops, rice and seaweed ingredients should be raised to support those dishes. DiverPlanner follows that recipe-first approach and converts target recipes into grouped farming recommendations.',
    ],
    systemsTitle: 'Farming Systems Overview',
    systems: [
      ['fish-farm', 'Fish Farm', 'Breed fish from eggs and preserve valuable species for long-term recipe supply.'],
      ['vegetable-farm', 'Vegetable Farm', 'Grow crops such as tomato, carrot, eggplant, garlic and onion for recipe ingredients.'],
      ['rice-farm', 'Rice Farm', 'Keep rice production aligned with recipes that need stable grain supply.'],
      ['seaweed-farm', 'Seaweed Farm', 'Prepare seaweed ingredients used by advanced Dave the Diver recipes.'],
    ],
    learnMore: 'Learn more',
    strategyTitle: 'Quick Strategy',
    strategyTips: [
      'Keep valuable fish for breeding before sending extras to the restaurant.',
      'Do not overfill farm areas.',
      'Prioritize ingredients used in your selected recipes.',
      'Match Fish Farm, Vegetable Farm, Rice Farm and Seaweed Farm output with recipe demand.',
      'Use DiverPlanner when you are unsure what to farm next.',
    ],
    bestFishTitle: 'Best Fish to Farm',
    tableHeaders: ['Fish', 'Why Farm It', 'Recommended Stage'],
    bestFish: [
      ['Bluefin Tuna', 'High-value ingredient for profitable recipes.', 'Mid / Late Game'],
      ['Marlin', 'Useful for high-value sushi and event preparation.', 'Mid Game'],
      ['Sailfish', 'Good value and useful in multiple dishes.', 'Mid / Late Game'],
      ['Dumbo Octopus', 'Rare ingredient worth preserving for recipes.', 'Late Game'],
      ['Narwhal', 'Useful for advanced recipes after Glacier areas unlock.', 'Late Game'],
      ['Antarctic Octopus', 'Valuable late-game ingredient.', 'Late Game'],
    ],
    plannerTitle: 'Use the Planner',
    plannerText:
      'Choose target recipes and instantly see what to raise in Fish Farm, what to grow in Vegetable Farm, what to plant in Seaweed Farm and what still requires manual collection.',
    plannerCta: 'Start Planning',
    faqTitle: 'Short FAQ',
    faqLink: 'Read full FAQ',
    faqs: [
      ['How do I unlock Fish Farm?', "Fish Farm becomes available through Otto's related questline and the fish egg system. Once unlocked, it helps you breed and store fish for recipes."],
      ['How many fish should I keep for breeding?', 'As a practical rule, keep at least two fish of the same species in the farm if you want stable supply.'],
      ['What should I farm first?', 'Start with ingredients used by your selected recipes. High-value fish, common crops and late-game seaweed are strong priorities.'],
      ['How does DiverPlanner help?', 'DiverPlanner groups selected recipe ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.'],
    ],
  },
  zh: {
    eyebrow: 'DiverPlanner 指南',
    title: '潜水员戴夫养殖指南',
    intro: '介绍鱼场、农场、稻田和海底农场如何配合菜谱规划，让长期备料更清楚。',
    contents: '目录',
    sectionLabels: {
      overview: '概览',
      systems: '养殖系统',
      strategy: '快速策略',
      'best-fish': '推荐鱼类',
      planner: '规划器',
      'short-faq': '简短 FAQ',
    },
    overviewTitle: '《潜水员戴夫》里的养殖是什么？',
    overview: [
      '养殖系统是后期稳定供应寿司店材料的核心。鱼场、农场、稻田和海底农场可以减少每天反复采集的压力，把菜谱需求变成可持续的生产计划。',
      '好的养殖规划应该从菜谱出发：先决定长期要做哪些菜，再反推要养哪些鱼、种哪些作物、准备哪些海藻。DiverPlanner 正是按照这个流程，把菜谱拆成可执行的养殖建议。',
    ],
    systemsTitle: '养殖系统概览',
    systems: [
      ['fish-farm', '鱼场', '通过鱼卵繁殖鱼类，保留高价值或常用鱼种，支持长期菜谱供应。'],
      ['vegetable-farm', '农场', '种植番茄、胡萝卜、茄子、大蒜、洋葱等常用菜谱材料。'],
      ['rice-farm', '稻田', '为需要大米的菜谱保持稳定产量，避免临时缺料。'],
      ['seaweed-farm', '海底农场', '提前准备高级菜谱常用的海藻和海洋植物材料。'],
    ],
    learnMore: '了解更多',
    strategyTitle: '快速策略',
    strategyTips: [
      '高价值鱼先留在鱼场繁殖，库存稳定后再送去餐厅。',
      '不要让养殖区长期爆仓，优先保留目标菜谱材料。',
      '先养当前已选择菜谱会用到的材料。',
      '让鱼场、农场、稻田和海底农场的产出配合菜谱需求。',
      '不知道下一步养什么时，用 DiverPlanner 从菜谱反推材料。',
    ],
    bestFishTitle: '值得优先养的鱼',
    tableHeaders: ['鱼类', '推荐原因', '推荐阶段'],
    bestFish: [
      ['蓝鳍金枪鱼', '高收益菜谱常用材料。', '中后期'],
      ['马林鱼', '适合高价值寿司和节日备货。', '中期'],
      ['旗鱼', '价值稳定，并且能用于多种菜品。', '中后期'],
      ['小飞象章鱼', '稀有材料，适合提前保留。', '后期'],
      ['独角鲸', '冰河区域解锁后适合高级菜谱。', '后期'],
      ['南极章鱼', '后期价值较高的材料。', '后期'],
    ],
    plannerTitle: '使用规划器',
    plannerText: '选择目标菜谱后，立即查看鱼场养什么、农场种什么、海底农场准备什么，以及哪些材料还需要手动获取。',
    plannerCta: '开始规划',
    faqTitle: '简短 FAQ',
    faqLink: '查看完整 FAQ',
    faqs: [
      ['鱼场怎么解锁？', '鱼场会随着 Otto 相关任务和鱼卵系统解锁。解锁后可以繁殖并储存鱼类材料。'],
      ['每种鱼应该留几条繁殖？', '实用规则是每种想长期繁殖的鱼至少保留两条。'],
      ['应该先种什么或养什么？', '优先选择当前目标菜谱会用到的材料，高价值鱼、常用作物和后期海藻通常更值得提前准备。'],
      ['DiverPlanner 能帮什么？', 'DiverPlanner 会把你选择的菜谱材料归类为鱼场、农场、海底农场和手动获取清单。'],
    ],
  },
};

const sectionLinks = ['overview', 'systems', 'strategy', 'best-fish', 'planner', 'short-faq'];

export const GuidePage = ({ locale, path }: GuidePageProps) => {
  const text = content[locale];

  useEffect(() => {
    setPageSeo(pageSeo[path]);
  }, [path]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 text-ocean-950 md:px-6 md:py-8">
      <article className="space-y-6">
        <section className="rounded-lg border border-ocean-100 bg-white p-4 shadow-soft md:p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-reef-700">{text.eyebrow}</p>
          <h1 className="mt-2 text-2xl font-bold text-ocean-950 md:text-4xl">{text.title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ocean-700">{text.intro}</p>
        </section>

        <nav className="rounded-lg border border-ocean-100 bg-white p-3 shadow-sm md:p-4">
          <p className="text-sm font-bold text-ocean-900">{text.contents}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sectionLinks.map((id) => {
              const label = text.sectionLabels[id as keyof typeof text.sectionLabels];
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => trackEvent('guide_contents_click', { section_name: label, target_id: id })}
                  className="rounded-full bg-ocean-100 px-3 py-1 text-sm font-bold capitalize text-ocean-800 transition hover:bg-ocean-200"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>

        <section id="overview" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">{text.overviewTitle}</h2>
          {text.overview.map((paragraph) => (
            <p key={paragraph} className="leading-7 text-ocean-800">{paragraph}</p>
          ))}
        </section>

        <section id="systems" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">{text.systemsTitle}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {text.systems.map(([id, title, description]) => (
              <div key={id} id={id} className="rounded-lg border border-ocean-100 bg-white p-4">
                <h3 className="font-bold text-ocean-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ocean-700">{description}</p>
                <a
                  href={`#${id}`}
                  onClick={() => trackEvent('guide_learn_more_click', { section_name: title, target_id: id })}
                  className="mt-3 inline-flex text-sm font-bold text-ocean-700"
                >
                  {text.learnMore}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="strategy" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">{text.strategyTitle}</h2>
          <ul className="grid gap-2 text-sm leading-6 text-ocean-800 md:grid-cols-2">
            {text.strategyTips.map((tip) => <li key={tip} className="rounded-lg bg-white px-3 py-2 shadow-sm">{tip}</li>)}
          </ul>
        </section>

        <section id="best-fish" className="scroll-mt-6 space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">{text.bestFishTitle}</h2>
          <div className="overflow-x-auto rounded-lg border border-ocean-100 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-ocean-100 text-ocean-900">
                <tr>{text.tableHeaders.map((header) => <th key={header} className="px-4 py-3 font-bold">{header}</th>)}</tr>
              </thead>
              <tbody>
                {text.bestFish.map(([fish, reason, stage]) => (
                  <tr key={fish} className="border-t border-ocean-100">
                    <td className="px-4 py-3 font-bold text-ocean-950">{fish}</td>
                    <td className="px-4 py-3 text-ocean-700">{reason}</td>
                    <td className="px-4 py-3 text-ocean-700">{stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="planner" className="scroll-mt-6 rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-6">
          <h2 className="text-2xl font-bold">{text.plannerTitle}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">{text.plannerText}</p>
          <a
            href={`/${locale}`}
            onClick={() => trackEvent('guide_cta_click', { cta_name: text.plannerCta, destination: `/${locale}` })}
            className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
          >
            {text.plannerCta}
          </a>
        </section>

        <section id="short-faq" className="scroll-mt-6 space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-ocean-900">{text.faqTitle}</h2>
            <a
              href={`/${locale}/faq`}
              onClick={() => trackEvent('guide_cta_click', { cta_name: text.faqLink, destination: `/${locale}/faq` })}
              className="text-sm font-bold text-ocean-700 hover:text-ocean-900"
            >
              {text.faqLink}
            </a>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {text.faqs.map(([question, answer]) => (
              <div key={question} onClick={() => trackEvent('guide_faq_click', { question })} className="rounded-lg border border-ocean-100 bg-white p-4">
                <h3 className="font-bold text-ocean-950">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-ocean-700">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};
