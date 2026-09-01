// src/components/layout/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-container-x py-(--spacing-container-y) ${className}`}
    >
      {children}
    </div>
  );
}
