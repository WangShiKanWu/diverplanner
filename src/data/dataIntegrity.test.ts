import { describe, expect, it } from 'vitest';
import { ingredients } from './ingredients';
import { recipes } from './recipes';
import { buildPlannerResult } from '../utils/planner';
import { defaultUnlockedFacilities } from '../utils/storage';

describe('local data integrity', () => {
  it('contains V1.2 coverage targets and valid recipe ingredient references', () => {
    const ingredientIds = new Set(ingredients.map((ingredient) => ingredient.id));
    const fishCount = ingredients.filter((ingredient) => ingredient.type === 'fish').length;
    const missingIngredientIds = recipes.flatMap((recipe) =>
      recipe.ingredients
        .filter((ingredient) => !ingredientIds.has(ingredient.ingredientId))
        .map((ingredient) => `${recipe.id}:${ingredient.ingredientId}`),
    );

    expect(recipes.length).toBeGreaterThanOrEqual(50);
    expect(fishCount).toBeGreaterThanOrEqual(50);
    expect(missingIngredientIds).toEqual([]);
  });

  it('includes a full demo recipe that lights up all four result sections', () => {
    const result = buildPlannerResult(['full_demo_recipe'], recipes, ingredients, defaultUnlockedFacilities);

    expect(result.groupedPlan.fishFarm.map((item) => [item.ingredient.id, item.amount])).toEqual([['salmon', 2]]);
    expect(result.fishFarmByZone.medium?.map((item) => item.ingredient.nameZh)).toEqual(['三文鱼']);
    expect(result.groupedPlan.landFarm.map((item) => [item.ingredient.id, item.amount])).toEqual([['rice', 2]]);
    expect(result.groupedPlan.seaFarm.map((item) => [item.ingredient.id, item.amount])).toEqual([['wakame', 2]]);
    expect(result.groupedPlan.manual.map((item) => [item.ingredient.id, item.amount])).toEqual([['soy_sauce', 1]]);
  });
});
