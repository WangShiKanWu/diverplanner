import { useEffect, useMemo, useState } from 'react';
import { AboutDialog } from './components/AboutDialog';
import { FilterPanel } from './components/FilterPanel';
import { Footer } from './components/Footer';
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

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<RecipeTag | '全部'>('全部');
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>(() => loadSelectedRecipes());
  const [unlockedFacilities, setUnlockedFacilities] = useState<UnlockedFacilities>(
    () => loadUnlockedFacilities() ?? defaultUnlockedFacilities,
  );
  const [aboutOpen, setAboutOpen] = useState(false);

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
      <Header onOpenAbout={() => setAboutOpen(true)} />

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

      <Footer onOpenAbout={() => setAboutOpen(true)} />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};
