import React from "react";

export function Button(
  { children, size, variant, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string; variant?: string }
) {
  return <button {...props}>{children}</button>;
}
