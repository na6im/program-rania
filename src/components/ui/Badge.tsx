import React from 'react';
export function Badge({children, className=''}:{children:any, className?:string}){
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs bg-slate-100 border-slate-200 text-slate-700 ${className}`}>{children}</span>;
}
