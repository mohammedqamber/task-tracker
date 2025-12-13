"use client";

import TaskForm from "./TaskForm";
import { TaskFormValues } from "@/types/task";

export type TaskFormDialogType = {
  onSubmit: (data: TaskFormValues) => Promise<void>;
  initialValues?: TaskFormValues;
  isEdit?: boolean;
  transcript?: string;
};

export default function TaskFormDialog({
  onSubmit,
  initialValues,
  isEdit = false,
  transcript,
}: TaskFormDialogType) {
  // const [open, setOpen] = useAtom(taskFormAtom);
  console.log("dialog rendered");

  return (
    <>
      {transcript && (
        <div className="w-full text-sm bg-gray-100 p-3 rounded-md min-h-[65px] text-gray-700 italic">
          {transcript}
        </div>
      )}

      <TaskForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
      />
    </>
  );
}
