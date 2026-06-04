import type { FacilityKey, UnlockedFacilities } from '../types';

const selectedRecipesKey = 'dtd-farm-planner:selected-recipes';
const unlockedFacilitiesKey = 'dtd-farm-planner:unlocked-facilities';

export const defaultUnlockedFacilities: UnlockedFacilities = {
  fishFarm: true,
  landFarm: true,
  seaFarm: true,
};

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const parseJson = <T>(value: string | null, fallback: T): T => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const saveSelectedRecipes = (selectedRecipeIds: string[]) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(selectedRecipesKey, JSON.stringify(selectedRecipeIds));
};

export const loadSelectedRecipes = () => {
  if (!canUseStorage()) {
    return [];
  }

  const value = parseJson<string[]>(window.localStorage.getItem(selectedRecipesKey), []);
  return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
};

export const saveUnlockedFacilities = (unlockedFacilities: UnlockedFacilities) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(unlockedFacilitiesKey, JSON.stringify(unlockedFacilities));
};

export const loadUnlockedFacilities = () => {
  if (!canUseStorage()) {
    return defaultUnlockedFacilities;
  }

  const value = parseJson<Partial<UnlockedFacilities>>(
    window.localStorage.getItem(unlockedFacilitiesKey),
    defaultUnlockedFacilities,
  );

  return (Object.keys(defaultUnlockedFacilities) as FacilityKey[]).reduce<UnlockedFacilities>(
    (facilities, key) => ({
      ...facilities,
      [key]: typeof value[key] === 'boolean' ? value[key] : defaultUnlockedFacilities[key],
    }),
    defaultUnlockedFacilities,
  );
};
