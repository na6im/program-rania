// import React from 'react';
export function Checkbox({checked, onCheckedChange}:{checked?:boolean, onCheckedChange?: (v:boolean)=>void}){
  return (
    <input type="checkbox"
      checked={!!checked}
      onChange={e=>onCheckedChange?.(e.target.checked)}
      className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-400" />
  );
}
