"use client";

import { Task } from "@/types/task";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TaskViewerDialog from "../TaskForm/TaskView";

import { Pencil, Trash2 } from "lucide-react";
import { deleteTask, updateTask } from "@/lib/api";
import { useAtom } from "jotai";
import { globalModalAtom, refreshAtom } from "@/lib/atoms";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Status from "../pills/Priority";
import PriorityPill from "../pills/Priority";
import { use } from "react";
import StatusPill from "../pills/TaskStatus";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  const [refresh, setRefresh] = useAtom(refreshAtom);

  const [, openTaskModal] = useAtom(globalModalAtom);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setRefresh(!refresh);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "-";
    return format(new Date(date), "dd MMM yyyy");
  };

  const handleEditTask = (task: Task) => {
    openTaskModal({
      type: "taskForm",
      header: "Edit Task",
      props: {
        initialValues: {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
        },
        onSubmit: async (data) => {
          await updateTask({
            data: data,
            taskId: task.id,
            successMessage: "Task Updated Succesfully",
          });
          setRefresh(!refresh);
        },
      },
    });
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                No tasks found
              </TableCell>
            </TableRow>
          )}

          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="hover:bg-gray-50 transition cursor-pointer"
            >
              {/* Title with Viewer Dialog */}
              <TableCell className="font-medium">
                <TaskViewerDialog task={task}>
                  <span className="hover:underline">{task.title}</span>
                </TaskViewerDialog>
              </TableCell>

              {/* Priority */}
              <TableCell>
                <PriorityPill taskPriority={task.priority} />
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusPill status={task.status} />
              </TableCell>

              {/* Due date */}
              <TableCell>{formatDate(task.dueDate)}</TableCell>

              {/* Actions */}
              <TableCell className="text-right flex gap-3 justify-end">
                {/* Edit */}
                <Pencil
                  className="w-4 h-4 hover:text-blue-600"
                  onClick={() => handleEditTask(task)}
                />

                {/* Delete */}
                <Trash2
                  className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
