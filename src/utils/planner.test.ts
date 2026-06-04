import { describe, expect, it } from 'vitest';
import type { Ingredient, Recipe, UnlockedFacilities } from '../types';
import { buildPlannerResult } from './planner';

const testIngredients: Ingredient[] = [
  {
    id: 'fish-a',
    nameZh: '测试鱼',
    type: 'fish',
    source: '鱼场',
    farmArea: 'fishFarm',
    priority: 8,
    image: '/images/ingredients/fish.svg',
    fishFarmZone: 'medium',
    baseValue: 7,
    growthDifficulty: 4,
    manualDifficulty: 6,
    spaceCost: 3,
  },
  {
    id: 'crop-a',
    nameZh: '测试作物',
    type: 'crop',
    source: '农场',
    farmArea: 'landFarm',
    priority: 5,
    image: '/images/ingredients/crop.svg',
  },
  {
    id: 'seaweed-a',
    nameZh: '测试海藻',
    type: 'seaweed',
    source: '海底农场',
    farmArea: 'seaFarm',
    priority: 7,
    image: '/images/ingredients/seaweed.svg',
  },
  {
    id: 'manual-a',
    nameZh: '测试手动材料',
    type: 'manual',
    source: '探索',
    farmArea: 'manual',
    priority: 3,
    image: '/images/ingredients/manual.svg',
  },
];

const testRecipes: Recipe[] = [
  {
    id: 'recipe-a',
    nameZh: '菜谱 A',
    nameEn: 'Recipe A',
    image: '/images/recipes/sushi.svg',
    price: 100,
    tags: ['赚钱'],
    ingredients: [
      { ingredientId: 'fish-a', amount: 2 },
      { ingredientId: 'crop-a', amount: 1 },
      { ingredientId: 'manual-a', amount: 1 },
    ],
  },
  {
    id: 'recipe-b',
    nameZh: '菜谱 B',
    nameEn: 'Recipe B',
    image: '/images/recipes/sushi.svg',
    price: 200,
    tags: ['升级'],
    ingredients: [
      { ingredientId: 'fish-a', amount: 3 },
      { ingredientId: 'seaweed-a', amount: 4 },
    ],
  },
];

describe('buildPlannerResult', () => {
  it('summarizes duplicate ingredients and groups farmable items by unlocked facility', () => {
    const unlocked: UnlockedFacilities = {
      fishFarm: true,
      landFarm: true,
      seaFarm: true,
    };

    const result = buildPlannerResult(['recipe-a', 'recipe-b'], testRecipes, testIngredients, unlocked);

    expect(result.totalRecipes).toBe(2);
    expect(result.ingredientSummary.map((item) => [item.ingredient.id, item.amount])).toEqual([
      ['fish-a', 5],
      ['seaweed-a', 4],
      ['crop-a', 1],
      ['manual-a', 1],
    ]);
    expect(result.groupedPlan.fishFarm[0].amount).toBe(5);
    expect(result.fishFarmByZone.medium?.[0].ingredient.id).toBe('fish-a');
    expect(result.groupedPlan.landFarm[0].ingredient.id).toBe('crop-a');
    expect(result.groupedPlan.seaFarm[0].ingredient.id).toBe('seaweed-a');
    expect(result.groupedPlan.manual[0].ingredient.id).toBe('manual-a');
  });

  it('moves farmable ingredients into manual plan when the matching facility is locked', () => {
    const unlocked: UnlockedFacilities = {
      fishFarm: false,
      landFarm: true,
      seaFarm: false,
    };

    const result = buildPlannerResult(['recipe-a', 'recipe-b'], testRecipes, testIngredients, unlocked);

    expect(result.groupedPlan.fishFarm).toEqual([]);
    expect(result.groupedPlan.seaFarm).toEqual([]);
    expect(result.groupedPlan.manual.map((item) => item.ingredient.id)).toEqual([
      'fish-a',
      'seaweed-a',
      'manual-a',
    ]);
    expect(result.groupedPlan.manual[0].reason).toContain('尚未解锁鱼场');
    expect(result.groupedPlan.manual[1].reason).toContain('尚未解锁鲛人村海底农场');
  });

  it('keeps fish zone grouping as planner output when fish farm is unlocked', () => {
    const unlocked: UnlockedFacilities = {
      fishFarm: true,
      landFarm: true,
      seaFarm: true,
    };

    const result = buildPlannerResult(['recipe-a'], testRecipes, testIngredients, unlocked);

    expect(result.fishFarmByZone.medium?.map((item) => item.ingredient.id)).toEqual(['fish-a']);
    expect(result.groupedPlan.fishFarm[0].fishFarmZone).toBe('medium');
  });
});
