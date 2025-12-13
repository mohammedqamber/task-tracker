"use client";

import { useEffect, useState } from "react";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

import { sendTranscriptToAPI } from "@/lib/api";
import { Loader, Loader2 } from "lucide-react";
import LoaderOverlay from "../Loader/Loader";
import VoiceInput from "../SpeechRecognition";
import { TaskFormValues } from "@/types/task";
import { useAtom } from "jotai";
import { globalModalAtom } from "@/lib/atoms";

// -----------------------------
// ZOD SCHEMA
// -----------------------------
const TaskSchema = z.object({
  title: z.string().min(2, "Title is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "inprogress", "done"]),
  description: z.string().optional(),
  dueDate: z.date({ error: "Due date is required" }),
});

export default function TaskForm({
  onSubmit,
  initialValues,
  isEdit,
  onClose,
}: {
  onSubmit: (data: TaskFormValues) => Promise<void>;
  initialValues?: Partial<TaskFormValues>; // For OCR auto-fill
  isEdit?: boolean;
  onClose?: () => void;
}) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      priority: "medium",
      status: "todo",
      description: "",
      dueDate: undefined,
      ...normalizeInitialValues(initialValues),
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [, openTaskModal] = useAtom(globalModalAtom);

  async function handleSubmit(data: TaskFormValues) {
    setSubmitting(true);
    await onSubmit(data);
    form.reset({
      title: "",
      priority: "medium",
      status: "todo",
      description: "",
      dueDate: undefined,
    });
    setSubmitting(false);
    openTaskModal({
      type: null,
    });
    // onClose?.();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Fix login bug..." {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-white">
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent align="start" className="p-0 bg-white">
                    <Calendar
                      className="w-full bg-neutral-100"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full">
            {submitting ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
}

/* -----------------------------
   Helper: Normalize dates from OCR
------------------------------*/
function normalizeInitialValues(values?: Partial<TaskFormValues>) {
  if (!values) return {};

  return {
    ...values,
    dueDate: values.dueDate
      ? typeof values.dueDate === "string"
        ? new Date(values.dueDate)
        : values.dueDate
      : undefined,
  };
}
