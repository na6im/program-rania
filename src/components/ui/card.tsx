import React from "react";

export function Card({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className}>{children}</div>;
}
export function CardHeader({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className}>{children}</div>;
}
export function CardContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className}>{children}</div>;
}
export function CardTitle({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={className}>{children}</h2>;
}
