import type { Ingredient, Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  ingredientsById: Map<string, Ingredient>;
  selected: boolean;
  onToggle: (recipeId: string) => void;
}

export const RecipeCard = ({ recipe, ingredientsById, selected, onToggle }: RecipeCardProps) => (
  <article
    className={`relative overflow-hidden rounded-lg border p-3 shadow-soft transition ${
      selected
        ? 'border-ocean-600 bg-ocean-100 ring-2 ring-ocean-300'
        : 'border-ocean-100 bg-white hover:border-ocean-300'
    }`}
  >
    {selected && <div className="absolute inset-y-0 left-0 w-1.5 bg-ocean-700" />}
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(recipe.id)}
        aria-label={`选择${recipe.nameZh}`}
        className={`mt-1 h-5 w-5 rounded border-ocean-300 text-ocean-700 focus:ring-ocean-500 ${
          selected ? 'bg-ocean-700 ring-2 ring-ocean-300' : ''
        }`}
      />
      <img
        src={recipe.image}
        alt=""
        className="h-20 w-20 shrink-0 rounded-lg border border-ocean-100 bg-ocean-50 object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-ocean-950">{recipe.nameZh}</h3>
            <p className="text-xs text-ocean-500">{recipe.nameEn}</p>
          </div>
          <span className="w-fit rounded-full bg-coral-100 px-2.5 py-1 text-xs font-bold text-coral-700">
            售价：{recipe.price.toLocaleString('zh-CN')}金币
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-reef-100 px-2 py-0.5 text-xs font-semibold text-reef-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2">
          <h4 className="text-xs font-semibold uppercase text-ocean-500">所需材料</h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {recipe.ingredients.map((item) => {
              const ingredient = ingredientsById.get(item.ingredientId);

              return (
                <span key={item.ingredientId} className="rounded-md bg-ocean-50 px-2 py-0.5 text-xs text-ocean-900">
                  {ingredient?.nameZh ?? item.ingredientId} x{item.amount}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </article>
);
