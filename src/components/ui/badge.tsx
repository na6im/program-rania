import React from "react";

export function Badge({ children, className }: React.HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
  return <span className={className}>{children}</span>;
}
