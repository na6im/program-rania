import { Checkbox } from "../components/ui/Checkbox";
import type { Meal } from "../types";

export function MealRow({ meal, idx, checked, onToggle }:{ meal: Meal; idx:number; checked:boolean; onToggle:(i:number)=>void }){
  return (
    <div className="flex items-start justify-between py-2 border-b last:border-b-0">
      <div className="pr-4">
        <div className="font-medium">{meal.name}</div>
        <div className="text-sm opacity-80">{meal.items}</div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-sm text-right">
          <div>{meal.kcal} kcal</div>
          <div className="opacity-70">P:{meal.P}g · G:{meal.G}g · L:{meal.L}g</div>
        </div>
        <Checkbox checked={checked} onCheckedChange={() => onToggle(idx)} />
      </div>
    </div>
  );
}
