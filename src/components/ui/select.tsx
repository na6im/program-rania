import React from "react";

type SelectProps = { value: string; onValueChange: (v: string) => void; children: React.ReactNode };

function collectItems(children: React.ReactNode): React.ReactElement[] {
  const items: React.ReactElement[] = [];
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return;
    if ((child.type as any).displayName === "SelectItem") {
      items.push(child as React.ReactElement);
    } else if (child.props?.children) {
      items.push(...collectItems(child.props.children));
    }
  });
  return items;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const items = collectItems(children);
  return (
    <select value={value} onChange={e => onValueChange(e.target.value)}>
      {items}
    </select>
  );
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <>{children}</>;
}
export function SelectValue({ placeholder }: { placeholder?: string }) {
  return placeholder ? <option value="" disabled hidden>{placeholder}</option> : null;
}
export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const Component: any = (props: any) => <option {...props} />;
  Component.displayName = "SelectItem";
  return <Component value={value}>{children}</Component>;
}
