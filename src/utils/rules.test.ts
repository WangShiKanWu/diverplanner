import { describe, expect, it } from 'vitest';
import type { Ingredient, Recipe } from '../types';
import { evaluatePlanItem, getFishFarmZoneLabel } from './rules';

const tuna: Ingredient = {
  id: 'tuna',
  nameZh: '测试金枪鱼',
  type: 'fish',
  source: '深海鱼场',
  farmArea: 'fishFarm',
  priority: 9,
  image: '/images/ingredients/fish.svg',
  fishFarmZone: 'deep',
  baseValue: 9,
  growthDifficulty: 6,
  manualDifficulty: 8,
  spaceCost: 4,
};

const recipes: Recipe[] = [
  {
    id: 'premium-sushi',
    nameZh: '高价寿司',
    nameEn: 'Premium Sushi',
    image: '/images/recipes/sushi.svg',
    price: 1600,
    tags: ['赚钱'],
    ingredients: [{ ingredientId: 'tuna', amount: 4 }],
  },
];

describe('rules', () => {
  it('scores a fish by demand, recipe value, manual difficulty, and farmability', () => {
    const result = evaluatePlanItem({
      requirement: { ingredient: tuna, amount: 4 },
      selectedRecipes: recipes,
      targetArea: 'fishFarm',
    });

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.level).toBe('强烈推荐');
    expect(result.reasons).toContain('长期繁殖');
    expect(result.reasons).toContain('深海池可养');
    expect(result.reasons).toContain('高收益');
  });

  it('exposes Chinese fish farm zone labels for recommendations', () => {
    expect(getFishFarmZoneLabel('shallow')).toBe('浅海池');
    expect(getFishFarmZoneLabel('hydrothermal')).toBe('热液区');
  });
});
