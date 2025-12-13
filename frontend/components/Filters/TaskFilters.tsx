"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskFilter, taskStatus } from "@/types/task";
import { se } from "date-fns/locale";

// DateRange type for shadcn Calendar
type DateRange = { from: Date; to?: Date } | undefined;

const TaskFilters = ({
  onApply,
}: {
  onApply: (filters: TaskFilter) => void;
}) => {
  const [status, setStatus] = useState<TaskFilter["status"]>();
  const [priority, setPriority] = useState<TaskFilter["priority"]>();
  const [dateRange, setDateRange] = useState<DateRange>(undefined);
  const [open, setOpen] = useState(false);

  // Label for date button
  const formatRangeLabel = (r?: DateRange) => {
    if (!r?.from) return "Due Date Range";
    if (!r.to) return format(r.from, "PPP");
    return `${format(r.from, "PPP")} → ${format(r.to, "PPP")}`;
  };

  const handleApply = () => {
    onApply({
      status,
      priority,
      dueDateFrom: dateRange?.from?.toISOString(),
      dueDateTo: dateRange?.to?.toISOString(),
    });
    setOpen(false);
  };

  const handleReset = () => {
    setStatus(undefined);
    setPriority(undefined);
    setDateRange(undefined);
    onApply({});
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="font-medium">
          Filters
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 space-y-4">
        {/* Your full filter UI goes INSIDE this div */}
        <div className="flex flex-col gap-4">
          {/* Status */}
          <Select
            onValueChange={(val) => setStatus(val as TaskFilter["status"])}
            value={status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority */}
          <Select
            onValueChange={(val) => setPriority(val as TaskFilter["priority"])}
            value={priority}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                {formatRangeLabel(dateRange)}
              </Button>
            </PopoverTrigger>

            <PopoverContent align="center" className="p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(value) => {
                  if (!value) return setDateRange(undefined);
                  if (value instanceof Date)
                    return setDateRange({ from: value });

                  const { from, to } = value;
                  setDateRange(
                    from ? { from, to: to ?? undefined } : undefined
                  );
                }}
                className="bg-white"
              />
            </PopoverContent>
          </Popover>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TaskFilters;
