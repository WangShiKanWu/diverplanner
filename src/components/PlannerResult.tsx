import { useState } from 'react';
import type { FishFarmZone, GroupedPlan, PlanItem } from '../types';
import type { PlannerResult as PlannerResultType } from '../types';
import { fishFarmZoneOrder, getFishFarmZoneDepth, getFishFarmZoneLabel } from '../utils/rules';
import type { Locale } from '../i18n/types';
import { uiText } from '../i18n/locales';

interface PlannerResultProps {
  result: PlannerResultType;
  locale: Locale;
}

const groups: Array<{ key: keyof GroupedPlan; titleKey: 'landFarmRecommendation' | 'seaFarmRecommendation' | 'manualRecommendation'; emptyKey: 'emptyLand' | 'emptySea' | 'emptyManual'; accent: string }> = [
  { key: 'landFarm', titleKey: 'landFarmRecommendation', emptyKey: 'emptyLand', accent: 'bg-reef-500' },
  { key: 'seaFarm', titleKey: 'seaFarmRecommendation', emptyKey: 'emptySea', accent: 'bg-teal-500' },
  { key: 'manual', titleKey: 'manualRecommendation', emptyKey: 'emptyManual', accent: 'bg-coral-500' },
];

const getScoreClassName = (score: number) => {
  if (score >= 90) {
    return 'bg-reef-100 text-reef-700';
  }

  if (score >= 75) {
    return 'bg-ocean-100 text-ocean-800';
  }

  if (score >= 60) {
    return 'bg-amber-100 text-amber-800';
  }

  return 'bg-slate-100 text-slate-600';
};

const ReasonTags = ({ reasons }: { reasons: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleReasons = expanded ? reasons : reasons.slice(0, 3);
  const hiddenCount = Math.max(0, reasons.length - visibleReasons.length);

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {visibleReasons.map((reason) => (
        <span key={reason} className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-ocean-700">
          {reason}
        </span>
      ))}
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="rounded-full bg-ocean-200 px-2 py-1 text-xs font-bold text-ocean-800 transition hover:bg-ocean-300"
        >
          +{hiddenCount}
        </button>
      )}
    </div>
  );
};

const PlanList = ({
  items,
  emptyText,
  areaLabel,
  locale,
}: {
  items: PlanItem[];
  emptyText: string;
  areaLabel?: string;
  locale: Locale;
}) => {
  const text = uiText[locale].planner;

  if (items.length === 0) {
    return <p className="mt-3 text-sm text-ocean-500">{emptyText}</p>;
  }

  return (
    <div className="mt-3 space-y-3">
      {items.map((item) => (
        <div key={item.ingredient.id} className="rounded-lg bg-ocean-50 p-3">
          <div className="flex items-start gap-3">
            <img
              src={item.ingredient.image}
              alt=""
              className="h-16 w-16 shrink-0 rounded-lg border border-ocean-100 bg-white object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-ocean-950">{item.ingredient.nameZh}</h4>
              <p className="mt-1 text-xs text-ocean-600">{text.source}：{item.source}</p>
              <p className="mt-1 text-xs text-ocean-600">
                {text.area}：{areaLabel ?? (item.fishFarmZone ? getFishFarmZoneLabel(item.fishFarmZone) : text.manualArea)}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="rounded-full bg-white px-2.5 py-1 text-sm font-bold text-ocean-800">{text.demand}：x{item.amount}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${getScoreClassName(item.score)}`}>
                {text.score}：{item.score}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs font-semibold text-ocean-700">{item.level}</p>
          <ReasonTags reasons={item.reasons} />
        </div>
      ))}
    </div>
  );
};

const SectionTitle = ({ title, accent }: { title: string; accent: string }) => (
  <div className="flex items-center gap-2">
    <span className={`h-5 w-1 rounded-full ${accent}`} />
    <h3 className="text-base font-bold text-ocean-950">{title}</h3>
  </div>
);

const emptyPlanTipAccents = ['bg-ocean-600', 'bg-reef-500', 'bg-teal-500', 'bg-coral-500'];

const EmptyPlannerTips = ({ locale }: { locale: Locale }) => {
  const text = uiText[locale].planner;

  return (
    <aside className="space-y-3 rounded-lg border border-ocean-100 bg-white/80 p-4 shadow-soft backdrop-blur">
      {text.emptyTips.map(([title, tipText], index) => (
        <section key={title} className="rounded-lg border border-ocean-100 bg-white p-4">
          <SectionTitle title={title} accent={emptyPlanTipAccents[index]} />
          <p className="mt-3 text-sm leading-6 text-ocean-600">{tipText}</p>
        </section>
      ))}
    </aside>
  );
};

const FishFarmPlan = ({ result, locale }: PlannerResultProps) => {
  const hasFishPlan = result.groupedPlan.fishFarm.length > 0;
  const text = uiText[locale].planner;

  return (
    <section className="rounded-lg border border-ocean-100 bg-white p-4">
      <SectionTitle title={text.fishFarmRecommendation} accent="bg-ocean-600" />
      {!hasFishPlan ? (
        <p className="mt-3 text-sm text-ocean-500">{text.emptyFish}</p>
      ) : (
        <div className="mt-3 space-y-4">
          {fishFarmZoneOrder.map((zone: FishFarmZone) => {
            const items = result.fishFarmByZone[zone] ?? [];

            if (items.length === 0) {
              return null;
            }

            const depth = getFishFarmZoneDepth(zone);
            const label = getFishFarmZoneLabel(zone);

            return (
              <div key={zone} className="rounded-lg border border-ocean-100 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-bold text-ocean-900">{label}</h4>
                  {depth && <span className="text-xs font-semibold text-ocean-500">{depth}</span>}
                </div>
                <PlanList items={items} emptyText="" areaLabel={label} locale={locale} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export const PlannerResult = ({ result, locale }: PlannerResultProps) => {
  const text = uiText[locale].planner;
  const areaLabels: Record<keyof GroupedPlan, string> = {
    fishFarm: text.facilities.fishFarm,
    landFarm: text.facilities.landFarm,
    seaFarm: text.facilities.seaFarm,
    manual: text.manualArea,
  };

  if (result.totalRecipes === 0) {
    return <EmptyPlannerTips locale={locale} />;
  }

  return (
    <aside className="space-y-4 rounded-lg border border-ocean-100 bg-white/80 p-4 shadow-soft backdrop-blur">
      <FishFarmPlan result={result} locale={locale} />

      {groups.map((group) => (
        <section key={group.key} className="rounded-lg border border-ocean-100 bg-white p-4">
          <SectionTitle title={text[group.titleKey]} accent={group.accent} />
          <PlanList
            items={result.groupedPlan[group.key]}
            emptyText={text[group.emptyKey]}
            areaLabel={areaLabels[group.key]}
            locale={locale}
          />
        </section>
      ))}
    </aside>
  );
};
