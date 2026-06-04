export type RecipeTag = '赚钱' | '升级' | '节日备货' | '懒人经营' | '测试';

export type IngredientType = 'fish' | 'crop' | 'seaweed' | 'manual';

export type FarmArea = 'fishFarm' | 'landFarm' | 'seaFarm' | 'manual';

export type FacilityKey = 'fishFarm' | 'landFarm' | 'seaFarm';

export type FishFarmZone =
  | 'shallow'
  | 'medium'
  | 'deep'
  | 'night'
  | 'glacierPassage'
  | 'glacierArea'
  | 'hydrothermal';

export type RecommendationLevel = '强烈推荐' | '推荐' | '可选' | '暂缓';

export type UnlockedFacilities = Record<FacilityKey, boolean>;

export interface RecipeIngredient {
  ingredientId: string;
  amount: number;
}

export interface Recipe {
  id: string;
  nameZh: string;
  nameEn: string;
  image: string;
  price: number;
  tags: RecipeTag[];
  ingredients: RecipeIngredient[];
}

export interface Ingredient {
  id: string;
  nameZh: string;
  type: IngredientType;
  source: string;
  farmArea: FarmArea;
  priority: number;
  image: string;
  fishFarmZone?: FishFarmZone;
  baseValue?: number;
  growthDifficulty?: number;
  manualDifficulty?: number;
  spaceCost?: number;
}

export interface IngredientRequirement {
  ingredient: Ingredient;
  amount: number;
}

export interface PlanItem extends IngredientRequirement {
  source: string;
  reason: string;
  reasons: string[];
  score: number;
  level: RecommendationLevel;
  fishFarmZone?: FishFarmZone;
}

export type FishFarmGroupedPlan = Partial<Record<FishFarmZone, PlanItem[]>>;

export interface GroupedPlan {
  fishFarm: PlanItem[];
  landFarm: PlanItem[];
  seaFarm: PlanItem[];
  manual: PlanItem[];
}

export interface PlannerResult {
  selectedRecipes: Recipe[];
  totalRecipes: number;
  ingredientSummary: IngredientRequirement[];
  groupedPlan: GroupedPlan;
  fishFarmByZone: FishFarmGroupedPlan;
}
