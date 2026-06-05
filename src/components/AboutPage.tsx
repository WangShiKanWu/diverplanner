import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { openFeedback } from '../lib/feedback';
import { pageSeo, setPageSeo } from '../lib/seo';
import type { Locale } from '../i18n/types';

interface AboutPageProps {
  locale: Locale;
  path: string;
}

const content = {
  en: {
    eyebrow: 'About',
    title: 'About DiverPlanner',
    intro:
      'DiverPlanner is an unofficial fan-made planning tool for Dave the Diver players. It helps players choose target recipes and automatically group required ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.',
    whatTitle: 'What Is DiverPlanner?',
    what: [
      'DiverPlanner is a recipe and farming planner for Dave the Diver. After players select target recipes, the tool breaks down ingredient requirements and groups them into Fish Farm, Vegetable Farm, Seaweed Farm and Manual Collection categories.',
      'The goal is to reduce repeated wiki lookups, spreadsheet checks and manual counting by turning recipe choices into a practical farming plan.',
    ],
    whyTitle: 'Why This Tool Was Created',
    why: [
      'Late-game recipes often require fish, crops, seaweed and manually collected materials at the same time, making it harder to decide what to farm next.',
      'DiverPlanner brings those scattered decisions into one clear, actionable plan for recipe planning and farm ingredient preparation.',
    ],
    helpTitle: 'What DiverPlanner Can Help With',
    helpItems: ['Recipe planning', 'Fish Farm guidance', 'Crop planning', 'Seaweed planning', 'Manual checklist', 'Export summary'],
    dataTitle: 'Data Accuracy',
    data: [
      'Data is manually collected from public references and in-game observation. It may include missing entries, version differences or translation differences.',
      'Treat results as planning references, not official data. If you find incorrect recipes, ingredient amounts or material sources, feedback is welcome.',
    ],
    disclaimerTitle: 'Unofficial Fan Tool Disclaimer',
    disclaimer:
      'DiverPlanner is an unofficial fan-made tool. It is not affiliated with MINTROCKET, NEXON, or the official Dave the Diver team.',
    disclaimerZh: '本站为非官方粉丝工具，与 MINTROCKET、NEXON 或 Dave the Diver 官方团队无关联。',
    feedbackTitle: 'Feedback',
    feedbackText:
      'Feedback is welcome for incorrect recipes, ingredient amounts, unlock conditions or feature suggestions. For now, please use the feedback link in the footer.',
    feedbackButton: 'Send Feedback',
    ctaTitle: 'Start Planning Your Farm',
    ctaText: 'Choose your target recipes and let DiverPlanner generate a farming and collection plan automatically.',
    openPlanner: 'Open Planner',
    readGuide: 'Read Farming Guide',
  },
  zh: {
    eyebrow: '关于',
    title: '关于 DiverPlanner',
    intro:
      'DiverPlanner 是一个非官方粉丝制作的《潜水员戴夫》菜谱与养殖规划工具，帮助玩家根据目标菜谱快速生成鱼场、农场、海底农场和手动获取材料计划。',
    whatTitle: 'DiverPlanner 是什么？',
    what: [
      'DiverPlanner 是一个以菜谱为起点的养殖规划器。玩家选择目标菜谱后，系统会拆分材料需求，并自动归类为鱼场、农场、海底农场和手动获取材料。',
      '它的目标是减少反复查 Wiki、手动做表和临时计算，把“想做哪些菜”转换成可以直接执行的备料计划。',
    ],
    whyTitle: '为什么创建这个工具？',
    why: [
      '《潜水员戴夫》后期菜谱会同时需要鱼类、作物、海藻和派遣或探索材料，玩家经常要判断哪些该提前养、哪些该先留库存。',
      'DiverPlanner 把这些分散信息整理成一个清晰计划，让菜谱规划和养殖安排更直接。',
    ],
    helpTitle: 'DiverPlanner 可以帮你做什么？',
    helpItems: ['菜谱材料规划', '鱼场养殖建议', '农场作物规划', '海底农场规划', '手动材料清单', '可导出的规划摘要'],
    dataTitle: '数据准确性',
    data: [
      '当前数据基于人工整理、公开资料和游戏内观察，可能存在遗漏、版本差异或翻译差异。',
      '工具结果应作为规划参考，不应视为官方数据。如果发现菜谱、数量或来源错误，欢迎反馈。',
    ],
    disclaimerTitle: '非官方粉丝工具声明',
    disclaimer:
      'DiverPlanner is an unofficial fan-made tool. It is not affiliated with MINTROCKET, NEXON, or the official Dave the Diver team.',
    disclaimerZh: '本站为非官方粉丝工具，与 MINTROCKET、NEXON 或 Dave the Diver 官方团队无关联。',
    feedbackTitle: '反馈',
    feedbackText: '欢迎反馈错误菜谱、材料数量、解锁条件或功能建议。目前可以使用页面底部或本页的反馈入口。',
    feedbackButton: '发送反馈',
    ctaTitle: '开始规划你的养殖计划',
    ctaText: '选择目标菜谱，让 DiverPlanner 自动生成养殖和手动获取材料计划。',
    openPlanner: '打开规划器',
    readGuide: '阅读养殖指南',
  },
};

export const AboutPage = ({ locale, path }: AboutPageProps) => {
  const text = content[locale];
  const plannerPath = `/${locale}`;
  const guidePath = `/${locale}/guide`;

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

        <div className="grid gap-5 md:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">{text.whatTitle}</h2>
            {text.what.map((paragraph) => <p key={paragraph} className="leading-7 text-ocean-800">{paragraph}</p>)}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">{text.whyTitle}</h2>
            {text.why.map((paragraph) => <p key={paragraph} className="leading-7 text-ocean-800">{paragraph}</p>)}
          </section>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">{text.helpTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {text.helpItems.map((item) => (
              <div key={item} className="rounded-lg border border-ocean-100 bg-white p-3 font-bold text-ocean-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">{text.dataTitle}</h2>
            {text.data.map((paragraph) => <p key={paragraph} className="leading-7 text-ocean-800">{paragraph}</p>)}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">{text.disclaimerTitle}</h2>
            <div className="rounded-lg border-l-4 border-coral-500 bg-white p-4 leading-7 text-ocean-800 shadow-sm">
              <p>{text.disclaimer}</p>
              <p className="mt-3">{text.disclaimerZh}</p>
            </div>
          </section>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ocean-900">{text.feedbackTitle}</h2>
          <p className="leading-7 text-ocean-800">{text.feedbackText}</p>
          <button
            type="button"
            onClick={() => openFeedback('about')}
            aria-label={text.feedbackButton}
            className="inline-flex rounded-full bg-ocean-100 px-4 py-2 text-sm font-bold text-ocean-800 transition hover:bg-ocean-200"
          >
            {text.feedbackButton}
          </button>
        </section>

        <section className="rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-7">
          <h2 className="text-2xl font-bold">{text.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">{text.ctaText}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={plannerPath}
              onClick={() => trackEvent('about_cta_click', { cta_name: text.openPlanner, destination: plannerPath })}
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
            >
              {text.openPlanner}
            </a>
            <a
              href={guidePath}
              onClick={() => trackEvent('about_cta_click', { cta_name: text.readGuide, destination: guidePath })}
              className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              {text.readGuide}
            </a>
          </div>
        </section>
      </article>
    </main>
  );
};
