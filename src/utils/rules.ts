import type {
  FarmArea,
  FishFarmZone,
  IngredientRequirement,
  RecommendationLevel,
  Recipe,
} from '../types';

interface EvaluatePlanItemInput {
  requirement: IngredientRequirement;
  selectedRecipes: Recipe[];
  targetArea: FarmArea;
}

export interface RuleEvaluation {
  score: number;
  level: RecommendationLevel;
  reasons: string[];
}

export const fishFarmZoneOrder: FishFarmZone[] = [
  'shallow',
  'medium',
  'deep',
  'night',
  'glacierPassage',
  'glacierArea',
  'hydrothermal',
];

const fishFarmZoneLabels: Record<FishFarmZone, string> = {
  shallow: '浅海池',
  medium: '中层池',
  deep: '深海池',
  night: '夜潜',
  glacierPassage: '冰河通道',
  glacierArea: '冰河区',
  hydrothermal: '热液区',
};

const fishFarmZoneDepths: Partial<Record<FishFarmZone, string>> = {
  shallow: '0-50m',
  medium: '50-130m',
  deep: '130-250m',
};

export const getFishFarmZoneLabel = (zone: FishFarmZone) => fishFarmZoneLabels[zone];

export const getFishFarmZoneDepth = (zone: FishFarmZone) => fishFarmZoneDepths[zone];

const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

const toLevel = (score: number): RecommendationLevel => {
  if (score >= 80) {
    return '强烈推荐';
  }

  if (score >= 60) {
    return '推荐';
  }

  if (score >= 40) {
    return '可选';
  }

  return '暂缓';
};

const getRecipeDemandStats = (requirement: IngredientRequirement, selectedRecipes: Recipe[]) => {
  const matchingRecipes = selectedRecipes.filter((recipe) =>
    recipe.ingredients.some((item) => item.ingredientId === requirement.ingredient.id),
  );
  const maxRecipePrice = Math.max(0, ...matchingRecipes.map((recipe) => recipe.price));
  const recipeNames = matchingRecipes.map((recipe) => recipe.nameZh);

  return {
    matchingRecipes,
    maxRecipePrice,
    recipeNames,
  };
};

const evaluateFish = ({
  requirement,
  selectedRecipes,
  targetArea,
}: EvaluatePlanItemInput): RuleEvaluation => {
  const ingredient = requirement.ingredient;
  const zone = ingredient.fishFarmZone;
  const { matchingRecipes, maxRecipePrice, recipeNames } = getRecipeDemandStats(requirement, selectedRecipes);
  const reasons: string[] = [];
  let score = 24;

  score += Math.min(requirement.amount * 6, 24);
  score += (ingredient.baseValue ?? ingredient.priority) * 4;
  score += (ingredient.manualDifficulty ?? 5) * 3;
  score += Math.min(maxRecipePrice / 100, 18);
  score -= (ingredient.spaceCost ?? 3) * 2;
  score -= (ingredient.growthDifficulty ?? 5) * 1.5;

  reasons.push('当前菜谱需要');

  if (requirement.amount >= 4) {
    reasons.push('高频使用');
  } else {
    reasons.push('按需补充');
  }

  if (maxRecipePrice >= 1200) {
    reasons.push('高收益');
  } else if (maxRecipePrice > 0) {
    reasons.push('稳定收益');
  }

  if (matchingRecipes.length > 1) {
    reasons.push(`覆盖${matchingRecipes.length}道菜`);
  }

  if (!zone) {
    score -= 25;
    reasons.push('缺少分区');
  } else if (targetArea === 'manual') {
    score -= 22;
    reasons.push('鱼场未解锁');
  } else {
    score += 14;
    reasons.push('长期繁殖');
    reasons.push(`${getFishFarmZoneLabel(zone)}可养`);
  }

  if ((ingredient.manualDifficulty ?? 0) >= 7) {
    reasons.push('获取较难');
  } else {
    reasons.push('获取简单');
  }

  const normalizedScore = clampScore(score);

  return {
    score: normalizedScore,
    level: toLevel(normalizedScore),
    reasons,
  };
};

const evaluateNonFish = ({ requirement, selectedRecipes, targetArea }: EvaluatePlanItemInput): RuleEvaluation => {
  const ingredient = requirement.ingredient;
  const { matchingRecipes, maxRecipePrice } = getRecipeDemandStats(requirement, selectedRecipes);
  const reasons: string[] = [];
  let score = 18;

  score += Math.min(requirement.amount * 5, 20);
  score += ingredient.priority * 4;
  score += Math.min(maxRecipePrice / 120, 14);

  if (targetArea === 'manual') {
    score -= ingredient.farmArea === 'manual' ? 0 : 24;
  } else {
    score += 10;
  }

  reasons.push('当前菜谱需要');

  if (matchingRecipes.length > 1) {
    reasons.push(`覆盖${matchingRecipes.length}道菜`);
  } else {
    reasons.push('按需补充');
  }

  if (ingredient.farmArea === 'landFarm') {
    reasons.push(targetArea === 'landFarm' ? '农场种植' : '农场未解锁');
  }

  if (ingredient.farmArea === 'seaFarm') {
    reasons.push(targetArea === 'seaFarm' ? '海底农场种植' : '海底农场未解锁');
  }

  if (ingredient.farmArea === 'manual') {
    reasons.push('手动获取');
  }

  const normalizedScore = clampScore(score);

  return {
    score: normalizedScore,
    level: toLevel(normalizedScore),
    reasons,
  };
};

export const evaluatePlanItem = (input: EvaluatePlanItemInput): RuleEvaluation => {
  if (input.requirement.ingredient.type === 'fish') {
    return evaluateFish(input);
  }

  return evaluateNonFish(input);
};
