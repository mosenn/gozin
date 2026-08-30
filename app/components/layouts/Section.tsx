// src/components/layout/Section.tsx
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section
      className={`mb-(--spacing-section) last:mb-0 ${className}`}
    >
      {children}
    </section>
  );
}
