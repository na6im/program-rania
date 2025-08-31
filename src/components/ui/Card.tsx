import React from 'react';
export function Card({ children, className='' }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`bg-white rounded-2xl shadow border border-slate-200 ${className}`}>{children}</div>;
}
export function CardHeader({ children }: React.PropsWithChildren) { return <div className="p-4 border-b">{children}</div>; }
export function CardTitle({ children }: React.PropsWithChildren) { return <h2 className="text-xl font-semibold">{children}</h2>; }
export function CardContent({ children }: React.PropsWithChildren) { return <div className="p-4">{children}</div>; }
