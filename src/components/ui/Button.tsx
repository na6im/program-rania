import React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'outline', size?: 'sm'|'md'|'lg' }
export function Button({ className='', variant='default', size='md', ...rest }: Props){
  const base = 'inline-flex items-center justify-center rounded-xl border transition px-4 py-2 text-sm';
  const v = variant==='outline' ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800';
  const s = size==='sm' ? 'px-3 py-1.5 text-sm' : size==='lg' ? 'px-5 py-3 text-base' : '';
  return <button className={`${base} ${v} ${s} ${className}`} {...rest} />;
}
