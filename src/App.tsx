import { useEffect, useMemo, useState } from 'react';
import { AboutDialog } from './components/AboutDialog';
import { FilterPanel } from './components/FilterPanel';
import { Footer } from './components/Footer';
import { GuidePage } from './components/GuidePage';
import { Header } from './components/Header';
import { PlannerResult } from './components/PlannerResult';
import { RecipeList } from './components/RecipeList';
import { ingredients } from './data/ingredients';
import { recipes } from './data/recipes';
import type { FacilityKey, RecipeTag, UnlockedFacilities } from './types';
import { buildPlannerResult } from './utils/planner';
import {
  defaultUnlockedFacilities,
  loadSelectedRecipes,
  loadUnlockedFacilities,
  saveSelectedRecipes,
  saveUnlockedFacilities,
} from './utils/storage';

const normalize = (value: string) => value.trim().toLowerCase();

const setMeta = (name: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (element) {
    element.content = content;
  }
};

const setCanonical = (href?: string) => {
  const element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!href) {
    element?.remove();
    return;
  }

  if (element) {
    element.href = href;
  }
};

const removeMeta = (selector: string) => {
  document.head.querySelectorAll(selector).forEach((element) => element.remove());
};

export const App = () => {
  const [path, setPath] = useState(() => window.location.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<RecipeTag | '全部'>('全部');
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>(() => loadSelectedRecipes());
  const [unlockedFacilities, setUnlockedFacilities] = useState<UnlockedFacilities>(
    () => loadUnlockedFacilities() ?? defaultUnlockedFacilities,
  );
  const [aboutOpen, setAboutOpen] = useState(false);
  const isGuidePage = path === '/guide';

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href]');

      if (!link || link.target || link.hasAttribute('download')) {
        return;
      }

      const url = new URL(link.href);
      if (url.origin !== window.location.origin || !['/', '/guide'].includes(url.pathname)) {
        return;
      }

      event.preventDefault();
      window.history.pushState({}, '', url.pathname);
      setPath(url.pathname);
      window.scrollTo({ top: 0 });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (isGuidePage) {
      return;
    }

    document.title = '潜水员戴夫养殖规划器 | Dave the Diver Farm Planner';
    setMeta('description', '根据目标菜谱自动生成鱼场、农场和鲛人村海底农场养殖规划的非官方粉丝工具。');
    setMeta('keywords', '潜水员戴夫,Dave the Diver,养殖规划器,鱼场,农场,海底农场,菜谱');
    setCanonical();
    removeMeta('meta[property^="og:"], meta[name^="twitter:"]');
  }, [isGuidePage]);

  const ingredientsById = useMemo(() => new Map(ingredients.map((ingredient) => [ingredient.id, ingredient])), []);

  const filteredRecipes = useMemo(() => {
    const query = normalize(searchQuery);

    return recipes.filter((recipe) => {
      const matchesQuery =
        query.length === 0 ||
        normalize(recipe.nameZh).includes(query) ||
        normalize(recipe.nameEn).includes(query);
      const matchesTag = selectedTag === '全部' || recipe.tags.includes(selectedTag);

      return matchesQuery && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const plannerResult = useMemo(
    () => buildPlannerResult(selectedRecipeIds, recipes, ingredients, unlockedFacilities),
    [selectedRecipeIds, unlockedFacilities],
  );

  useEffect(() => {
    saveSelectedRecipes(selectedRecipeIds);
  }, [selectedRecipeIds]);

  useEffect(() => {
    saveUnlockedFacilities(unlockedFacilities);
  }, [unlockedFacilities]);

  const handleToggleRecipe = (recipeId: string) => {
    setSelectedRecipeIds((current) =>
      current.includes(recipeId) ? current.filter((id) => id !== recipeId) : [...current, recipeId],
    );
  };

  const handleFacilityChange = (facility: FacilityKey, checked: boolean) => {
    setUnlockedFacilities((current) => ({
      ...current,
      [facility]: checked,
    }));
  };

  return (
    <div className="min-h-screen bg-ocean-50 text-ocean-950">
      <Header onOpenAbout={() => setAboutOpen(true)} compact={isGuidePage} />

      {isGuidePage ? (
        <GuidePage />
      ) : (
        <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 md:px-6 lg:grid-cols-[20%_minmax(0,50%)_30%] lg:items-start">
          <FilterPanel
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            unlockedFacilities={unlockedFacilities}
            plannerResult={plannerResult}
            onSearchChange={setSearchQuery}
            onTagChange={setSelectedTag}
            onFacilityChange={handleFacilityChange}
          />

          <RecipeList
            recipes={filteredRecipes}
            ingredientsById={ingredientsById}
            selectedRecipeIds={selectedRecipeIds}
            onToggleRecipe={handleToggleRecipe}
          />

          <div className="lg:sticky lg:top-5">
            <PlannerResult result={plannerResult} />
          </div>
        </main>
      )}

      <Footer onOpenAbout={() => setAboutOpen(true)} />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};
