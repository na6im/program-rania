import React, { useState } from 'react';
const TabsContext = React.createContext<{value:string, setValue:(v:string)=>void}>({value:'', setValue:()=>{}});
export function Tabs({ defaultValue, children }:{defaultValue:string, children:any}){ const [value,setValue]=useState(defaultValue); return <TabsContext.Provider value={{value,setValue}}>{children}</TabsContext.Provider>; }
export function TabsList({children}:{children:any}){ return <div className="inline-flex rounded-xl border bg-white p-1">{children}</div>; }
export function TabsTrigger({children, value}:{children:any, value:string}){ const c=React.useContext(TabsContext); const a=c.value===value; return <button onClick={()=>c.setValue(value)} className={`px-3 py-1.5 text-sm rounded-lg ${a?'bg-slate-900 text-white':'text-slate-700 hover:bg-slate-100'}`}>{children}</button>; }
export function TabsContent({children, value, className=''}:{children:any, value:string, className?:string}){ const c=React.useContext(TabsContext); if(c.value!==value) return null; return <div className={className}>{children}</div>; }
