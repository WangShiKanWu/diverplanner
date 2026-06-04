import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Ingredient, Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  ingredientsById: Map<string, Ingredient>;
  selectedRecipeIds: string[];
  onToggleRecipe: (recipeId: string) => void;
}

const recipesPerPage = 6;

export const RecipeList = ({ recipes, ingredientsById, selectedRecipeIds, onToggleRecipe }: RecipeListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const visibleRecipes = useMemo(
    () => (showSelectedOnly ? recipes.filter((recipe) => selectedRecipeIds.includes(recipe.id)) : recipes),
    [recipes, selectedRecipeIds, showSelectedOnly],
  );
  const totalPages = Math.max(1, Math.ceil(visibleRecipes.length / recipesPerPage));
  const pageRecipes = visibleRecipes.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes, showSelectedOnly]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleSelectedOnlyChange = (enabled: boolean) => {
    setShowSelectedOnly(enabled);
    trackEvent('selected_only_toggle', {
      enabled,
      selected_count: selectedRecipeIds.length,
    });
  };

  const handlePageChange = (direction: 'previous' | 'next') => {
    const nextPage = direction === 'previous' ? Math.max(1, currentPage - 1) : Math.min(totalPages, currentPage + 1);

    setCurrentPage(nextPage);
    trackEvent('recipe_page_change', {
      page: nextPage,
      direction,
    });
  };

  return (
    <section className="space-y-4 self-start">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ocean-950">菜谱选择</h2>
          <p className="mt-1 text-sm text-ocean-600">
            当前显示 {visibleRecipes.length} 个菜谱，每页 {recipesPerPage} 个
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ocean-800 shadow-sm">
            <input
              type="checkbox"
              checked={showSelectedOnly}
              onChange={(event) => handleSelectedOnlyChange(event.target.checked)}
              className="h-4 w-4 rounded border-ocean-300 text-ocean-700 focus:ring-ocean-500"
            />
            只看已选菜谱
          </label>
          <span className="rounded-full bg-ocean-100 px-3 py-1.5 text-sm font-semibold text-ocean-800">
            已选 {selectedRecipeIds.length}
          </span>
        </div>
      </div>

      <div className={`grid gap-4 ${pageRecipes.length <= 2 ? 'content-start' : 'auto-rows-fr'}`}>
        {pageRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            ingredientsById={ingredientsById}
            selected={selectedRecipeIds.includes(recipe.id)}
            onToggle={onToggleRecipe}
          />
        ))}
      </div>

      {visibleRecipes.length === 0 && (
        <div className="rounded-lg border border-dashed border-ocean-200 bg-white p-8 text-center text-ocean-600">
          没有匹配的菜谱，试试更换搜索词、筛选类型或关闭只看已选。
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ocean-100 bg-white px-4 py-3">
        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() => handlePageChange('previous')}
          className="rounded-full bg-ocean-100 px-4 py-2 text-sm font-bold text-ocean-800 transition hover:bg-ocean-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          上一页
        </button>
        <span className="text-sm font-semibold text-ocean-700">
          第 {currentPage} / {totalPages} 页
        </span>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => handlePageChange('next')}
          className="rounded-full bg-ocean-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-ocean-800 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          下一页
        </button>
      </div>
    </section>
  );
};
