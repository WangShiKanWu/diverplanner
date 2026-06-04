import type { FishFarmZone, PlannerResult } from '../types';
import { fishFarmZoneOrder, getFishFarmZoneLabel } from './rules';

const formatItems = (items: Array<{ ingredient: { nameZh: string }; amount: number }>) =>
  items.length === 0 ? ['无'] : items.map((item) => `${item.ingredient.nameZh} x${item.amount}`);

export const buildPlanText = (result: PlannerResult) => {
  const lines = ['潜水员戴夫养殖规划', ''];

  lines.push('目标菜谱：');
  lines.push(...(result.selectedRecipes.length ? result.selectedRecipes.map((recipe) => recipe.nameZh) : ['无']));
  lines.push('');

  lines.push('材料需求：');
  lines.push(...formatItems(result.ingredientSummary));
  lines.push('');

  lines.push('鱼场规划：');
  let hasFishPlan = false;
  fishFarmZoneOrder.forEach((zone: FishFarmZone) => {
    const items = result.fishFarmByZone[zone] ?? [];

    if (items.length === 0) {
      return;
    }

    hasFishPlan = true;
    lines.push(getFishFarmZoneLabel(zone));
    lines.push(...formatItems(items));
  });
  if (!hasFishPlan) {
    lines.push('无');
  }
  lines.push('');

  lines.push('农场规划：');
  lines.push(...formatItems(result.groupedPlan.landFarm));
  lines.push('');

  lines.push('海底农场规划：');
  lines.push(...formatItems(result.groupedPlan.seaFarm));
  lines.push('');

  lines.push('手动获取：');
  lines.push(...formatItems(result.groupedPlan.manual));

  return lines.join('\n');
};

export const downloadTextFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
