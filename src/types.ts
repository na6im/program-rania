export type Meal = { name: string; items: string; kcal: number; P: number; G: number; L: number };
export type DayPlan = { meals: Meal[] };
export type MenuVariant = Record<string, DayPlan>;
export type ProgressState = {
  done: Record<string, { meals: boolean[]; workout: boolean[]; notes: string }>;
  metrics: Record<string, { weight?: number; waist?: number; hips?: number }>;
};
