import type {
  FarmArea,
  FishFarmGroupedPlan,
  FishFarmZone,
  GroupedPlan,
  Ingredient,
  IngredientRequirement,
  PlanItem,
  PlannerResult,
  Recipe,
  UnlockedFacilities,
} from '../types';
import { evaluatePlanItem, fishFarmZoneOrder } from './rules';

const facilityNames: Record<FarmArea, string> = {
  fishFarm: '鱼场',
  landFarm: '农场',
  seaFarm: '鲛人村海底农场',
  manual: '手动获取',
};

const facilityReason: Record<FarmArea, string> = {
  fishFarm: '该材料可在鱼场长期繁殖，适合提前扩容并保持库存。',
  landFarm: '该材料可在农场稳定种植，建议按需求量安排连续播种。',
  seaFarm: '该材料可在鲛人村海底农场种植，适合与陆地农场分开排期。',
  manual: '该材料暂不可养殖或种植，需要通过探索、商店或派遣补充。',
};

const lockedReason: Record<FarmArea, string> = {
  fishFarm: '尚未解锁鱼场，先列入手动获取清单。',
  landFarm: '尚未解锁农场，先列入手动获取清单。',
  seaFarm: '尚未解锁鲛人村海底农场，先列入手动获取清单。',
  manual: facilityReason.manual,
};

const emptyGroupedPlan = (): GroupedPlan => ({
  fishFarm: [],
  landFarm: [],
  seaFarm: [],
  manual: [],
});

const sortByPriorityAndAmount = (a: IngredientRequirement, b: IngredientRequirement) => {
  if (b.ingredient.priority !== a.ingredient.priority) {
    return b.ingredient.priority - a.ingredient.priority;
  }

  if (b.amount !== a.amount) {
    return b.amount - a.amount;
  }

  return a.ingredient.nameZh.localeCompare(b.ingredient.nameZh, 'zh-CN');
};

const isFacilityUnlocked = (farmArea: FarmArea, unlockedFacilities: UnlockedFacilities) => {
  if (farmArea === 'manual') {
    return false;
  }

  return unlockedFacilities[farmArea];
};

const createPlanItem = (
  requirement: IngredientRequirement,
  targetArea: FarmArea,
  unlockedFacilities: UnlockedFacilities,
  selectedRecipes: Recipe[],
): PlanItem => {
  const canUseFacility = isFacilityUnlocked(requirement.ingredient.farmArea, unlockedFacilities);
  const evaluation = evaluatePlanItem({
    requirement,
    selectedRecipes,
    targetArea,
  });
  const reason =
    targetArea === 'manual' && !canUseFacility
      ? lockedReason[requirement.ingredient.farmArea]
      : facilityReason[targetArea];

  return {
    ...requirement,
    source: requirement.ingredient.source,
    reason,
    reasons: [reason, ...evaluation.reasons.filter((item) => item !== reason)],
    score: evaluation.score,
    level: evaluation.level,
    fishFarmZone: requirement.ingredient.fishFarmZone,
  };
};

const groupFishFarmByZone = (items: PlanItem[]) =>
  items.reduce<FishFarmGroupedPlan>((groups, item) => {
    const zone = item.fishFarmZone ?? 'shallow';
    groups[zone] = [...(groups[zone] ?? []), item];
    return groups;
  }, {});

const sortFishFarmZones = (groups: FishFarmGroupedPlan) =>
  fishFarmZoneOrder.reduce<FishFarmGroupedPlan>((sortedGroups, zone: FishFarmZone) => {
    if (groups[zone]?.length) {
      sortedGroups[zone] = groups[zone];
    }

    return sortedGroups;
  }, {});

export const buildPlannerResult = (
  selectedRecipeIds: string[],
  allRecipes: Recipe[],
  allIngredients: Ingredient[],
  unlockedFacilities: UnlockedFacilities,
): PlannerResult => {
  const selectedIdSet = new Set(selectedRecipeIds);
  const selectedRecipes = allRecipes.filter((recipe) => selectedIdSet.has(recipe.id));
  const ingredientById = new Map(allIngredients.map((ingredient) => [ingredient.id, ingredient]));
  const amountByIngredientId = new Map<string, number>();

  selectedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((recipeIngredient) => {
      amountByIngredientId.set(
        recipeIngredient.ingredientId,
        (amountByIngredientId.get(recipeIngredient.ingredientId) ?? 0) + recipeIngredient.amount,
      );
    });
  });

  const ingredientSummary = Array.from(amountByIngredientId.entries())
    .map(([ingredientId, amount]) => {
      const ingredient = ingredientById.get(ingredientId);

      if (!ingredient) {
        return undefined;
      }

      return { ingredient, amount };
    })
    .filter((item): item is IngredientRequirement => Boolean(item))
    .sort(sortByPriorityAndAmount);

  const groupedPlan = ingredientSummary.reduce<GroupedPlan>((groups, requirement) => {
    const farmArea = requirement.ingredient.farmArea;
    const targetArea = isFacilityUnlocked(farmArea, unlockedFacilities) ? farmArea : 'manual';

    groups[targetArea].push(createPlanItem(requirement, targetArea, unlockedFacilities, selectedRecipes));
    return groups;
  }, emptyGroupedPlan());

  Object.values(groupedPlan).forEach((items) => items.sort(sortByPriorityAndAmount));
  const fishFarmByZone = sortFishFarmZones(groupFishFarmByZone(groupedPlan.fishFarm));

  return {
    selectedRecipes,
    totalRecipes: selectedRecipes.length,
    ingredientSummary,
    groupedPlan,
    fishFarmByZone,
  };
};

export const getFarmAreaLabel = (farmArea: FarmArea) => facilityNames[farmArea];
