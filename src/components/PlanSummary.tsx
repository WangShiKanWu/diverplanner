import { useEffect, useState } from 'react';
import type { PlanItem, PlannerResult } from '../types';
import { trackPlanAction } from '../lib/analytics';
import { buildPlanText, downloadTextFile } from '../utils/exportPlan';

interface PlanSummaryProps {
  result: PlannerResult;
}

const getPlanCount = (items: PlanItem[]) => items.length;

const ExportActions = ({ result }: PlanSummaryProps) => {
  const planText = buildPlanText(result);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const fallbackCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = planText;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(planText);
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }

    setCopied(true);
    trackPlanAction('copy_plan', {
      selectedCount: result.totalRecipes,
      fishRequirementCount: result.groupedPlan.fishFarm.length,
      cropRequirementCount: result.groupedPlan.landFarm.length,
      seaweedRequirementCount: result.groupedPlan.seaFarm.length,
      manualRequirementCount: result.groupedPlan.manual.length,
    });
  };

  const handleExport = () => {
    downloadTextFile('dave-the-diver-farm-plan.txt', planText);
    trackPlanAction('export_txt', {
      selectedCount: result.totalRecipes,
      fishRequirementCount: result.groupedPlan.fishFarm.length,
      cropRequirementCount: result.groupedPlan.landFarm.length,
      seaweedRequirementCount: result.groupedPlan.seaFarm.length,
      manualRequirementCount: result.groupedPlan.manual.length,
    });
  };

  return (
    <div className="relative grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ocean-800 transition hover:bg-ocean-100"
      >
        复制规划
      </button>
      <button
        type="button"
        onClick={handleExport}
        className="rounded-full bg-ocean-100 px-3 py-2 text-xs font-bold text-ocean-900 transition hover:bg-white"
      >
        导出 TXT
      </button>
      {copied && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg bg-reef-700 px-3 py-2 text-center text-xs font-bold text-white shadow-soft">
          ✓ 已复制到剪贴板
        </div>
      )}
    </div>
  );
};

export const PlanSummary = ({ result }: PlanSummaryProps) => (
  <section className="rounded-lg bg-ocean-800 p-4 text-white">
    <h2 className="text-base font-bold">规划摘要</h2>
    <dl className="mt-3 space-y-2 text-sm">
      <div className="flex items-center justify-between gap-3">
        <dt className="text-ocean-100">覆盖菜谱</dt>
        <dd className="font-bold">{result.totalRecipes}道</dd>
      </div>
      <div className="flex items-center justify-between gap-3">
        <dt className="text-ocean-100">鱼场需求</dt>
        <dd className="font-bold">{getPlanCount(result.groupedPlan.fishFarm)}种鱼</dd>
      </div>
      <div className="flex items-center justify-between gap-3">
        <dt className="text-ocean-100">农场需求</dt>
        <dd className="font-bold">{getPlanCount(result.groupedPlan.landFarm)}种作物</dd>
      </div>
      <div className="flex items-center justify-between gap-3">
        <dt className="text-ocean-100">海底农场需求</dt>
        <dd className="font-bold">{getPlanCount(result.groupedPlan.seaFarm)}种海藻</dd>
      </div>
      <div className="flex items-center justify-between gap-3">
        <dt className="text-ocean-100">手动获取材料</dt>
        <dd className="font-bold">{getPlanCount(result.groupedPlan.manual)}种</dd>
      </div>
    </dl>
    <div className="mt-4">
      <ExportActions result={result} />
    </div>
  </section>
);
