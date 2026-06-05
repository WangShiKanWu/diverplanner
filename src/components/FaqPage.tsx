import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { openFeedback } from '../lib/feedback';
import { pageSeo, setPageSeo } from '../lib/seo';
import type { Locale } from '../i18n/types';

interface FaqPageProps {
  locale: Locale;
  path: string;
}

const faqSectionsByLocale = {
  en: [
    {
      id: 'about-diverplanner',
      title: 'About DiverPlanner',
      items: [
        ['What is DiverPlanner?', 'DiverPlanner is an unofficial fan-made planner for Dave the Diver. It helps players choose target recipes and automatically group required ingredients into Fish Farm, Vegetable Farm, Seaweed Farm and manual collection tasks.'],
        ['Is DiverPlanner official?', 'No. DiverPlanner is an unofficial fan-made tool. It is not affiliated with MINTROCKET, NEXON, or the official Dave the Diver team.'],
        ['Is DiverPlanner free to use?', 'Yes. DiverPlanner is currently free to use.'],
        ['Does DiverPlanner require login?', 'No. The planner works directly in the browser and does not require an account.'],
      ],
    },
    {
      id: 'recipe-planning',
      title: 'Recipe Planning',
      items: [
        ['How does recipe planning work?', 'Choose the recipes you want to prepare, and DiverPlanner calculates the ingredients required for those recipes. It then groups the materials by source, such as Fish Farm, Vegetable Farm, Seaweed Farm or manual collection.'],
        ['Can I select multiple recipes?', 'Yes. You can select multiple recipes, and the planner will combine ingredient requirements into one planning summary.'],
        ['Why are some ingredients marked as manual collection?', 'Some materials cannot be grown or bred through farm systems. These items need to be collected through diving, shops, dispatch, exploration or other in-game sources.'],
        ['Can I export my plan?', 'Yes. DiverPlanner supports copying the plan and exporting a TXT summary so you can keep it outside the browser.'],
      ],
    },
    {
      id: 'fish-farm',
      title: 'Fish Farm',
      items: [
        ['How do I unlock Fish Farm in Dave the Diver?', "Fish Farm becomes available through Otto's related questline and the fish egg system. Once unlocked, it allows you to keep and breed fish for future recipes."],
        ['How does fish breeding work?', 'Fish eggs can be collected while diving. After fish are placed in the Fish Farm, keeping at least two fish of the same species helps maintain a stable breeding supply.'],
        ['How many fish should I keep for breeding?', 'As a practical rule, keep at least two fish of the same species if you want them to reproduce and support long-term ingredient supply.'],
        ['Should I send all valuable fish to the restaurant?', 'Not always. It is often better to keep valuable or rare fish in the farm first, then send extras to the restaurant after the farm has enough stock.'],
        ['What are good fish to farm?', 'High-value or hard-to-find fish are usually stronger farming choices. Examples include Bluefin Tuna, Marlin, Sailfish and late-game rare fish.'],
      ],
    },
    {
      id: 'vegetable-farm',
      title: 'Vegetable Farm and Rice Farm',
      items: [
        ['What is Vegetable Farm used for?', 'Vegetable Farm helps produce crops used in recipes. It reduces the need to manually collect or buy every vegetable ingredient.'],
        ['Which crops are useful to grow?', 'Rice, Tomato, Carrot, Eggplant, Garlic and Onion are useful because they appear in many recipes or upgrades.'],
        ['Does DiverPlanner recommend crops?', 'Yes. When selected recipes require farm crops, DiverPlanner groups those ingredients into the farm planning section.'],
      ],
    },
    {
      id: 'seaweed-farm',
      title: 'Seaweed Farm',
      items: [
        ['What is Seaweed Farm used for?', 'Seaweed Farm helps produce marine plant ingredients used in advanced recipes.'],
        ['Which seaweed ingredients are useful?', 'Sea Grapes, Kelp, Agar, Kajime and Wakame are useful examples because they appear in several recipes.'],
        ['Why does Seaweed Farm matter in late game?', 'Late-game recipes often require seaweed and marine plant ingredients. Planning seaweed in advance can reduce manual gathering.'],
      ],
    },
    {
      id: 'accuracy-feedback',
      title: 'Accuracy and Feedback',
      items: [
        ['Is the data always accurate?', 'The data is based on manual collection, public references and in-game observation. It may include missing entries, version differences or translation differences.'],
        ['What should I do if I find an error?', 'Please use the feedback link to report incorrect recipes, ingredient amounts, unlock conditions or material sources.'],
        ['Will more recipes be added?', 'Yes. The goal is to keep expanding and improving recipe coverage over time.'],
      ],
    },
  ],
  zh: [
    {
      id: 'about-diverplanner',
      title: '关于 DiverPlanner',
      items: [
        ['DiverPlanner 是什么？', 'DiverPlanner 是一个非官方粉丝制作的《潜水员戴夫》规划器，帮助玩家选择目标菜谱，并把材料自动归类为鱼场、农场、海底农场和手动获取任务。'],
        ['DiverPlanner 是官方工具吗？', '不是。DiverPlanner 是非官方粉丝工具，与 MINTROCKET、NEXON 或 Dave the Diver 官方团队无关联。'],
        ['DiverPlanner 免费吗？', '目前可以免费使用。'],
        ['DiverPlanner 需要登录吗？', '不需要。规划器直接在浏览器中运行，不需要账号。'],
      ],
    },
    {
      id: 'recipe-planning',
      title: '菜谱规划',
      items: [
        ['菜谱规划如何工作？', '选择想准备的菜谱后，DiverPlanner 会计算所需材料，并按鱼场、农场、海底农场或手动获取归类。'],
        ['可以同时选择多个菜谱吗？', '可以。系统会把多个菜谱的材料需求合并成一份规划摘要。'],
        ['为什么有些材料显示为手动获取？', '部分材料不能通过养殖或种植获得，需要通过潜水、商店、派遣、探索或其他游戏来源补充。'],
        ['可以导出规划吗？', '可以。DiverPlanner 支持复制规划，也支持导出 TXT 摘要。'],
      ],
    },
    {
      id: 'fish-farm',
      title: '鱼场',
      items: [
        ['鱼场怎么解锁？', '鱼场会随着 Otto 相关任务和鱼卵系统解锁。解锁后可以储存并繁殖鱼类材料。'],
        ['鱼类繁殖怎么理解？', '潜水时可以获得鱼卵。鱼放入鱼场后，保留同种鱼至少两条，有助于维持长期供应。'],
        ['每种鱼应该留几条？', '实用规则是想长期繁殖的鱼至少保留两条。'],
        ['高价值鱼都应该送餐厅吗？', '不一定。很多时候先留在鱼场稳定繁殖，库存足够后再把多余的送去餐厅更稳。'],
        ['哪些鱼适合养？', '高价值、稀有或难找的鱼通常更适合优先养，例如蓝鳍金枪鱼、马林鱼、旗鱼以及后期稀有鱼。'],
      ],
    },
    {
      id: 'vegetable-farm',
      title: '农场和稻田',
      items: [
        ['农场主要用来做什么？', '农场用于生产菜谱中的作物材料，减少每次都手动购买或采集的压力。'],
        ['哪些作物比较常用？', '大米、番茄、胡萝卜、茄子、大蒜和洋葱都比较常见，因为它们会出现在多种菜谱或升级需求中。'],
        ['DiverPlanner 会推荐作物吗？', '会。只要所选菜谱需要农场作物，系统就会把这些材料放入农场规划区。'],
      ],
    },
    {
      id: 'seaweed-farm',
      title: '海底农场',
      items: [
        ['海底农场有什么用？', '海底农场用于生产高级菜谱中的海藻和海洋植物材料。'],
        ['哪些海藻值得准备？', '海葡萄、海带、琼脂、鹿角海藻和裙带菜都是比较常见的例子。'],
        ['为什么后期要重视海底农场？', '后期菜谱经常需要海藻类材料，提前规划可以减少临时采集。'],
      ],
    },
    {
      id: 'accuracy-feedback',
      title: '数据准确性与反馈',
      items: [
        ['数据一定准确吗？', '数据来自人工整理、公开资料和游戏内观察，可能存在遗漏、版本差异或翻译差异。'],
        ['发现错误怎么办？', '请通过反馈入口告诉我们错误菜谱、材料数量、解锁条件或材料来源。'],
        ['以后会增加更多菜谱吗？', '会。项目目标是持续扩大和修正菜谱覆盖范围。'],
      ],
    },
  ],
};

const getFaqItemId = (sectionId: string, itemIndex: number) => `${sectionId}-${itemIndex}`;

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

export const FaqPage = ({ locale, path }: FaqPageProps) => {
  const faqSections = faqSectionsByLocale[locale];
  const defaultExpandedItems = useMemo(() => faqSections.map((section) => getFaqItemId(section.id, 0)), [faqSections]);
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpandedItems);
  const allItemIds = useMemo(
    () => faqSections.flatMap((section) => section.items.map((_, index) => getFaqItemId(section.id, index))),
    [faqSections],
  );
  const pageText = locale === 'zh'
    ? {
        title: '潜水员戴夫养殖规划器 FAQ',
        intro: '关于 DiverPlanner、鱼场、农场、海底农场、菜谱规划和材料获取的常见问题。',
        updated: '最后更新：2026年6月',
        contents: '目录',
        expand: '全部展开',
        collapse: '全部收起',
        feedback: '发送反馈',
        ctaTitle: '还在手动规划？',
        ctaText: '使用 DiverPlanner 选择菜谱，自动生成鱼场、农场、海底农场和手动获取材料计划。',
        openPlanner: '打开规划器',
        readGuide: '阅读养殖指南',
      }
    : {
        title: 'Dave the Diver Farm Planner FAQ',
        intro: 'Answers to common questions about DiverPlanner, Dave the Diver Fish Farm, Vegetable Farm, Seaweed Farm, recipe planning and ingredient collection.',
        updated: 'Last Updated: June 2026',
        contents: 'Contents',
        expand: 'Expand all',
        collapse: 'Collapse all',
        feedback: 'Send Feedback',
        ctaTitle: 'Still Planning Manually?',
        ctaText: 'Use DiverPlanner to choose recipes and automatically generate a Fish Farm, Vegetable Farm, Seaweed Farm and manual collection plan.',
        openPlanner: 'Open Planner',
        readGuide: 'Read Farming Guide',
      };

  useEffect(() => {
    setExpandedItems(defaultExpandedItems);
  }, [defaultExpandedItems]);

  useEffect(() => {
    setPageSeo(pageSeo[path]);

    const flatFaqItems = faqSections.flatMap((section) => section.items);
    setJsonLd('faq-page-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: flatFaqItems.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
    setJsonLd('faq-breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://diverplanner.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: `https://diverplanner.com/${locale}/faq` },
      ],
    });

    return () => {
      document.getElementById('faq-page-jsonld')?.remove();
      document.getElementById('faq-breadcrumb-jsonld')?.remove();
    };
  }, [faqSections, locale, path]);

  const toggleItem = (itemId: string) => {
    const item = faqSections
      .flatMap((section) => section.items.map(([question, answer], index) => ({ question, answer, section: section.title, id: getFaqItemId(section.id, index) })))
      .find((faq) => faq.id === itemId);
    const expanded = !expandedItems.includes(itemId);

    setExpandedItems((current) =>
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId],
    );
    trackEvent('faq_toggle', {
      question: item?.question ?? itemId,
      section_name: item?.section ?? 'unknown',
      expanded,
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 text-ocean-950 md:px-6 md:py-8">
      <article className="space-y-5">
        <section className="rounded-lg border border-ocean-100 bg-white p-4 shadow-soft md:p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-reef-700">FAQ</p>
          <h1 className="mt-2 text-2xl font-bold text-ocean-950 md:text-4xl">{pageText.title}</h1>
          <p className="mt-3 text-base leading-7 text-ocean-700">{pageText.intro}</p>
          <p className="mt-2 text-sm font-semibold text-ocean-500">{pageText.updated}</p>
        </section>

        <nav className="rounded-lg border border-ocean-100 bg-white p-3 shadow-sm md:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-ocean-900">{pageText.contents}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setExpandedItems(allItemIds);
                  trackEvent('faq_expand_all', { page_path: window.location.pathname });
                }}
                className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ocean-700 ring-1 ring-ocean-100 transition hover:bg-ocean-50"
              >
                {pageText.expand}
              </button>
              <button
                type="button"
                onClick={() => {
                  setExpandedItems([]);
                  trackEvent('faq_collapse_all', { page_path: window.location.pathname });
                }}
                className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ocean-700 ring-1 ring-ocean-100 transition hover:bg-ocean-50"
              >
                {pageText.collapse}
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => trackEvent('faq_contents_click', { section_name: section.title, target_id: section.id })}
                className="rounded-full bg-ocean-100 px-3 py-1 text-sm font-bold text-ocean-800 transition hover:bg-ocean-200"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        {faqSections.map((section) => (
          <section key={section.title} id={section.id} className="scroll-mt-6 space-y-3">
            <h2 className="text-2xl font-bold text-ocean-900">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map(([question, answer], itemIndex) => {
                const itemId = getFaqItemId(section.id, itemIndex);
                const panelId = `${itemId}-answer`;
                const isExpanded = expandedItems.includes(itemId);

                return (
                  <div key={question} className="rounded-lg border border-ocean-100 bg-white shadow-sm">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        onClick={() => toggleItem(itemId)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-bold text-ocean-950"
                      >
                        <span>{question}</span>
                        <span className="shrink-0 text-xl leading-none text-ocean-500">{isExpanded ? '-' : '+'}</span>
                      </button>
                    </h3>
                    <div id={panelId} className={isExpanded ? 'px-4 pb-4' : 'hidden px-4 pb-4'}>
                      <p className="leading-7 text-ocean-700">{answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {section.id === 'accuracy-feedback' && (
              <button
                type="button"
                onClick={() => openFeedback('faq')}
                aria-label={pageText.feedback}
                className="inline-flex rounded-full bg-ocean-100 px-4 py-2 text-sm font-bold text-ocean-800 transition hover:bg-ocean-200"
              >
                {pageText.feedback}
              </button>
            )}
          </section>
        ))}

        <section className="rounded-lg bg-ocean-800 p-5 text-white shadow-soft md:p-7">
          <h2 className="text-2xl font-bold">{pageText.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ocean-100">{pageText.ctaText}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`/${locale}`}
              onClick={() => trackEvent('faq_cta_click', { cta_name: pageText.openPlanner, destination: `/${locale}` })}
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
            >
              {pageText.openPlanner}
            </a>
            <a
              href={`/${locale}/guide`}
              onClick={() => trackEvent('faq_cta_click', { cta_name: pageText.readGuide, destination: `/${locale}/guide` })}
              className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              {pageText.readGuide}
            </a>
          </div>
        </section>
      </article>
    </main>
  );
};
