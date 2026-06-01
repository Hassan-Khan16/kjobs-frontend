import dayjs from "dayjs";

import type {
  MealCalendarDayData,
  MealPlanFilter,
  MealsCardData,
  MealTitleItem,
} from "@/types/meal";
import type { AthleteScheduledMealPlanRow } from "@/types/meal-plan";

export const MEAL_PLAN_CALENDAR_LEGEND_KEY = "meal plan";

export function mealKcalFromMacros(
  card: Pick<MealsCardData, "proteinGrams" | "carbGrams" | "fatGrams">,
) {
  return card.proteinGrams * 4 + card.carbGrams * 4 + card.fatGrams * 9;
}

function resolveKcal(
  card: MealPlanFilter | (MealsCardData & { kcal?: number }),
): number {
  if ("proteinGrams" in card && typeof card.proteinGrams === "number") {
    return mealKcalFromMacros(card as MealsCardData);
  }
  return (card as MealPlanFilter).kcal ?? 0;
}

export function matchesSport(
  selected: string,
  card: MealPlanFilter | { sportLabel?: string },
) {
  if (selected === "all") return true;
  const label = "sportLabel" in card ? card.sportLabel : undefined;
  if (!label) return false;
  if (selected === "Football" && label === "Soccer") return true;
  return label === selected;
}

export function matchesMealType(selected: string, card: { tag: string }) {
  if (selected === "all") return true;
  return card.tag === selected;
}

export function matchesCalorieRange(
  selected: string,
  card: MealPlanFilter | (MealsCardData & { kcal?: number }),
) {
  if (selected === "all") return true;
  const kcal = resolveKcal(card);
  if (selected === "under-2200") return kcal < 2200;
  if (selected === "2200-3500") return kcal >= 2200 && kcal <= 3500;
  if (selected === "over-3500") return kcal > 3500;
  return true;
}

// export function toDateKey(d: Date) {
//     const y = d.getFullYear();
//     const m = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${y}-${m}-${day}`;
// }
// toISODateFormate

export function toISODateFormate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function scheduledMealPlanRowsToCalendarDayData(
  rows: AthleteScheduledMealPlanRow[],
): MealCalendarDayData[] {
  const grouped: Record<string, MealTitleItem[]> = {};

  for (const row of rows) {
    const title = row.mealPlan.name;
    let cursor = dayjs(row.mealPlan.startDate).startOf("day");
    const end = dayjs(row.mealPlan.endDate).startOf("day");
    if (!cursor.isValid() || !end.isValid()) continue;
    if (end.isBefore(cursor)) continue;

    while (!cursor.isAfter(end)) {
      const dateKey = cursor.format("YYYY-MM-DD");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push({
        legend: MEAL_PLAN_CALENDAR_LEGEND_KEY,
        title,
      });
      cursor = cursor.add(1, "day");
    }
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, titles]) => ({ date, titles }));
}

export function buildMealPlanDateMap(data: MealCalendarDayData[]) {
  const map = new Map<string, MealTitleItem[]>();
  for (const item of data) {
    const key =
      typeof item.date === "string"
        ? item.date
        : item.date instanceof Date
          ? toISODateFormate(item.date)
          : String(item.date);

    map.set(key, item.titles ?? []);
  }
  return map;
}
