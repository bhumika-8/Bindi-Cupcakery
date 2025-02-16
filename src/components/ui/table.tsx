import React from "react";
import { cn } from "@/lib/utils";

// Wrapper Table Component (Scrollable)
export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full min-w-[600px] border-collapse border border-gray-300", className)}>
        {children}
      </table>
    </div>
  );
}

// Table Header Row
export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <thead className={cn("bg-gray-200", className)}>{children}</thead>;
}

// Table Row
export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tr className={cn("border border-gray-300", className)}>{children}</tr>;
}

// Table Head Cell
export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("border border-gray-300 px-4 py-2 text-left", className)}>{children}</th>;
}

// Table Body
export function TableBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tbody className={className}>{children}</tbody>;
}

// Table Cell
export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("border border-gray-300 px-4 py-2", className)}>{children}</td>;
}
