import { Checkbox } from "../components/ui/Checkbox";

export function WorkoutRow({ text, idx, checked, onToggle }:{ text:string; idx:number; checked:boolean; onToggle:(i:number)=>void }){
  return <div className="flex items-center justify-between py-2 border-b last:border-b-0"><div className="text-sm">{text}</div><Checkbox checked={checked} onCheckedChange={() => onToggle(idx)} /></div>;
}
