"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/types/task";

import {
  Calendar,
  ClipboardList,
  Flag,
  Info,
  ListChecks,
  TextQuote,
} from "lucide-react";

import React from "react";
import PriorityPill from "../pills/Priority";
import StatusPill from "../pills/TaskStatus";

type Props = {
  task: Task;
  children: React.ReactNode;
};

export default function TaskViewerDialog({ task, children }: Props) {
  const section = (
    label: string,
    icon: React.ReactNode,
    children: React.ReactNode
  ) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        {icon}
        {label}
      </div>
      <div className="text-[15px] text-gray-800 pl-7">{children}</div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl shadow-xl border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-3">
          {/* Description */}
          {task.description &&
            section(
              "Description",
              <TextQuote size={18} className="text-gray-500" />,
              <p className="leading-relaxed">{task.description}</p>
            )}

          {/* Priority */}
          {section(
            "Priority",
            <Flag size={18} className="text-gray-500" />,
            <PriorityPill taskPriority={task.priority} />
          )}

          {/* Status */}
          {section(
            "Status",
            <ListChecks size={18} className="text-gray-500" />,
            <StatusPill status={task.status} />
          )}

          {/* Due Date */}
          {task.dueDate &&
            section(
              "Due Date",
              <Calendar size={18} className="text-gray-500" />,
              <span>{new Date(task.dueDate).toDateString()}</span>
            )}

          {/* Created At */}
          {section(
            "Created At",
            <Info size={18} className="text-gray-500" />,
            <span className="text-gray-600">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
