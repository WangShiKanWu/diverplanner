import { describe, expect, it } from 'vitest';
import type { PlannerResult } from '../types';
import { buildPlanText } from './exportPlan';

describe('buildPlanText', () => {
  it('exports recipes, material demand, grouped fish zones, farms, and manual items', () => {
    const result: PlannerResult = {
      selectedRecipes: [
        {
          id: 'recipe-a',
          nameZh: '蓝鳍金枪鱼寿司套餐',
          nameEn: 'Bluefin Tuna Sushi Set',
          image: '/images/recipes/sushi.svg',
          price: 1380,
          tags: ['赚钱'],
          ingredients: [],
        },
      ],
      totalRecipes: 1,
      ingredientSummary: [
        {
          ingredient: {
            id: 'bluefin-tuna',
            nameZh: '蓝鳍金枪鱼',
            type: 'fish',
            source: '鱼场',
            farmArea: 'fishFarm',
            priority: 10,
            image: '/images/ingredients/fish.svg',
            fishFarmZone: 'deep',
          },
          amount: 3,
        },
      ],
      groupedPlan: {
        fishFarm: [],
        landFarm: [],
        seaFarm: [],
        manual: [],
      },
      fishFarmByZone: {
        deep: [
          {
            ingredient: {
              id: 'bluefin-tuna',
              nameZh: '蓝鳍金枪鱼',
              type: 'fish',
              source: '鱼场',
              farmArea: 'fishFarm',
              priority: 10,
              image: '/images/ingredients/fish.svg',
              fishFarmZone: 'deep',
            },
            amount: 3,
            source: '鱼场',
            reason: '鱼场',
            reasons: ['高收益'],
            score: 90,
            level: '强烈推荐',
            fishFarmZone: 'deep',
          },
        ],
      },
    };

    expect(buildPlanText(result)).toContain('蓝鳍金枪鱼寿司套餐');
    expect(buildPlanText(result)).toContain('深海池');
    expect(buildPlanText(result)).toContain('蓝鳍金枪鱼 x3');
  });
});
