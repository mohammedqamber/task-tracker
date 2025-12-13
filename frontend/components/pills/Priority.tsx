import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import React from "react";

const PriorityPill = ({
  taskPriority,
  className,
}: {
  taskPriority: Task["priority"];
  className?: string;
}) => {
  const priorityColors: Record<Task["priority"], string> = {
    low: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    medium: "bg-amber-100 text-amber-700 border border-amber-200",
    high: "bg-rose-100 text-rose-700 border border-rose-200",
  };
  return (
    <span
      className={cn(
        `px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[taskPriority]}`,
        className
      )}
    >
      {taskPriority.toUpperCase()}
    </span>
  );
};

export default PriorityPill;
