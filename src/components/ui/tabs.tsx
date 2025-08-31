import React, { createContext, useContext, useState } from "react";

type TabsContextType = { value: string; setValue: (v: string) => void };
const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  return <button onClick={() => ctx.setValue(value)}>{children}</button>;
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  if (!ctx || ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
