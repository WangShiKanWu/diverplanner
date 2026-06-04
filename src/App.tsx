import { useEffect, useMemo, useRef, useState } from 'react';
import { AboutPage } from './components/AboutPage';
import { FaqPage } from './components/FaqPage';
import { FilterPanel } from './components/FilterPanel';
import { Footer } from './components/Footer';
import { GuidePage } from './components/GuidePage';
import { Header } from './components/Header';
import { PlannerResult } from './components/PlannerResult';
import { RecipeList } from './components/RecipeList';
import { ingredients } from './data/ingredients';
import { recipes } from './data/recipes';
import { trackEvent, trackPageView } from './lib/analytics';
import { pageSeo, setPageSeo } from './lib/seo';
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

export const App = () => {
  const [path, setPath] = useState(() => window.location.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<RecipeTag | '全部'>('全部');
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>(() => loadSelectedRecipes());
  const [unlockedFacilities, setUnlockedFacilities] = useState<UnlockedFacilities>(
    () => loadUnlockedFacilities() ?? defaultUnlockedFacilities,
  );
  const isGuidePage = path === '/guide';
  const isAboutPage = path === '/about';
  const isFaqPage = path === '/faq';
  const isContentPage = isGuidePage || isAboutPage || isFaqPage;
  const lastPlannerCompleteSignature = useRef('');

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
      if (url.origin !== window.location.origin || !['/', '/guide', '/about', '/faq'].includes(url.pathname)) {
        return;
      }

      if (url.hash && url.pathname === window.location.pathname) {
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
    if (isContentPage) {
      return;
    }

    setPageSeo(pageSeo['/']);
  }, [isContentPage]);

  useEffect(() => {
    const title = pageSeo[path]?.title ?? pageSeo['/'].title;
    trackPageView(path, title);

    if (path === '/guide') {
      trackEvent('view_guide');
    }

    if (path === '/faq') {
      trackEvent('view_faq');
    }

    if (path === '/about') {
      trackEvent('view_about');
    }
  }, [path]);

  const ingredientsById = useMemo(() => new Map(ingredients.map((ingredient) => [ingredient.id, ingredient])), []);

  const recipeMatchesQuery = (recipe: (typeof recipes)[number], query: string) => {
    if (query.length === 0) {
      return true;
    }

    return (
      normalize(recipe.nameZh).includes(query) ||
      normalize(recipe.nameEn).includes(query) ||
      recipe.ingredients.some((item) => {
        const ingredient = ingredientsById.get(item.ingredientId);

        return (
          normalize(item.ingredientId).includes(query) ||
          Boolean(ingredient && normalize(ingredient.nameZh).includes(query))
        );
      })
    );
  };

  const filteredRecipes = useMemo(() => {
    const query = normalize(searchQuery);

    return recipes.filter((recipe) => {
      const matchesQuery = recipeMatchesQuery(recipe, query);
      const matchesTag = selectedTag === '全部' || recipe.tags.includes(selectedTag);

      return matchesQuery && matchesTag;
    });
  }, [ingredientsById, searchQuery, selectedTag]);

  const getFilteredRecipeCount = (queryValue: string, tagValue: RecipeTag | '全部') => {
    const query = normalize(queryValue);

    return recipes.filter((recipe) => {
      const matchesQuery = recipeMatchesQuery(recipe, query);
      const matchesTag = tagValue === '全部' || recipe.tags.includes(tagValue);

      return matchesQuery && matchesTag;
    }).length;
  };

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
    const recipe = recipes.find((item) => item.id === recipeId);
    const isSelected = selectedRecipeIds.includes(recipeId);
    const nextSelectedCount = isSelected ? selectedRecipeIds.length - 1 : selectedRecipeIds.length + 1;

    trackEvent(isSelected ? 'recipe_unselect' : 'recipe_select', {
      recipe_id: recipeId,
      recipe_name: recipe?.nameEn ?? recipe?.nameZh ?? recipeId,
      selected_count: nextSelectedCount,
    });

    setSelectedRecipeIds((current) => {
      return current.includes(recipeId) ? current.filter((id) => id !== recipeId) : [...current, recipeId];
    });
  };

  const handleFacilityChange = (facility: FacilityKey, checked: boolean) => {
    trackEvent('facility_toggle', {
      facility_name: facility,
      enabled: checked,
    });

    setUnlockedFacilities((current) => ({
      ...current,
      [facility]: checked,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    trackEvent('recipe_search', {
      query: value,
      result_count: getFilteredRecipeCount(value, selectedTag),
    });
  };

  const handleTagChange = (value: RecipeTag | '全部') => {
    setSelectedTag(value);
    trackEvent('recipe_filter_click', {
      filter_name: value,
      result_count: getFilteredRecipeCount(searchQuery, value),
    });
  };

  useEffect(() => {
    if (plannerResult.totalRecipes === 0) {
      lastPlannerCompleteSignature.current = '';
      return;
    }

    const signature = [
      plannerResult.totalRecipes,
      plannerResult.groupedPlan.fishFarm.length,
      plannerResult.groupedPlan.landFarm.length,
      plannerResult.groupedPlan.seaFarm.length,
    ].join(':');

    if (signature === lastPlannerCompleteSignature.current) {
      return;
    }

    lastPlannerCompleteSignature.current = signature;
    trackEvent('planner_complete', {
      recipe_count: plannerResult.totalRecipes,
      fish_count: plannerResult.groupedPlan.fishFarm.length,
      crop_count: plannerResult.groupedPlan.landFarm.length,
      seaweed_count: plannerResult.groupedPlan.seaFarm.length,
    });
  }, [plannerResult]);

  return (
    <div className="min-h-screen bg-ocean-50 text-ocean-950">
      <Header currentPath={path} compact={isContentPage} />

      {isGuidePage ? (
        <GuidePage />
      ) : isAboutPage ? (
        <AboutPage />
      ) : isFaqPage ? (
        <FaqPage />
      ) : (
        <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 md:px-6 lg:grid-cols-[20%_minmax(0,50%)_30%] lg:items-start">
          <FilterPanel
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            unlockedFacilities={unlockedFacilities}
            plannerResult={plannerResult}
            onSearchChange={handleSearchChange}
            onTagChange={handleTagChange}
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

      <Footer />
    </div>
  );
};
