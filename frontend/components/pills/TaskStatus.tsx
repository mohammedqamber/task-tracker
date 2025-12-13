"use client";

import { Badge } from "@/components/ui/badge";
import { taskStatus } from "@/types/task";

const statusConfig: Record<taskStatus, { label: string; className: string }> = {
  done: {
    label: "Done",
    className: "text-green-600 border-green-400",
  },
  inprogress: {
    label: "In-Progress",
    className: "text-yellow-600 border-yellow-400",
  },
  todo: {
    label: "To-Do",
    className: "text-blue-600 border-blue-400",
  },
};

export default function StatusPill({ status }: { status: taskStatus }) {
  const { label, className } = statusConfig[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
