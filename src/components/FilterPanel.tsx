import type { FacilityKey, PlannerResult, RecipeTag, UnlockedFacilities } from '../types';
import { trackEvent } from '../lib/analytics';
import { PlanSummary } from './PlanSummary';
import type { Locale } from '../i18n/types';
import { uiText } from '../i18n/locales';

interface FilterPanelProps {
  searchQuery: string;
  selectedTag: RecipeTag | '全部';
  unlockedFacilities: UnlockedFacilities;
  plannerResult: PlannerResult;
  locale: Locale;
  onSearchChange: (value: string) => void;
  onTagChange: (value: RecipeTag | '全部') => void;
  onFacilityChange: (facility: FacilityKey, checked: boolean) => void;
}

const tags: Array<RecipeTag | '全部'> = ['全部', '赚钱', '升级', '节日备货', '懒人经营', '测试'];

const facilityOptions: Array<{ key: FacilityKey; label: string }> = [
  { key: 'fishFarm', label: '鱼场' },
  { key: 'landFarm', label: '农场' },
  { key: 'seaFarm', label: '鲛人村海底农场' },
];

export const FilterPanel = ({
  searchQuery,
  selectedTag,
  unlockedFacilities,
  plannerResult,
  locale,
  onSearchChange,
  onTagChange,
  onFacilityChange,
}: FilterPanelProps) => {
  const text = uiText[locale].planner;

  return (
    <aside className="space-y-5 rounded-lg border border-ocean-100 bg-white p-5 shadow-soft">
    <section>
      <label htmlFor="recipe-search" className="text-sm font-semibold text-ocean-900">
        {text.searchLabel}
      </label>
      <input
        id="recipe-search"
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={text.searchPlaceholder}
        className="mt-2 w-full rounded-lg border border-ocean-200 bg-ocean-50 px-3 py-2 text-sm text-ocean-950 outline-none transition focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-200"
      />
    </section>

    <section>
      <h2 className="text-sm font-semibold text-ocean-900">{text.filterTitle}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(tag)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              selectedTag === tag
                ? 'bg-ocean-700 text-white shadow-sm'
                : 'bg-ocean-50 text-ocean-800 hover:bg-ocean-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-sm font-semibold text-ocean-900">{text.facilitiesTitle}</h2>
      <div className="mt-3 space-y-3">
        {facilityOptions.map((facility) => (
          <label
            key={facility.key}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-ocean-100 bg-ocean-50 px-3 py-2 text-sm font-medium text-ocean-900"
          >
            <span>{text.facilities[facility.key]}</span>
            <input
              type="checkbox"
              checked={unlockedFacilities[facility.key]}
              onChange={(event) => onFacilityChange(facility.key, event.target.checked)}
              className="h-4 w-4 rounded border-ocean-300 text-ocean-700 focus:ring-ocean-500"
            />
          </label>
        ))}
      </div>
    </section>

    <PlanSummary result={plannerResult} locale={locale} />

    <details
      onToggle={(event) =>
        trackEvent('info_panel_toggle', {
          panel_name: 'how_to_use',
          expanded: event.currentTarget.open,
        })
      }
      className="rounded-lg border border-ocean-100 bg-ocean-50 p-4"
    >
      <summary className="cursor-pointer text-sm font-semibold text-ocean-900">{text.howToUse}</summary>
      <ol className="mt-3 space-y-2 text-sm leading-6 text-ocean-700">
        {text.howToUseSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </details>

    <details
      onToggle={(event) =>
        trackEvent('info_panel_toggle', {
          panel_name: 'score_rules',
          expanded: event.currentTarget.open,
        })
      }
      className="rounded-lg border border-ocean-100 bg-white p-4"
    >
      <summary className="cursor-pointer text-sm font-semibold text-ocean-900">{text.scoreHelp}</summary>
      <p className="mt-2 text-sm leading-6 text-ocean-700">{text.scoreIntro}</p>
      <ul className="mt-3 space-y-1 text-sm leading-6 text-ocean-700">
        {text.scoreRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </details>
  </aside>
  );
};
